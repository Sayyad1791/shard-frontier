import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, '../.env') });

// Log all VITE_ prefixed environment variables
console.log("All VITE_* environment variables:");
Object.keys(process.env)
  .filter(key => key.startsWith('VITE_'))
  .forEach(key => {
    const value = key.includes('KEY') 
      ? process.env[key]?.substring(0, 6) + '...' 
      : process.env[key];
    console.log(`- ${key} = ${value}`);
  });

// Specific test for VITE_PRIVATE_KEY
console.log("\nVITE_PRIVATE_KEY test:");
console.log("1. VITE_PRIVATE_KEY exists:", !!process.env.VITE_PRIVATE_KEY);
console.log("2. VITE_PRIVATE_KEY length:", process.env.VITE_PRIVATE_KEY?.length || 'Not found');
console.log("3. First 6 chars:", 
  process.env.VITE_PRIVATE_KEY 
    ? process.env.VITE_PRIVATE_KEY.substring(0, 6) + '...' 
    : 'Not found'
);
