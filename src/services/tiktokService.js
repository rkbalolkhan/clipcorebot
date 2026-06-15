const YtDlpWrap = require("yt-dlp-wrap").default;
const path = require("path");
const fs = require("fs-extra");
const logger = require("../utils/logger");

const ytDlpPath = process.env.YT_DLP_PATH || "yt-dlp";
const ytDlp = new YtDlpWrap(ytDlpPath);

const TEMP_DIR = path.join(__dirname, "../../temp");

const tiktokService = {
  download: async (url) => {
    try {
      await fs.ensureDir(TEMP_DIR);

      // Unique ID prevents collisions between users
      const uniqueId = Date.now();

      const outputTemplate = path.join(TEMP_DIR, `tiktok_${uniqueId}.%(ext)s`);

      console.log(`📥 Downloading TikTok video from: ${url}`);

      await ytDlp.execPromise([
        url,
        "--no-check-certificates",
        "--user-agent",
        "Mozilla/5.0",
        "--extractor-args",
        "tiktok:api_hostname=api16-normal-c-useast1a.tiktokv.com",
        "-o",
        outputTemplate,
      ]);

      // Find only this user's file
      const files = await fs.readdir(TEMP_DIR);

      const downloadedFile = files.find((file) =>
        file.startsWith(`tiktok_${uniqueId}`),
      );

      if (!downloadedFile) {
        throw new Error("No downloaded file found.");
      }

      const filePath = path.join(TEMP_DIR, downloadedFile);

      console.log(`✅ TikTok video downloaded: ${filePath}`);

      await logger.info(`TikTok download successful: ${url}`);

      return filePath;
    } catch (error) {
      console.error("❌ TikTok download error:", error);

      await logger.error(`TikTok download failed: ${url}`, error);

      throw error;
    }
  },
};

module.exports = tiktokService;
