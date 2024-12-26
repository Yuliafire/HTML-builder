const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const outputFile = path.join (outputDir, 'bundle.css');

async function buildCSSBundle() {
    try {
        //read styles folder
        const files = await fs.promises.readdir(stylesDir, { withFileTypes: true });

        //filter css files with filter method:
        const cssFiles = files.filter(file => file.isFile() && path.extname(file.name) === '.css');

        //read content of each css file in utf-8 encoded standards -like strings
       const cssContents = await Promise.all(
          cssFiles.map(file => fs.promises.readFile(path.join(stylesDir, file.name), 'utf-8'))
       );

       await fs.promises.mkdir(outputDir, { recursive: true });

       await fs.promises.writeFile(outputFile, cssContents.join('\n'));
       console.log('CSS bundle created successfully.');
    } catch (err) {
        console.error('Error building CSS bundle:', err);
    }
}

buildCSSBundle();