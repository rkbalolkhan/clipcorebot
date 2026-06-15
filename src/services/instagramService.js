const YtDlpWrap = require('yt-dlp-wrap').default;
const path = require('path');
const fs = require('fs-extra');
const logger = require('../utils/logger');

// Prefer an env-provided yt-dlp path, fallback to system `yt-dlp` in PATH
const ytDlpPath = process.env.YT_DLP_PATH || 'yt-dlp';
const ytDlp = new YtDlpWrap(ytDlpPath);
const TEMP_DIR = path.join(__dirname, '../../temp');

const instagramService = {
  download: async (url) => {
    try {
      await fs.ensureDir(TEMP_DIR);

      const outputTemplate = path.join(TEMP_DIR, 'instagram_%(id)s.%(ext)s');

      console.log(`📥 Downloading Instagram video from: ${url}`);

      await ytDlp.execPromise([
        url,
        '--no-check-certificate',
        '-o',
        outputTemplate,
      ]);

      // Find the downloaded file
      const files = await fs.readdir(TEMP_DIR);
      const instagramFiles = files.filter((f) => f.startsWith('instagram_'));

      if (instagramFiles.length === 0) {
        throw new Error('No file found after download');
      }

      const filePath = path.join(TEMP_DIR, instagramFiles[0]);
      console.log(`✅ Instagram video downloaded: ${filePath}`);
      await logger.info(`Instagram download successful: ${url}`);

      return filePath;
    } catch (error) {
      console.error('❌ Instagram download error:', error);
      await logger.error(`Instagram download failed: ${url}`, error);
      throw error;
    }
  },
};

module.exports = instagramService;
