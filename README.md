# ClipCoreBot - Phase 1 (MVP)

A Telegram bot for downloading Instagram Reels and TikTok videos, with support for MP3 conversion.

## Features

- ✅ Download Instagram Reels and Videos
- ✅ Download TikTok Videos
- ✅ Convert videos to MP3
- ✅ User tracking with MongoDB
- ✅ Automatic file cleanup
- ✅ Error logging
- ✅ Basic error handling

## Prerequisites

Before you start, ensure you have the following installed:

1. **Node.js** (v14 or higher)
2. **FFmpeg** - for audio conversion
3. **yt-dlp** - for downloading videos
4. **MongoDB** - for user tracking

### Installation

#### 1. FFmpeg

**Windows:**
```bash
# Using chocolatey
choco install ffmpeg

# Or download from: https://ffmpeg.org/download.html
```

**macOS:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt-get install ffmpeg
```

Verify installation:
```bash
ffmpeg -version
```

#### 2. yt-dlp

**Windows:**
```bash
pip install yt-dlp
```

**macOS/Linux:**
```bash
brew install yt-dlp
# or
pip install yt-dlp
```

Verify installation:
```bash
yt-dlp --version
```

#### 3. MongoDB

- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster
- Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/clipcorebot`)

## Setup

### 1. Clone or navigate to the project

```bash
cd clipcorebot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```bash
BOT_TOKEN=your_telegram_bot_token_here
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/clipcorebot
NODE_ENV=development
```

**How to get Telegram Bot Token:**
1. Open Telegram and search for **BotFather**
2. Send `/newbot` command
3. Follow the instructions to create a bot
4. Copy your bot token

### 4. Start the bot

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## Project Structure

```
clipcorebot/
├── src/
│   ├── commands/          # Bot commands (/start, /help, /mp3)
│   ├── handlers/          # URL message handler
│   ├── services/          # Download & conversion services
│   ├── models/            # MongoDB schemas (User, Download)
│   ├── utils/             # Utilities (logger, file cleanup, validation)
│   ├── config/            # Database configuration
│   └── index.js           # Main bot file
├── temp/                  # Temporary files (auto-cleaned)
├── logs/                  # Error logs
├── package.json
├── .env                   # Environment variables (not in git)
└── .gitignore
```

## Usage

### Available Commands

1. **/start** - Welcome message and register user
2. **/help** - Show help message
3. **/mp3** - Convert a video to MP3

### How to Use

1. **Download a video:**
   - Send an Instagram or TikTok link
   - Bot will download and send you the video

2. **Convert to MP3:**
   - Send `/mp3`
   - Send a video link or file
   - Bot will convert and send you the MP3

## Supported Platforms

- 🔗 Instagram (Reels, Posts, Videos)
- 🔗 TikTok (Public Videos)

## Error Handling

The bot handles:
- ❌ Invalid URLs
- ❌ Download failures
- ❌ File size limits (Telegram limitations)
- ❌ Conversion failures
- ❌ Network errors

All errors are logged to `logs/errors.log` with timestamps.

## Database Schema

### User Model
```javascript
{
  telegramId: String (unique),
  username: String,
  joinedAt: Date,
  totalDownloads: Number,
  lastUsedAt: Date
}
```

### Download Model
```javascript
{
  userId: String,
  platform: String ('instagram' | 'tiktok'),
  url: String,
  createdAt: Date,
  status: String ('pending' | 'success' | 'failed'),
  errorMessage: String
}
```

## Deployment

### Using Railway.app

1. Push code to GitHub
2. Connect repository to Railway
3. Add environment variables in Railway dashboard
4. Deploy

### Using Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repository
4. Add environment variables
5. Deploy

## Troubleshooting

### Bot not responding
- Check if `BOT_TOKEN` is correct
- Verify bot is running: `npm start` or `npm run dev`
- Check logs: `cat logs/errors.log`

### Download failures
- Verify yt-dlp is installed: `yt-dlp --version`
- Check internet connection
- Try a different link

### MP3 conversion not working
- Verify FFmpeg is installed: `ffmpeg -version`
- Check if FFmpeg is in system PATH

### MongoDB connection error
- Verify `MONGO_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure cluster is running

## Next Steps (Phase 2)

- [ ] YouTube video support
- [ ] Custom file naming
- [ ] Download history
- [ ] Batch downloads
- [ ] Premium features
- [ ] Web dashboard

## License

MIT

## Support

For issues or questions, feel free to open an issue or contact support.

---

**Happy downloading! 🎉**
