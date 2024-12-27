
const fs = require('fs');
const path = require('path');

//set the paths
const projectDist = path.join(__dirname, 'project-dist');
const outputHTML = path.join(projectDist, 'index.html');

const stylesDir = path.join(__dirname, 'styles');
const outputCSS = path.join(projectDist, 'styles.css');

const assetsDir = path.join(__dirname, 'assets');
const outputAssets = path.join(projectDist, 'assets');

const templateFile = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');

//create folder project-dist
async function createProjectDist() {
    try {
        await fs.promises.mkdir(projectDist, { recursive: true });
        console.log('folder "project-dist" created successfully');
    } catch (err) {
       console.error('error creating folder');
    }
}

async function replaceTemplateTags() {
    try {
        //read a template.html file
        let templateContent = await fs.promises.readFile(templateFile, 'utf-8');
       //read components html
        const componentFiles = await fs.promises.readdir(componentsDir);

        for (const file of componentFiles) {
            const componentName = path.basename(file, '.html');
            const componentContent = await fs.promises.readFile(path.join(componentsDir, file), 'utf-8');
            const tag = `{{${componentName}}}`;
            templateContent = templateContent.replace(new RegExp(tag, 'g'), componentContent);

        }
        await fs.promises.writeFile(outputHTML, templateContent);
        console.log('Template tags replaced');
    } catch (err) {
        console.error("error replacing tags:", err);
    }
}

async function compileStyles() {
    try {
        //read all files in the styles directory
        const files = await fs.promises.readdir(stylesDir);
        //ensure all files in the dir with css extension by using filter for an array
        const cssFiles = files.filter(file => path.extname(file) === '.css');
        let stylesContent = '';

        //implement reading the content of each file
        //in the array where all files with css extension
        //then concatenate the content of each css file 
        //to make the whole content for one css file
        //use method for.... of {}
        for (const file of cssFiles) {
            //set path to each file in the directory
            const filePath = path.join(stylesDir, file);
            const fileContent = await fs.promises.readFile(filePath, 'utf-8');
            stylesContent += fileContent + '\n';
        }
            await fs.promises.writeFile(outputCSS, stylesContent);
            console.log('Styles compiled');
        } catch (err) {
            console.error('error compiling styles:', err);
        }
    }


    //Copies the `assets` folder into `project-dist/assets`
    async function copyAssets(src, dest) {
        try {
            await fs.promises.mkdir(dest, { recursive: true });
            const entries = await fs.promises.readdir(src, { withFileTypes: true });

            for (const entry of entries) {
                const srcPath = path.join(src, entry.name);
                const destPath = path.join(dest, entry.name);

                if (entry.isDirectory()) {
                    await copyAssets(srcPath, destPath);

                } else {
                    await fs.promises.copyFile(srcPath, destPath);
                }
            }
           console.log('assets copied');
        } catch (err) {
            console.error("error copying assets", err);
        }
     }

    async function buildPage() {
        try {
            await createProjectDist();
            await replaceTemplateTags();
            await compileStyles();
            await copyAssets(assetsDir, outputAssets);
        } catch (err) {
            console.error('Error building page:', err);
        }
    }

    buildPage();









