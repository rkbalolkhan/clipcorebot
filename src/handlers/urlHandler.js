const validateUrl = require('../utils/validateUrl');
const mediaService = require('../services/mediaService');
const { deleteFile } = require('../utils/deleteFile');
const User = require('../models/User');
const Download = require('../models/Download');
const logger = require('../utils/logger');
const { t, getPreferredLanguage } = require('../utils/i18n');
const { saveRequest, updateRequestStatus } = require('../utils/requestTracker');

const SUPPORTED_PLATFORMS = ['instagram', 'tiktok', 'facebook', 'twitter', 'youtube'];

const urlHandler = {
  handleUrl: async (ctx) => {
    const url = ctx.message.text;
    const userId = ctx.from.id.toString();
    const username = ctx.from.username || ctx.from.first_name || 'Unknown';
    const startTime = Date.now();

    const validation = validateUrl(url);

    if (!validation.valid) {
      // Save failed request
      await saveRequest({
        userId,
        username,
        requestType: 'download',
        status: 'failed',
        errorMessage: 'Invalid URL',
      });

      const language = await getPreferredLanguage(userId);
      await logger.warn(`Unsupported/invalid URL from user ${userId}: ${url}`);
      await ctx.reply(t(language, 'invalidLink'));
      return;
    }

    const platform = validation.platform;

    // Guard against unexpected/unsupported platforms (double-check)
    if (!SUPPORTED_PLATFORMS.includes(platform)) {
      await saveRequest({
        userId,
        username,
        requestType: 'download',
        platform,
        url,
        status: 'failed',
        errorMessage: 'Unsupported platform',
      });

      const language = await getPreferredLanguage(userId);
      await logger.warn(`Unsupported platform requested by user ${userId}: ${platform} - ${url}`);
      await ctx.reply(t(language, 'invalidLink'));
      return;
    }

    try {
      // Save initial request
      const request = await saveRequest({
        userId,
        username,
        requestType: 'download',
        platform,
        url,
        status: 'processing',
      });

      await ctx.sendChatAction('typing');
      const progressMsg = await ctx.reply(t(language, 'processingStart'));

      // Create a download record
      const downloadRecord = new Download({
        userId,
        platform,
        url,
        status: 'pending',
      });

      let filePath;
      let fileSize = 0;

      try {
        // Download based on platform
        filePath = await mediaService.download(platform, url);

        // Get file size
        const fs = require('fs-extra');
        const stats = await fs.stat(filePath);
        fileSize = stats.size;

        // Max upload guard (configurable via env; default 50 MB)
        const MAX_UPLOAD_BYTES = Number(process.env.MAX_UPLOAD_BYTES) || 50 * 1024 * 1024;
        if (fileSize > MAX_UPLOAD_BYTES) {
          downloadRecord.status = 'failed';
          downloadRecord.errorMessage = 'File too large';

          const processingTime = Date.now() - startTime;
          await updateRequestStatus(request._id, 'failed', 'File too large', processingTime);
          await downloadRecord.save();

          const language = await getPreferredLanguage(userId);
          await ctx.reply(t(language, 'fileTooLarge'));
          await deleteFile(filePath);
          await ctx.deleteMessage(progressMsg.message_id).catch(() => {});
          await logger.warn(`File too large to upload for user ${userId}: ${filePath} (${fileSize} bytes)`);
          return;
        }

        // Send video to user
        await ctx.telegram.editMessageText(
          ctx.chat.id,
          progressMsg.message_id,
          undefined,
          t(language, 'processingUpdate')
        );

        await ctx.replyWithVideo(
          { source: filePath },
          {
            caption: t(language, 'downloadSuccessCaption'),
          }
        );

        // Update download record
        downloadRecord.status = 'success';

        // Update user statistics
        await User.updateOne({ telegramId: userId }, { $inc: { totalDownloads: 1 } });

        // Update request with success
        const processingTime = Date.now() - startTime;
        await updateRequestStatus(request._id, 'success', null, processingTime);

        // Clean up the file
        await deleteFile(filePath);

        // Delete the progress message
        await ctx.deleteMessage(progressMsg.message_id);

        await logger.info(`Successfully downloaded ${platform} video for user ${userId}`);
      } catch (downloadError) {
        downloadRecord.status = 'failed';
        downloadRecord.errorMessage = downloadError.message;

        // Clean up the file if it exists
        if (filePath) {
          await deleteFile(filePath);
        }

        // Update request with error
        const processingTime = Date.now() - startTime;
        await updateRequestStatus(request._id, 'failed', downloadError.message, processingTime);

        await ctx.reply(t(language, 'downloadFailed'));
        await logger.error(`Failed to download ${platform} video for user ${userId}`, downloadError);
      }

      // Save download record
      await downloadRecord.save();
    } catch (error) {
      // Save error request
      await saveRequest({
        userId,
        username,
        requestType: 'download',
        platform: validation.platform,
        url,
        status: 'failed',
        errorMessage: error.message,
      });

      await ctx.reply('❌ An error occurred. Please try again later.');
      await logger.error(`URL handler error for user ${userId}`, error);
    }
  },
};

module.exports = urlHandler;
