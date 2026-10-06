const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');

// Create .htaccess in build directory if it doesn't exist
function addCacheHeadersToBuild() {
  console.log('Adding cache headers to build directory...');
  
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('Build directory not found. Please run "npm run build" first.');
    return;
  }
  
  const htaccessPath = path.join(BUILD_DIR, '.htaccess');
  const htaccessContent = `# Cache headers for all static assets
<IfModule mod_headers.c>
  # JavaScript files - 1 year cache
  <FilesMatch "\\.(js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
    Header set Expires "Thu, 31 Dec 2025 23:59:59 GMT"
  </FilesMatch>
  
  # CSS files - 1 year cache
  <FilesMatch "\\.(css)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
    Header set Expires "Thu, 31 Dec 2025 23:59:59 GMT"
  </FilesMatch>
  
  # Static directory - all files cached
  <If "%{REQUEST_URI} =~ m#^/static/#">
    Header set Cache-Control "public, max-age=31536000, immutable"
    Header set Expires "Thu, 31 Dec 2025 23:59:59 GMT"
  </If>
</IfModule>
`;
  
  // Copy .htaccess from public to build (if it exists)
  const publicHtaccess = path.join(__dirname, '..', 'public', '.htaccess');
  if (fs.existsSync(publicHtaccess)) {
    fs.copyFileSync(publicHtaccess, htaccessPath);
    console.log('✓ Copied .htaccess to build directory');
  } else {
    // Create minimal .htaccess if it doesn't exist
    fs.writeFileSync(htaccessPath, htaccessContent);
    console.log('✓ Created .htaccess in build directory');
  }
  
  // Also copy netlify.toml and vercel.json if they exist
  const netlifyToml = path.join(__dirname, '..', 'netlify.toml');
  const vercelJson = path.join(__dirname, '..', 'vercel.json');
  
  if (fs.existsSync(netlifyToml)) {
    const buildNetlifyToml = path.join(BUILD_DIR, 'netlify.toml');
    fs.copyFileSync(netlifyToml, buildNetlifyToml);
    console.log('✓ Copied netlify.toml to build directory');
  }
  
  if (fs.existsSync(vercelJson)) {
    const buildVercelJson = path.join(BUILD_DIR, 'vercel.json');
    fs.copyFileSync(vercelJson, buildVercelJson);
    console.log('✓ Copied vercel.json to build directory');
  }
  
  // Copy _headers file for Netlify/Cloudflare
  const headersPath = path.join(BUILD_DIR, '_headers');
  const publicHeaders = path.join(__dirname, '..', 'public', '_headers');
  if (fs.existsSync(publicHeaders)) {
    fs.copyFileSync(publicHeaders, headersPath);
    console.log('✓ Copied _headers to build directory');
  }
  
  console.log('Cache headers configuration complete!');
}

addCacheHeadersToBuild();

