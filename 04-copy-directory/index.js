const fs = require('fs');
const path = require('path');

async function copyDir(src, dest) {
    try {
        // Create the destination folder if it does not exist
        await fs.promises.mkdir(dest, { recursive: true });

        // Read the contents of the source folder
        const entries = await fs.promises.readdir(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                // Recursively copy directories
                await copyDir(srcPath, destPath);
            } else if (entry.isFile()) {
                // Copy files
                await fs.promises.copyFile(srcPath, destPath);
            }
        }
    } catch (err) {
        console.error('Error copying directory:', err);
    }
}

// Define source and destination paths
const srcFolder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files-copy');

// Execute the function
copyDir(srcFolder, destFolder);