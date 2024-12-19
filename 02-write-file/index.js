const fs = require('fs');
const path = require('path');
const readline = require('readline');


// Ensure the directory exists
const dirPath = path.join(__dirname);
const filePath = path.join(dirPath, 'output.txt');

// A method from the fs (file system) module that creates a writable stream.
const writeStream = fs.createWriteStream(filePath, { flags: 'a'});

console.log('Hey, there! Please enter your text. Type "exit" or press Ctrl+C to quite.');

// Step 4: Wait for user input, with subsequent checking for the presence of the keyword `exit`
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('Enter text: ');
rl.prompt();

//event line starts by a user (press enter)
rl.on('line', (input) => {
    if (input.trim().toLowerCase() === 'exit') {
        console.log('See ya!');
        rl.close();
    } else {
        //write the entered text to the file
        writeStream.write(input + '\n');
        // wait for other input
        rl.prompt();
    }
});

//cntl + C case
rl.on('SIGINT', () => {
    console.log('See ya!');
    rl.close();
});

//close case
rl.on('close', () => {
    writeStream.end(); // End the write stream
    process.exit(0);  // Exit the process with a success code
})








