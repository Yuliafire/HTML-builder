// Step 1: Import necessary modules
//fs: This module provides an API for interacting with the file system.
//path: This module provides utilities for working with file and directory paths.
const fs = require('fs');
const path =  require('path');

// Step 2: Construct the file path
//filePath: This variable holds the absolute path 
//to text.txt by joining the current directory (__dirname) with the filename text.txt.
const filePath = path.join(__dirname, 'text.txt');

//readStream: This creates a readable stream from the file at filePath.
const readStream  = fs.createReadStream(filePath);

// Step 4: Pipe the ReadStream to standard output
//This directs the data read from the file to the standard output (console).
readStream.pipe(process.stdout);

//handle errors
readStream.on('error', (err) => {
    console.error('Error reading the file:', err.message);
})
