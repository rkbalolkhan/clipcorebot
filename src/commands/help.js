const path = require('path');
const { t } = require('../utils/i18n');

const helpCommand = async (ctx, language = 'en') => {
  await ctx.sendChatAction('typing');

  await ctx.replyWithPhoto(
    { source: path.join(__dirname, '../assets/logo.png') },
    {
      caption: t(language, 'helpCaption'),
      parse_mode: 'Markdown',
      reply_markup: {
        keyboard: [[{ text: '/language' }]],
        resize_keyboard: true,
        one_time_keyboard: false,
      },
    }
  );
};

module.exports = helpCommand;
