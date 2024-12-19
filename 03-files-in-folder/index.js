const fs = require('fs');
const path = require('path');

// Define the path to the secret folder
const secretFolderPath = path.join(__dirname, 'secret-folder');

// Function to display information about files in the secret folder
async function displayFilesInfo() {
    try {
        // Read the contents of the secret folder
        const files = await fs.promises.readdir(secretFolderPath, { withFileTypes: true });

        for (const file of files) {
            if (file.isFile()) {
                // Get the full path of the file
                const filePath = path.join(secretFolderPath, file.name);

                // Retrieve file stats
                const stats = await fs.promises.stat(filePath);

                // Extract file information
                const { name, ext } = path.parse(file.name);
                const size = stats.size;

                // Display file data in the console
                console.log(`${name} - ${ext.slice(1)} - ${size} kb`);
            }
        }
    } catch (err) {
        console.error('Error reading the secret folder:', err);
    }
}

// Execute the function
displayFilesInfo();