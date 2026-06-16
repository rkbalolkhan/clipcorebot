const path = require('path');
const User = require('../models/User');
const { t, getPreferredLanguage, setPreferredLanguage, SUPPORTED_LANGUAGES } = require('../utils/i18n');

const languageCommand = async (ctx) => {
  const telegramId = ctx.from.id.toString();
  const language = await getPreferredLanguage(telegramId);

  await ctx.sendChatAction('typing');
  await ctx.reply(t(language, 'languagePrompt'), {
    reply_markup: {
      inline_keyboard: [
        [
          { text: SUPPORTED_LANGUAGES.en, callback_data: 'lang_en' },
          { text: SUPPORTED_LANGUAGES.es, callback_data: 'lang_es' },
        ],
        [
          { text: SUPPORTED_LANGUAGES.hi, callback_data: 'lang_hi' },
          { text: SUPPORTED_LANGUAGES.id, callback_data: 'lang_id' },
        ],
        [
          { text: SUPPORTED_LANGUAGES.ms, callback_data: 'lang_ms' },
          { text: SUPPORTED_LANGUAGES.zh, callback_data: 'lang_zh' },
        ],
        [
          { text: SUPPORTED_LANGUAGES.ur, callback_data: 'lang_ur' },
          { text: SUPPORTED_LANGUAGES.ar, callback_data: 'lang_ar' },
        ],
        [
          { text: SUPPORTED_LANGUAGES.fa, callback_data: 'lang_fa' },
          { text: SUPPORTED_LANGUAGES.ta, callback_data: 'lang_ta' },
        ],
        [
          { text: SUPPORTED_LANGUAGES.te, callback_data: 'lang_te' },
        ],
      ],
    },
  });
};

module.exports = languageCommand;
