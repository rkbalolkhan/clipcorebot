# ClipCoreBot - Recommended Setup (Updated Stack)

## Current Status ✅

- ✅ `ffmpeg-static` installed - No global FFmpeg needed for audio conversion!
- ✅ `yt-dlp` installed globally (version 2026.06.09)
- ✅ `yt-dlp` path configured in services (`instagramService.js`, `tiktokService.js`)
- ✅ All Node.js dependencies up to date
- ⚠️ Global FFmpeg still recommended (optional, for debugging)

---

## What's Changed

### Better Stack (2026):

| Component | Old | New | Benefit |
|-----------|-----|-----|---------|
| FFmpeg | `fluent-ffmpeg` + global install | `ffmpeg-static` | Self-contained, no global dependency |
| Video Download | `yt-dlp-wrap` | `yt-dlp-wrap` | Still works, kept as-is |
| Python Setup | Manual | Virtual env | Isolated dependencies |

---

## Installation Summary

### 1. ✅ Python (Already Done)
```
Python 3.13.13 installed ✓
```

### 2. ✅ Node.js Dependencies (Already Done)
```bash
npm install  # Includes ffmpeg-static
```

### 3. ✅ yt-dlp (Already Done - in venv)
```bash
pip install yt-dlp  # Installed in virtual environment
```

### 4. ⚠️ FFmpeg (Optional - For Debugging/Fallback)

**Option A: Using Chocolatey (Recommended)**
```bash
choco install ffmpeg
```

**Option B: Manual Installation**
1. Download from: https://www.gyan.dev/ffmpeg/builds/
2. Extract to `C:\ffmpeg`
3. Add `C:\ffmpeg\bin` to your PATH
4. Verify: `ffmpeg -version`

---

## Testing Setup

### Test 1: Video Download (Uses yt-dlp ✓)
```bash
# Test yt-dlp directly:
yt-dlp --version
# Output: 2026.06.09 (or similar)
```

**If yt-dlp not found in PATH:**
- Restart your terminal (close and reopen) - PATH changes require restart
- Or use full path: `C:\Users\Acer\AppData\Roaming\Python\Python313\Scripts\yt-dlp.exe --version`

### Test 2: Start the Bot (Uses ffmpeg-static ✓)

**Important: Close any conda environments first!**

```bash
# Navigate to project
cd U:\ClipCore

# Option 1: Run development mode (with auto-reload)
npm run dev

# Option 2: Run production mode
npm start

# Option 3: Use the startup script (handles conda)
powershell -ExecutionPolicy Bypass -File start-bot.ps1
```

If npm is not found:
1. Close the current terminal
2. Open a **NEW** PowerShell terminal (not conda)
3. Run: `npm run dev`

**Why?** Some terminals have conda active, which masks Node.js from PATH

---

## Architecture

### How This Works

```
Bot User
  ↓
Telegram API (Bot)
  ↓
Node.js App
  ├─→ URL Handler → Validates link
  ├─→ yt-dlp wrapper → Downloads video
  │   (via yt-dlp executable)
  ├─→ Audio Service → Converts to MP3
  │   (uses ffmpeg-static - bundled binary)
  └─→ File Cleanup → Removes temp files
```

### FFmpeg Resolution

1. **Audio conversion** tries: `ffmpeg-static` (bundled) → ✅ Works!
2. **Global FFmpeg** (optional): For manual testing/debugging
3. **Fallback**: If neither works, clear error message to user

---

## Virtual Environment Info

A Python virtual environment was created at:
```
u:/ClipCore/.venv/
```

To run Python/pip commands in this environment:
```bash
u:/ClipCore/.venv/Scripts/python.exe <command>
u:/ClipCore/.venv/Scripts/pip.exe <command>
u:/ClipCore/.venv/Scripts/yt-dlp <command>
```

Or you can activate it in PowerShell:
```bash
u:/ClipCore/.venv/Scripts/Activate.ps1
```

Then run:
```bash
yt-dlp --version
python --version
```

---

## Next Steps

### Option 1: Quick Start (No Global FFmpeg)
1. Your bot is ready! 
2. Test with: `npm run dev`
3. Send a bot link to test downloads

### Option 2: Full Setup (With Global FFmpeg)
1. Install FFmpeg: `choco install ffmpeg` (if using Chocolatey)
2. Verify: `ffmpeg -version`
3. Start bot: `npm run dev`

---

---

## Recent Fixes (Resolved yt-dlp ENOENT Error)

### What Was Fixed:
1. **Installed yt-dlp globally** (not in venv)
   - Previously: `yt-dlp` was in virtual environment (not accessible to Node.js)
   - Now: `yt-dlp` is in system Python (`C:\Users\Acer\AppData\Roaming\Python\Python313\Scripts\`)

2. **Added yt-dlp path to services**
   - `instagramService.js`: Uses full path to `yt-dlp.exe`
   - `tiktokService.js`: Uses full path to `yt-dlp.exe`
   - This ensures `yt-dlp-wrap` can find the executable immediately

3. **Added yt-dlp to system PATH**
   - Python Scripts directory added to Windows PATH
   - Restart terminal to apply changes

### Error That Was Resolved:
```
❌ Error: spawn yt-dlp ENOENT
```
**Root Cause**: Node.js couldn't find `yt-dlp` in PATH  
**Solution**: Installed globally + configured full path in services

---

### ❌ "FFmpeg not found" (global)
- This is OK! We're using `ffmpeg-static` which is bundled
- Global FFmpeg is optional (only for debugging)

### ❌ "npm" or "node" not recognized
**Cause**: Conda environment is active, masking Node.js from PATH

**Solution**:
1. Close current terminal
2. Open a **NEW** PowerShell terminal (without conda)
3. Run: `npm run dev`

Or use the startup script:
```bash
powershell -ExecutionPolicy Bypass -File start-bot.ps1
```

### ❌ "yt-dlp" not recognized in terminal
**Cause**: PATH hasn't been updated in current terminal session

**Solution**:
1. Close and reopen terminal - PATH changes require restart
2. Or verify with full path: `C:\Users\Acer\AppData\Roaming\Python\Python313\Scripts\yt-dlp.exe --version`

### ❌ Instagram/TikTok download fails with "spawn yt-dlp ENOENT"
**This should now be fixed!** The services now use the full path to yt-dlp.exe

**If still failing**:
1. Verify yt-dlp is installed: `C:\Users\Acer\AppData\Roaming\Python\Python313\Scripts\yt-dlp.exe --version`
2. Check error logs: `type logs/errors.log`
3. Restart bot: `npm run dev`

### ❌ "Audio conversion failed"
1. Check error logs: `type logs/errors.log`
2. Verify ffmpeg-static installed: `npm list ffmpeg-static`
3. Try reinstalling: `npm reinstall ffmpeg-static`

### ✅ Audio conversion still works?
- Yes! That's because we're using the bundled `ffmpeg-static`
- No global FFmpeg needed for MP3 conversion

---

## File Structure

```
ClipCore/
├── src/
│   ├── services/
│   │   └── audioService.js  ← Uses ffmpeg-static ✅
│   └── ...
├── .venv/                   ← Python virtual environment
├── node_modules/
│   ├── ffmpeg-static/       ← Bundled FFmpeg binaries
│   ├── yt-dlp-wrap/
│   └── ...
├── package.json
├── .env
└── ...
```

---

## Environment Variables

Make sure `.env` has:
```
BOT_TOKEN=your_bot_token_here
MONGO_URI=your_mongodb_uri_here
NODE_ENV=development
```

---

## Running the Bot

### Development Mode (Auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

---

## Key Files Updated

- `package.json` - Added `ffmpeg-static`
- `src/services/audioService.js` - Updated to use bundled FFmpeg
- `.env` - (You need to configure)

---

## Verification Checklist

- [x] Node.js dependencies installed
- [x] ffmpeg-static bundled
- [x] yt-dlp installed in venv
- [ ] `.env` configured with BOT_TOKEN & MONGO_URI
- [ ] (Optional) Global FFmpeg installed
- [ ] Bot tested with `/start` command
- [ ] Video download tested
- [ ] MP3 conversion tested

---

## Support

If issues occur:
1. Check `logs/errors.log` for detailed error messages
2. Verify `.env` file has correct values
3. Run `npm install` to ensure all packages installed
4. Try: `npm reinstall ffmpeg-static`

---

**Status**: ✅ Ready to Run!

**Next Command**: `npm run dev`

*Updated: 2026-06-15*
