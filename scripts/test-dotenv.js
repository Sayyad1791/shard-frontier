const fs = require('fs');
const path = require('path');

console.log("1. Starting dotenv test");

// Try to read .env file directly
const envPath = path.join(__dirname, '../.env');
console.log("2. Looking for .env at:", envPath);

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log("3. Successfully read .env file");
  console.log("4. First 2 lines of .env:", 
    envContent.split('\n').slice(0, 2).join(' | '));
} catch (error) {
  console.error("3. Error reading .env file:", error.message);
}
