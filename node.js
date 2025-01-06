import fs from 'fs';
import path from 'path';

const logAllFiles = (directoryPath) => {
  try {
    const files = fs.readdirSync(directoryPath);
    console.log(`Files in directory ${directoryPath}:`);
    files.forEach((file) => console.log(file));
    return files;
  } catch (error) {
    console.error(`Failed to read directory: ${directoryPath}`, error.message);
    return [];
  }
};

logAllFiles()