const validateUrl = require('../utils/validateUrl');
const instagramService = require('../services/instagramService');
const tiktokService = require('../services/tiktokService');
const { deleteFile } = require('../utils/deleteFile');
const User = require('../models/User');
const Download = require('../models/Download');
const logger = require('../utils/logger');
const { saveRequest, updateRequestStatus } = require('../utils/requestTracker');

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

      await ctx.reply('❌ Unsupported URL. Please send an Instagram or TikTok link.');
      return;
    }

    const platform = validation.platform;

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

      // Send processing message
      const processingMessage = await ctx.reply('⏳ Downloading...');

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
        if (platform === 'instagram') {
          filePath = await instagramService.download(url);
        } else if (platform === 'tiktok') {
          filePath = await tiktokService.download(url);
        }

        // Get file size
        const fs = require('fs-extra');
        const stats = await fs.stat(filePath);
        fileSize = stats.size;

        // Send video to user
        await ctx.replyWithVideo(
          { source: filePath },
          {
            caption: `✅ ${platform.toUpperCase()} video downloaded!`,
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

        // Delete the "Downloading..." message
        await ctx.deleteMessage(processingMessage.message_id);

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

        await ctx.reply(`❌ Could not download ${platform} video. Please try again.`);
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
