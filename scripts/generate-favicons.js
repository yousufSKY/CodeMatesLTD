const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const pngToIco = require('png-to-ico');

const sizes = {
  'favicon.ico': 48,
  'apple-touch-icon.png': 180,
  'icon-192.png': 192,
  'icon-512.png': 512
};

async function generateFavicons() {
  try {
    const inputSvg = await fs.readFile(path.join(__dirname, '../public/favicon.svg'));
    
    for (const [filename, size] of Object.entries(sizes)) {
      const outputPath = path.join(__dirname, '../public', filename);
      
      if (filename === 'favicon.ico') {
        // For favicon.ico, first generate a PNG buffer
        const pngBuffer = await sharp(inputSvg)
          .resize(size, size)
          .png()
          .toBuffer();
        
        // Convert PNG buffer to ICO and save
        const icoBuffer = await pngToIco(pngBuffer);
        await fs.writeFile(outputPath, icoBuffer);
      } else {
        // For all other formats, output PNG directly
        await sharp(inputSvg)
          .resize(size, size)
          .png()
          .toFile(outputPath);
      }
      
      console.log(`✓ Generated ${filename} (${size}x${size})`);
    }
    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
