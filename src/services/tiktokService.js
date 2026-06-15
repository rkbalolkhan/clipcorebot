const axios = require('axios');
const YtDlpWrap = require('yt-dlp-wrap').default;
const path = require('path');
const fs = require('fs-extra');
const logger = require('../utils/logger');

// Prefer an env-provided yt-dlp path, fallback to system `yt-dlp` in PATH
const ytDlpPath = process.env.YT_DLP_PATH || 'yt-dlp';
const ytDlp = new YtDlpWrap(ytDlpPath);
const TEMP_DIR = path.join(__dirname, '../../temp');

const expandUrl = async (url) => {
  try {
    const response = await axios.get(url, {
      maxRedirects: 5,
      validateStatus: null,
    });

    return response.request?.res?.responseUrl || url;
  } catch (error) {
    console.warn(`⚠️ Could not expand short URL: ${url}`, error.message);
    return url;
  }
};

const tiktokService = {
  download: async (url) => {
    try {
      await fs.ensureDir(TEMP_DIR);

      const expandedUrl = await expandUrl(url);
      const outputTemplate = path.join(TEMP_DIR, 'tiktok_%(id)s.%(ext)s');

      console.log(`📥 Downloading TikTok video from: ${expandedUrl}`);

      await ytDlp.execPromise([
        expandedUrl,
        '--no-check-certificates',
        '-o',
        outputTemplate,
      ]);

      // Find the downloaded file
      const files = await fs.readdir(TEMP_DIR);
      const tiktokFiles = files.filter((f) => f.startsWith('tiktok_'));

      if (tiktokFiles.length === 0) {
        throw new Error('No file found after download');
      }

      const filePath = path.join(TEMP_DIR, tiktokFiles[0]);
      console.log(`✅ TikTok video downloaded: ${filePath}`);
      await logger.info(`TikTok download successful: ${url}`);

      return filePath;
    } catch (error) {
      console.error('❌ TikTok download error:', error);
      await logger.error(`TikTok download failed: ${url}`, error);
      throw error;
    }
  },
};

module.exports = tiktokService;
