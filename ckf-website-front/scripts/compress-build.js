const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { promisify } = require('util');

const gzip = promisify(zlib.gzip);
const brotliCompress = promisify(zlib.brotliCompress);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const BUILD_DIR = path.join(__dirname, '..', 'build');
const COMPRESSION_LEVEL = 9; // Maximum compression

// Files to compress
const FILES_TO_COMPRESS = ['.js', '.css', '.html', '.json', '.svg', '.xml', '.txt'];

async function compressFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const ext = path.extname(filePath);
    
    // Create compressed versions
    if (ext === '.js' || ext === '.css' || ext === '.html' || ext === '.json' || ext === '.svg' || ext === '.xml' || ext === '.txt') {
      // Gzip compression
      const gzipped = await gzip(fileContent, { level: COMPRESSION_LEVEL });
      fs.writeFileSync(`${filePath}.gz`, gzipped);
      
      // Brotli compression (better compression ratio)
      try {
        const brotli = await brotliCompress(fileContent, {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11, // Maximum quality
            [zlib.constants.BROTLI_PARAM_SIZE_HINT]: fileContent.length
          }
        });
        fs.writeFileSync(`${filePath}.br`, brotli);
      } catch (err) {
        // Brotli might not be available in all Node versions
        console.warn(`Brotli compression skipped for ${filePath}:`, err.message);
      }
      
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error compressing ${filePath}:`, error.message);
    return false;
  }
}

async function walkDir(dir, fileList = []) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      await walkDir(filePath, fileList);
    } else {
      const ext = path.extname(file);
      if (FILES_TO_COMPRESS.includes(ext) && !file.endsWith('.gz') && !file.endsWith('.br')) {
        fileList.push(filePath);
      }
    }
  }
  
  return fileList;
}

async function compressBuild() {
  console.log('Starting compression of build files...');
  
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('Build directory not found. Please run "npm run build" first.');
    process.exit(1);
  }
  
  try {
    const files = await walkDir(BUILD_DIR);
    let compressed = 0;
    let totalSize = 0;
    let compressedSize = 0;
    
    for (const file of files) {
      const stats = fs.statSync(file);
      totalSize += stats.size;
      
      const wasCompressed = await compressFile(file);
      if (wasCompressed) {
        compressed++;
        
        // Calculate compressed size
        if (fs.existsSync(`${file}.gz`)) {
          const gzStats = fs.statSync(`${file}.gz`);
          compressedSize += gzStats.size;
        }
      }
    }
    
    const savings = ((totalSize - compressedSize) / totalSize * 100).toFixed(2);
    
    console.log(`\n✓ Compression complete!`);
    console.log(`  Files compressed: ${compressed}`);
    console.log(`  Original size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Compressed size: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Space saved: ${savings}%`);
  } catch (error) {
    console.error('Error during compression:', error);
    process.exit(1);
  }
}

compressBuild();

