const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

// Where your antd-variables.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './styles/antd-variables.less'),
    'utf8'
  )
);

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {};
}

const nextConfig = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/todo': { page: '/todo' },
      '/test': { page: '/test' },
    };
  },
};

module.exports = withPlugins(
  [
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables,
        },
      },
    ],
    withSass,
    withImages,
  ],
  nextConfig
);
