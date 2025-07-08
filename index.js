// 1. Use the inquirer npm package to get user input.
// import inquirer from 'inquirer'
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
// const inquirer = require('inquirer');

inquirer
  .prompt([
    {
    "message": "Please enter a URL to generate a QR code", 
    "name": "url",
    "type": "input"}
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.url;
    const fileName = `qr_${url.slice(11, 16)}.png`; // Use a slice to create a unique file name based on the URL 
    const folderPath = './qr-images'; 

    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream(`${folderPath}/${fileName}`));

    fs.appendFile('urls.txt', url + "\n", (err) => {
    if (err) throw err;
    console.log(`Saved ${fileName} and logged the URL.`);
}); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      
    console.error("Prompt couldn't be rendered in the current environment.");

    } else {
    
        console.error("An error occurred:", error);

    }
  });

// 2. Use the qr-image npm package to turn the user entered URL into a QR code image.
// 3. Create a txt file to save the user input using the native fs node module.
