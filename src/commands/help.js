const helpCommand = async (ctx) => {
  const helpMessage = `
📚 *ClipCoreBot Help & Guide*

*Supported Platforms:*
🔗 Instagram - Reels, Posts, Videos
🔗 TikTok - Public Videos
(More platforms coming soon!)

*How to Download:*
1. Copy any Instagram or TikTok link
2. Send it to me in the chat
3. I'll download it instantly
4. Video will be sent back to you

*How to Convert to MP3:*
1. Send /mp3
2. Send a video link OR upload a video file
3. I'll extract the audio as MP3
4. Audio file will be sent back

*Available Commands:*
/start - Welcome message
/help - This message (help guide)
/mp3 - Convert video to MP3 audio

*Important Notes:*
⚠️ Videos must be under 50MB (Telegram limit)
⚠️ Files are auto-deleted after sending
⚠️ Processing time depends on video size
⚠️ Public videos only (private videos won't work)

*Tips & Tricks:*
💡 Send multiple links one by one
💡 Use /mp3 for audio extraction
💡 Check /help anytime for this guide
💡 Works 24/7, always online!

*Issues?*
❌ If download fails, try another link
❌ Check internet connection
❌ Make sure link is correct
❌ Report bugs by sending /start

Ready to download? Just send a link! 🎉
    `.trim();

  await ctx.reply(helpMessage);
};

module.exports = helpCommand;
