#!/bin/bash

# ClipCoreBot Setup Script
# This script helps set up the project dependencies

echo "🚀 ClipCoreBot Setup"
echo "===================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if command -v node &> /dev/null; then
    echo "  Node.js version: $(node -v)"
else
    echo "  ❌ Node.js not found. Please install Node.js first."
    exit 1
fi

# Check npm
echo "✓ Checking npm..."
if command -v npm &> /dev/null; then
    echo "  npm version: $(npm -v)"
else
    echo "  ❌ npm not found."
    exit 1
fi

# Check FFmpeg
echo "✓ Checking FFmpeg..."
if command -v ffmpeg &> /dev/null; then
    echo "  FFmpeg installed: $(ffmpeg -version | head -n1)"
else
    echo "  ⚠️  FFmpeg not found. Install with:"
    echo "     Windows: choco install ffmpeg"
    echo "     macOS: brew install ffmpeg"
    echo "     Linux: sudo apt-get install ffmpeg"
fi

# Check yt-dlp
echo "✓ Checking yt-dlp..."
if command -v yt-dlp &> /dev/null; then
    echo "  yt-dlp installed: $(yt-dlp --version)"
else
    echo "  ⚠️  yt-dlp not found. Install with:"
    echo "     pip install yt-dlp"
fi

echo ""
echo "📦 Installing npm dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Create a .env file with your BOT_TOKEN and MONGO_URI"
echo "2. Run: npm run dev (development) or npm start (production)"
echo ""
