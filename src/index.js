require('dotenv').config();
const { Telegraf } = require('telegraf');
const connectDB = require('./config/db');
const startCommand = require('./commands/start');
const helpCommand = require('./commands/help');
const urlHandler = require('./handlers/urlHandler');
const audioService = require('./services/audioService');
const { deleteFile } = require('./utils/deleteFile');
const logger = require('./utils/logger');
const validateUrl = require('./utils/validateUrl');
const User = require('./models/User');
const { saveRequest, updateRequestStatus } = require('./utils/requestTracker');

// Initialize bot
const bot = new Telegraf(process.env.BOT_TOKEN);

let userAwaitingAudioConversion = new Set();

// Error handler
bot.catch((err) => {
  console.error('Bot error:', err);
  logger.error('Bot error', err);
});

// Initialize commands
bot.start(async (ctx) => {
  const userId = ctx.from.id.toString();
  const username = ctx.from.username || ctx.from.first_name || 'Unknown';

  try {
    // Save /start command request
    await saveRequest({
      userId,
      username,
      requestType: 'command',
      command: '/start',
      status: 'success',
    });
  } catch (error) {
    console.error('Error saving start command request:', error);
  }

  // Call original start command
  await startCommand(ctx);
});

bot.help(async (ctx) => {
  const userId = ctx.from.id.toString();
  const username = ctx.from.username || ctx.from.first_name || 'Unknown';

  try {
    // Save /help command request
    await saveRequest({
      userId,
      username,
      requestType: 'command',
      command: '/help',
      status: 'success',
    });
  } catch (error) {
    console.error('Error saving help command request:', error);
  }

  // Call original help command
  await helpCommand(ctx);
});

// MP3 conversion command
bot.command('mp3', async (ctx) => {
  const userId = ctx.from.id.toString();
  const username = ctx.from.username || ctx.from.first_name || 'Unknown';

  try {
    // Save /mp3 command request
    await saveRequest({
      userId,
      username,
      requestType: 'command',
      command: '/mp3',
      status: 'success',
    });
  } catch (error) {
    console.error('Error saving mp3 command request:', error);
  }

  userAwaitingAudioConversion.add(userId);
  await ctx.reply('🎵 Send a video file or Instagram/TikTok link to convert to MP3.');
});

// Handle incoming messages
bot.on('message', async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.username || ctx.from.first_name || 'Unknown';

  try {
    // Update last used time
    await User.updateOne(
      { telegramId: userId.toString() },
      { $set: { lastUsedAt: new Date() } }
    );
  } catch (error) {
    console.error('Error updating user:', error);
  }

  // Check if user is awaiting audio conversion
  if (userAwaitingAudioConversion.has(userId.toString())) {
    // Handle audio conversion for URL
    if (ctx.message.text) {
      const validation = validateUrl(ctx.message.text);
      const startTime = Date.now();

      if (!validation.valid) {
        // Save failed request
        await saveRequest({
          userId: userId.toString(),
          username,
          requestType: 'mp3_conversion',
          url: ctx.message.text,
          status: 'failed',
          errorMessage: 'Invalid URL',
        });

        await ctx.reply('❌ Invalid URL. Please send an Instagram or TikTok link.');
        userAwaitingAudioConversion.delete(userId.toString());
        return;
      }

      try {
        // Save initial request
        const request = await saveRequest({
          userId: userId.toString(),
          username,
          requestType: 'mp3_conversion',
          platform: validation.platform,
          url: ctx.message.text,
          status: 'processing',
        });

        const processingMsg = await ctx.reply('⏳ Downloading and converting...');

        // Import services
        const instagramService = require('./services/instagramService');
        const tiktokService = require('./services/tiktokService');

        let videoPath;
        if (validation.platform === 'instagram') {
          videoPath = await instagramService.download(ctx.message.text);
        } else {
          videoPath = await tiktokService.download(ctx.message.text);
        }

        const audioPath = await audioService.convertToMP3(videoPath);

        // Get file size
        const fs = require('fs-extra');
        const stats = await fs.stat(audioPath);

        await ctx.replyWithAudio(
          { source: audioPath },
          { caption: '✅ MP3 conversion complete!' }
        );

        // Update request with success
        const processingTime = Date.now() - startTime;
        await updateRequestStatus(request._id, 'success', null, processingTime);

        await deleteFile(videoPath);
        await deleteFile(audioPath);
        await ctx.deleteMessage(processingMsg.message_id);

        userAwaitingAudioConversion.delete(userId.toString());
        await logger.info(`MP3 conversion completed for user ${userId}`);
      } catch (error) {
        // Update request with error
        const processingTime = Date.now() - startTime;
        await updateRequestStatus(request._id, 'failed', error.message, processingTime);

        await ctx.reply('❌ Conversion failed. Please try again.');
        userAwaitingAudioConversion.delete(userId.toString());
        await logger.error(`MP3 conversion error for user ${userId}`, error);
      }
    }
    // Handle audio conversion for file
    else if (ctx.message.video || ctx.message.document) {
      const startTime = Date.now();

      try {
        // Save initial request
        const request = await saveRequest({
          userId: userId.toString(),
          username,
          requestType: 'mp3_conversion',
          fileType: ctx.message.video ? 'mp4' : 'file',
          status: 'processing',
        });

        const processingMsg = await ctx.reply('🎵 Converting...');
        const fileId = ctx.message.video?.file_id || ctx.message.document?.file_id;

        // Download file from Telegram
        const file = await ctx.telegram.getFile(fileId);
        const filePath = `./temp/video_${Date.now()}.mp4`;

        await ctx.telegram.downloadFile(file.file_path, filePath);

        const audioPath = await audioService.convertToMP3(filePath);

        // Get file size
        const fs = require('fs-extra');
        const stats = await fs.stat(audioPath);

        await ctx.replyWithAudio(
          { source: audioPath },
          { caption: '✅ MP3 conversion complete!' }
        );

        // Update request with success
        const processingTime = Date.now() - startTime;
        await updateRequestStatus(request._id, 'success', null, processingTime);

        await deleteFile(filePath);
        await deleteFile(audioPath);
        await ctx.deleteMessage(processingMsg.message_id);

        userAwaitingAudioConversion.delete(userId.toString());
        await logger.info(`MP3 conversion from file completed for user ${userId}`);
      } catch (error) {
        // Update request with error
        const processingTime = Date.now() - startTime;
        await updateRequestStatus(request._id, 'failed', error.message, processingTime);

        await ctx.reply('❌ Conversion failed. Please try again.');
        userAwaitingAudioConversion.delete(userId.toString());
        await logger.error(`MP3 file conversion error for user ${userId}`, error);
      }
    }
  } else {
    // Handle regular message (URL)
    if (ctx.message.text) {
      const validation = validateUrl(ctx.message.text);

      if (validation.valid) {
        await urlHandler.handleUrl(ctx);
      } else {
        await ctx.reply(
          '❌ Unsupported URL or invalid format. Send an Instagram/TikTok link or use /help for commands.'
        );
      }
    }
  }
});

// Start bot
const startBot = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const WEBHOOK_URL = process.env.WEBHOOK_URL || process.env.RENDER_EXTERNAL_URL;
    const port = process.env.PORT || 3000;

    if (WEBHOOK_URL) {
      // Webhook mode (for Web Services)
      const hookPath = `/bot${process.env.BOT_TOKEN}`;
      await bot.launch({
        webhook: {
          domain: WEBHOOK_URL,
          port: Number(port),
          hookPath,
        },
      });

      console.log(`🤖 ClipCoreBot started (webhook) at ${WEBHOOK_URL}${hookPath} on port ${port}`);
      await logger.info(`Bot started (webhook) at ${WEBHOOK_URL}${hookPath}`);
    } else {
      // Polling mode (Background Worker)
      await bot.telegram.deleteWebhook().catch(() => {});
      await bot.launch({ dropPendingUpdates: true });

      console.log('🤖 ClipCoreBot started (polling/long-poll).');
      await logger.info('Bot started (polling)');
    }
  } catch (error) {
    console.error('❌ Failed to start bot:', error);
    await logger.error('Bot startup failed', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.once('SIGINT', () => {
  console.log('\n👋 Shutting down bot...');
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  console.log('\n👋 Shutting down bot...');
  bot.stop('SIGTERM');
});

startBot();
