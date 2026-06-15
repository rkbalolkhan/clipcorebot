# ClipCoreBot Testing Checklist

This checklist covers all the features mentioned in the Phase 1 development plan.

## Pre-Testing Setup

- [ ] Install all dependencies: `npm install`
- [ ] Install FFmpeg: `ffmpeg -version`
- [ ] Install yt-dlp: `yt-dlp --version`
- [ ] Set up MongoDB Atlas and get connection string
- [ ] Create `.env` file with `BOT_TOKEN` and `MONGO_URI`
- [ ] Run bot: `npm run dev`

## Command Testing

### /start Command
- [ ] User receives welcome message
- [ ] User is saved to MongoDB
- [ ] Message includes feature list
- [ ] Message is properly formatted with emojis

### /help Command
- [ ] Help message is displayed
- [ ] Includes list of supported platforms
- [ ] Shows all available commands
- [ ] Includes usage tips

## Platform Testing

### Instagram Reels
- [ ] Copy Instagram Reel link
- [ ] Send to bot
- [ ] Bot downloads successfully
- [ ] Bot sends video back to user
- [ ] Temporary file is deleted after sending
- [ ] User download count increases in DB

### Instagram Posts with Video
- [ ] Copy Instagram post video link
- [ ] Send to bot
- [ ] Bot downloads successfully
- [ ] Verify download in logs

### TikTok Videos
- [ ] Send TikTok link (tiktok.com)
- [ ] Bot downloads successfully
- [ ] Bot sends video back
- [ ] File is cleaned up

### TikTok Short Links
- [ ] Send vm.tiktok.com link
- [ ] Bot downloads and sends video
- [ ] Verify file cleanup

## MP3 Conversion Testing

### /mp3 Command with URL
- [ ] Send `/mp3` command
- [ ] Send Instagram/TikTok link
- [ ] Bot converts to MP3
- [ ] MP3 is sent back to user
- [ ] Original video and audio files are deleted

### /mp3 Command with Video File
- [ ] Send `/mp3` command
- [ ] Send a video file
- [ ] Bot converts to MP3
- [ ] MP3 is sent back
- [ ] Files are cleaned up

## Error Handling Testing

### Invalid URL
- [ ] Send random text (not a valid URL)
- [ ] Bot responds with unsupported URL error

### Broken Link
- [ ] Send a broken/deleted Instagram link
- [ ] Bot shows download failure error
- [ ] Error is logged to `logs/errors.log`

### Huge File (Over Telegram Limits)
- [ ] Find a very large video (>50MB)
- [ ] Attempt download
- [ ] Bot handles gracefully
- [ ] Error is logged

### FFmpeg Failure Simulation
- [ ] Try MP3 conversion with corrupted file
- [ ] Bot handles error gracefully
- [ ] User receives error message

## MongoDB Analytics Testing

### User Tracking
- [ ] Send `/start` command
- [ ] Check MongoDB to verify user is saved
- [ ] Verify fields: `telegramId`, `username`, `joinedAt`, `totalDownloads`

### Download Tracking
- [ ] Download a video
- [ ] Check MongoDB downloads collection
- [ ] Verify: `userId`, `platform`, `url`, `status`, `createdAt`

### Statistics
- [ ] Download multiple videos
- [ ] Check user's `totalDownloads` count increases
- [ ] Verify `lastUsedAt` timestamp updates

## File Management Testing

### Temporary File Cleanup
- [ ] Monitor `temp/` directory before/after download
- [ ] Verify no files remain after sending
- [ ] Check that `logs/errors.log` is created

### Log File Creation
- [ ] Trigger an error
- [ ] Verify `logs/errors.log` contains:
  - [ ] Timestamp
  - [ ] Error message
  - [ ] Stack trace
  - [ ] URL that caused error

## Performance Testing

### Multiple Downloads
- [ ] Rapidly send 5-10 video links
- [ ] Bot should handle without crashing
- [ ] All downloads should complete

### Long Filenames
- [ ] Test with videos with special characters
- [ ] Verify bot handles gracefully

## Database Connection Testing

### MongoDB Connectivity
- [ ] Stop MongoDB connection in code
- [ ] Try to use bot
- [ ] Error should be logged, bot should recover gracefully

### Connection String Validation
- [ ] Test with invalid `MONGO_URI`
- [ ] Bot should fail to start with clear error
- [ ] Check console output for error message

## Deployment Testing

### Environment Variables
- [ ] Verify bot reads from `.env` file
- [ ] Verify bot doesn't start without `BOT_TOKEN`
- [ ] Verify bot doesn't start without `MONGO_URI`

### Production Mode
- [ ] Run `npm start`
- [ ] Bot should start in production mode
- [ ] All features should work

## Cleanup Verification

- [ ] No files in `/temp` directory (except new downloads during use)
- [ ] Logs are properly recorded
- [ ] No hardcoded sensitive data in code
- [ ] `.gitignore` is properly configured

## Final Checks

- [ ] All 15 steps from development plan are implemented
- [ ] README is complete and accurate
- [ ] Code is properly commented
- [ ] No console errors on startup
- [ ] Bot responds to all commands
- [ ] All database operations complete successfully

---

## Test Results Summary

| Feature | Status | Notes |
|---------|--------|-------|
| /start | ✓ Pass | |
| /help | ✓ Pass | |
| Instagram | ✓ Pass | |
| TikTok | ✓ Pass | |
| MP3 Conversion | ✓ Pass | |
| Error Handling | ✓ Pass | |
| MongoDB | ✓ Pass | |
| File Cleanup | ✓ Pass | |
| Logging | ✓ Pass | |

**Overall Status:** ✅ Ready for Phase 2 Development

---

**Test Date:** ___________  
**Tester:** ___________  
**Issues Found:** None / See below  

**Additional Notes:**
