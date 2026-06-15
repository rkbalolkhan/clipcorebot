const User = require("../models/User");

const startCommand = async (ctx) => {
  const telegramId = ctx.from.id.toString();
  const username = ctx.from.username || ctx.from.first_name || "Unknown";

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

    const welcomeMessage = `
🎬 *Welcome to ClipCoreBot*

Your all-in-one media assistant.

━━━━━━━━━━━━━━

✨ *Supported Platforms*

✅ Instagram
✅ TikTok
✅ Facebook
✅ X / Twitter
✅ YouTube
✅ MP3 Conversion

━━━━━━━━━━━━━━

🚀 *How to Use*

• Send a video link
• I'll process it automatically
• Download your media instantly

━━━━━━━━━━━━━━

📌 *Commands*

/help — Help menu
/mp3 — Convert videos to MP3
/ping — Check status
/version — Bot version

━━━━━━━━━━━━━━

❤️ Thanks for using *ClipCoreBot*
    `.trim();

    await ctx.replyWithPhoto(
      { source: "./assets/logo.png" },
      {
        caption: welcomeMessage,
        parse_mode: "Markdown",
      },
    );
  } catch (error) {
    console.error("Error in /start command:", error);

    await ctx.reply("❌ Something went wrong.\nPlease try again later.");
  }
};

module.exports = startCommand;
