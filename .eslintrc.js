// Use better plugin resolution so we can use @betaorbust/eslint-config
// without having to install all the plugins ourselves
require('@rushstack/eslint-patch/modern-module-resolution');

// The actual config
module.exports = {
	root: true, // stop looking for config files in parent directories
	extends: ['@betaorbust/eslint-config/profiles/node', 'next/core-web-vitals'],
	parserOptions: { tsconfigRootDir: __dirname },
};
