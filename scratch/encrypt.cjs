const fs = require('fs');
const CryptoJS = require('crypto-js');

// Read raw questions
const code = fs.readFileSync('src/data/questions.js', 'utf8');

// Parse the array (since it is exported, we can clean up the syntax to parse as JSON or load it)
// A simpler way: we evaluate the export to get the raw Javascript object
const cleanCode = code
  .replace('export const questions =', 'const q =')
  .concat('\nmodule.exports = q;');

const rawQuestions = eval(cleanCode);

// Encrypt the 'correct' index and the whole question/options data structure so that they
// are not readable as plain text in the Javascript files.
// We'll encrypt the 'correct' answer key separately or decrypt it on the fly.
const secretKey = 'avanza-secure-exam-2026-key-salt';

const processed = rawQuestions.map(q => {
  // Encrypt the correct answer value to hide it in memory / inspecting
  const encryptedCorrect = CryptoJS.AES.encrypt(q.correct.toString(), secretKey).toString();
  
  return {
    id: q.id,
    question: q.question,
    options: q.options,
    category: q.category,
    // Store the encrypted correct answer instead of index 0,1,2,3
    correctEncrypted: encryptedCorrect
  };
});

// Write the encrypted questions array back
const outputContent = `import CryptoJS from 'crypto-js';

const SECRET_KEY = 'avanza-secure-exam-2026-key-salt';

// Decryption helper function
export function decryptCorrectIndex(encryptedStr) {
  const bytes = CryptoJS.AES.decrypt(encryptedStr, SECRET_KEY);
  return parseInt(bytes.toString(CryptoJS.enc.Utf8), 10);
}

export const questions = ${JSON.stringify(processed, null, 2)};
`;

fs.writeFileSync('src/data/questions.js', outputContent, 'utf8');
console.log('Successfully encrypted questions dataset!');
