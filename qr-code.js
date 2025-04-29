const QRCode = require('qrcode');
const fs = require('fs');
const readline = require('readline-sync');

// #region SETUP QRCODE
// Function to generate and save QR code
async function generateQRCode(text, outputPath) {
    try {
        await QRCode.toFile(outputPath, text, {
            type: 'png',
            width: 900,
            margin: 2,
        });
        console.log(`QR Code saved to ${outputPath}`);
    } catch (err) {
        console.error('Error generating QR Code:', err);
    }
}

// Example usage
const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

//  #region URL
let textToEncode;
do {
    textToEncode = readline.question('Enter the URL to encode: ');
    if (!urlRegex.test(textToEncode)) {
        console.log('Invalid URL. Please enter a valid URL.');
    }
} while (!urlRegex.test(textToEncode));

// #region FILENAME
let outputFilePath;
const filenameRegex = /^[a-zA-Z0-9_\-]+$/;

do {
    outputFilePath = readline.question('Enter the filename to save the QR code (e.g., qrcode.png): ');
    if (!filenameRegex.test(outputFilePath)) {
        console.log('Invalid filename. Please use only alphanumeric characters, underscores and dashes.');
    }
} while (!filenameRegex.test(outputFilePath));

generateQRCode(textToEncode, `./output/${outputFilePath}.png`);