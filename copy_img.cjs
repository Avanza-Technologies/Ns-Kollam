const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\NSK\\.gemini\\antigravity-ide\\brain\\cbd7b47b-2f32-4eb7-a634-6ed43e975a5d\\sudheesh_spotlight_1785694703442.png";
const dest = path.join(__dirname, "public", "sudheesh.png");

fs.copyFileSync(src, dest);
console.log("Successfully copied image to", dest);
