const path = require('path');
const User = require('../models/User');
const { t } = require('../utils/i18n');

const startCommand = async (ctx, language = 'en') => {
  const telegramId = ctx.from.id.toString();
  const username = ctx.from.username || ctx.from.first_name || 'Unknown';

  try {
    await User.updateOne(
      { telegramId },
      {
        $set: {
          telegramId,
          username,
          lastUsedAt: new Date(),
        },
      },
      { upsert: true },
    );

    const welcomeMessage = t(language, 'startWelcome');

    await ctx.replyWithPhoto(
      { source: path.join(__dirname, '../assets/logo.png') },
      {
        caption: welcomeMessage,
        parse_mode: 'Markdown',
        reply_markup: {
          keyboard: [[{ text: '/help' }, { text: '/language' }]],
          resize_keyboard: true,
          one_time_keyboard: false,
        },
      },
    );
  } catch (error) {
    console.error("Error in /start command:", error);

    await ctx.reply("❌ Something went wrong.\nPlease try again later.");
  }
};

module.exports = startCommand;
