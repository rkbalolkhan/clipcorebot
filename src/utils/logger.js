const fs = require('fs-extra');
const path = require('path');

const logger = {
  log: async (level, message, error = null) => {
    const timestamp = new Date().toISOString();
    const logDir = path.join(__dirname, '../../logs');
    
    await fs.ensureDir(logDir);
    
    const logFile = path.join(logDir, 'errors.log');
    let logEntry = `[${timestamp}] [${level}] ${message}`;
    
    if (error) {
      logEntry += `\n${error.stack || error}`;
    }
    
    logEntry += '\n';
    
    try {
      await fs.appendFile(logFile, logEntry);
    } catch (err) {
      console.error('Error writing to log file:', err);
    }
  },

  error: (message, error) => logger.log('ERROR', message, error),
  info: (message) => logger.log('INFO', message),
  warn: (message) => logger.log('WARN', message),
};

module.exports = logger;
