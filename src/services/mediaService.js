const YtDlpWrap = require('yt-dlp-wrap').default;
const path = require('path');
const fs = require('fs-extra');
const crypto = require('crypto');
const logger = require('../utils/logger');

const ytDlpPath = process.env.YT_DLP_PATH || 'yt-dlp';
const ytDlp = new YtDlpWrap(ytDlpPath);
const TEMP_DIR = path.join(__dirname, '../../temp');

const extractorArgs = {
  tiktok: ['--extractor-args', 'tiktok:api_hostname=api16-normal-c-useast1a.tiktokv.com'],
};

const platformArgs = {
  instagram: ['--no-check-certificates', '--user-agent', 'Mozilla/5.0'],
  tiktok: ['--no-check-certificates', '--user-agent', 'Mozilla/5.0', ...extractorArgs.tiktok],
  facebook: ['--no-check-certificates', '--user-agent', 'Mozilla/5.0'],
  twitter: ['--no-check-certificates', '--user-agent', 'Mozilla/5.0'],
  youtube: [
    '--no-check-certificates',
    '--user-agent',
    'Mozilla/5.0',
    '-f',
    'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
    '--merge-output-format',
    'mp4',
  ],
};

const mediaService = {
  download: async (platform, url) => {
    if (!platformArgs[platform]) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    try {
      await fs.ensureDir(TEMP_DIR);
      const uniqueId = crypto.randomUUID();
      const outputTemplate = path.join(TEMP_DIR, `media_${platform}_${uniqueId}.%(ext)s`);

      console.log(`📥 Downloading ${platform} media from: ${url}`);

      const args = [
        url,
        ...platformArgs[platform],
        '-o',
        outputTemplate,
      ];

      await ytDlp.execPromise(args);

      const files = await fs.readdir(TEMP_DIR);
      const downloadedFile = files.find((file) => file.startsWith(`media_${platform}_${uniqueId}`));

      if (!downloadedFile) {
        throw new Error('No downloaded file found.');
      }

      const filePath = path.join(TEMP_DIR, downloadedFile);
      console.log(`✅ ${platform} download successful: ${filePath}`);
      await logger.info(`${platform} download successful: ${url}`);
      return filePath;
    } catch (error) {
      console.error(`❌ ${platform} download error:`, error);
      await logger.error(`${platform} download failed: ${url}`, error);
      throw error;
    }
  },
};

module.exports = mediaService;
