const User = require('../models/User');

const startCommand = async (ctx) => {
  const telegramId = ctx.from.id.toString();
  const username = ctx.from.username || 'Unknown';

  try {
    // Save or update user in database
    await User.updateOne(
      { telegramId },
      {
        $set: {
          telegramId,
          username,
          lastUsedAt: new Date(),
        },
      },
      { upsert: true }
    );

    const welcomeMessage = `
🎬 *Welcome to ClipCoreBot!* 🎬

I help you download and convert your favorite videos instantly.

*What can I do?*
✅ Instagram Reels & Videos
✅ TikTok Videos  
✅ Convert to MP3 (extract audio)
✅ Save to your device
✅ Fast & Reliable

*Quick Start:*
1️⃣ Send any Instagram or TikTok link
2️⃣ I'll download it for you
3️⃣ Or use /mp3 to convert videos to audio

*Available Commands:*
/start - Show this message
/help - Get more information
/mp3 - Convert video to MP3 audio

Just paste a video link and I'll handle the rest! 🚀
    `.trim();

    await ctx.reply(welcomeMessage);
  } catch (error) {
    console.error('Error in /start command:', error);
    await ctx.reply('❌ Something went wrong. Please try again.');
  }
};

module.exports = startCommand;
