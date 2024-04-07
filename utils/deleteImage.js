const fs = require('fs').promises;
const path = require('path');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

async function deleteImage(imagePath) {
  // Remove './' from the beginning of the path
  const cleanedPath = imagePath.replace(/^\.\/+/, '');

  console.log('imagePath', imagePath);
  console.log('cleanedPath', cleanedPath);


  // Resolve the cleaned relative path to get the absolute path
  const absolutePath = path.resolve(appDir, cleanedPath);

  console.log('absolutePath', absolutePath);


  try {
    // Check if the file exists
    await fs.access(absolutePath);

    // If the file exists, delete it
    await fs.unlink(absolutePath);
    console.log('Image deleted successfully.');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Image does not exist.');
    } else {
      console.error('Error deleting image:', error);
    }
  }
}


module.exports = { deleteImage }