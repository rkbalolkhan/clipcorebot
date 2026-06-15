const fs = require('fs-extra');
const path = require('path');

const deleteFile = async (filePath) => {
  try {
    if (await fs.pathExists(filePath)) {
      await fs.remove(filePath);
      console.log(`🗑️  Deleted file: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error deleting file ${filePath}:`, error);
  }
};

const deleteFiles = async (filePaths) => {
  for (const filePath of filePaths) {
    await deleteFile(filePath);
  }
};

module.exports = {
  deleteFile,
  deleteFiles,
};
