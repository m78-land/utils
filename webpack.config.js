const path = require('path');
/* 帮助idea进行路径识别 */

module.exports = {
  resolve: {
    alias: {
      '@lxjx/utils': path.resolve(__dirname, './src/index.js'),
    },
  },
};
