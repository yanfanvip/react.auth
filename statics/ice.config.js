const path = require('path');

module.exports = {
  entry: 'src/index.js',
  publicPath: './',
  proxy: {
    '/**': {
      enable: true,
      target: 'http://localhost:8080',
    },
  },
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  plugins: [
    ['ice-plugin-fusion', { themePackage: '@icedesign/theme' }],
    ['ice-plugin-moment-locales', { locales: ['zh-cn'] }],
  ],
};
