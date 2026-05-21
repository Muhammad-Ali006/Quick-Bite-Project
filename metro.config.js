const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;

const pnpmPkg = path.join(
  __dirname,
  'node_modules',
  '.pnpm',
  'node_modules',
  '@firebase',
  'auth'
);

let rnAuthPath = null;
try {
  const realPath = fs.realpathSync(pnpmPkg);
  rnAuthPath = path.join(realPath, 'dist', 'rn', 'index.js');
  if (!fs.existsSync(rnAuthPath)) rnAuthPath = null;
} catch {
  rnAuthPath = null;
}

if (rnAuthPath) {
  config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (
      (moduleName === 'firebase/auth' || moduleName === '@firebase/auth') &&
      platform !== 'web'
    ) {
      return { type: 'sourceFile', filePath: rnAuthPath };
    }
    return context.resolveRequest(context, moduleName, platform);
  };
}

module.exports = config;
