import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("1. Starting dotenv test");

// Try to read .env file directly
const envPath = join(__dirname, '../.env');
console.log("2. Looking for .env at:", envPath);

try {
  const envContent = readFileSync(envPath, 'utf8');
  console.log("3. Successfully read .env file");
  console.log("4. First 2 lines of .env:", 
    envContent.split('\n').slice(0, 2).join(' | '));
} catch (error) {
  console.error("3. Error reading .env file:", error.message);
}
