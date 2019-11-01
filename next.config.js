const withPlugins = require("next-compose-plugins");
const withLess = require("@zeit/next-less");
const withImages = require("next-images");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");

// The variables to override ant design default variable
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./styles/variables.less"), "utf8")
);

const nextConfig = {
  exportPathMap() {
    return {
      "/": { page: "/" },
      "/todo": { page: "/todo" },
      "/test": { page: "/test" }
    };
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      // eslint-disable-next-line
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            return origExternals[0](context, request, callback);
          }
          return callback();
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals)
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader"
      });
    }
    return config;
  }
};

module.exports = withPlugins(
  [
    withImages,
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables
        }
      }
    ]
  ],
  nextConfig
);
