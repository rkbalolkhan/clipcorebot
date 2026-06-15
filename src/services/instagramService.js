const YtDlpWrap = require("yt-dlp-wrap").default;
const path = require("path");
const fs = require("fs-extra");
const crypto = require("crypto");
const logger = require("../utils/logger");

const ytDlpPath = process.env.YT_DLP_PATH || "yt-dlp";
const ytDlp = new YtDlpWrap(ytDlpPath);

const TEMP_DIR = path.join(__dirname, "../../temp");

const instagramService = {
  download: async (url) => {
    try {
      await fs.ensureDir(TEMP_DIR);

      const uniqueId = crypto.randomUUID();

      const outputTemplate = path.join(
        TEMP_DIR,
        `instagram_${uniqueId}.%(ext)s`,
      );

      console.log(`📥 Downloading Instagram media from: ${url}`);

      await ytDlp.execPromise([
        url,
        "--no-check-certificates",
        "--user-agent",
        "Mozilla/5.0",
        "-o",
        outputTemplate,
      ]);

      const files = await fs.readdir(TEMP_DIR);

      const downloadedFile = files.find((file) =>
        file.startsWith(`instagram_${uniqueId}`),
      );

      if (!downloadedFile) {
        throw new Error("No downloaded file found");
      }

      const filePath = path.join(TEMP_DIR, downloadedFile);

      console.log(`✅ Instagram download successful: ${filePath}`);

      await logger.info(`Instagram download successful: ${url}`);

      return filePath;
    } catch (error) {
      console.error("❌ Instagram download error:", error);

      await logger.error(`Instagram download failed: ${url}`, error);

      throw error;
    }
  },
};

module.exports = instagramService;
