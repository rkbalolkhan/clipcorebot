const { exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const logger = require('../utils/logger');
const ffmpegPath = require('ffmpeg-static');

const audioService = {
  convertToMP3: async (inputPath) => {
    try {
      await fs.ensureDir(path.join(__dirname, '../../temp'));

      const fileName = path.basename(inputPath, path.extname(inputPath));
      const outputPath = path.join(path.dirname(inputPath), `${fileName}_audio.mp3`);

      console.log(`🎵 Converting video to MP3: ${inputPath}`);

      // FFmpeg command using bundled ffmpeg-static
      const command = `"${ffmpegPath}" -i "${inputPath}" -q:a 0 -map a "${outputPath}"`;

      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error('❌ FFmpeg error:', error.message);
            logger.error(`MP3 conversion failed for ${inputPath}`, error);
            reject(new Error(`FFmpeg conversion failed: ${error.message}`));
            return;
          }

          if (!fs.existsSync(outputPath)) {
            console.error('❌ Output file was not created');
            logger.error(`MP3 conversion failed - no output file for ${inputPath}`);
            reject(new Error('MP3 file was not created'));
            return;
          }

          console.log(`✅ MP3 conversion complete: ${outputPath}`);
          logger.info(`MP3 conversion successful for ${inputPath}`);
          resolve(outputPath);
        });
      });
    } catch (error) {
      console.error('❌ Audio conversion error:', error);
      await logger.error(`Audio conversion failed`, error);
      throw error;
    }
  },
};

module.exports = audioService;
