const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    "assets/docs/js/docs": "./src/assets/docs/js/docs.js",
    "0.1.1/assets/docs/js/docs": "./src/0.1.1/assets/docs/js/docs.js",
    "0.1.2/assets/docs/js/docs": "./src/0.1.2/assets/docs/js/docs.js",
    "0.2.0/assets/docs/js/docs": "./src/0.2.0/assets/docs/js/docs.js",
    "0.2.1/assets/docs/js/docs": "./src/0.2.1/assets/docs/js/docs.js",
    "0.3.0/assets/docs/js/docs": "./src/0.3.0/assets/docs/js/docs.js",
    "0.4.0/assets/docs/js/docs": "./src/0.4.0/assets/docs/js/docs.js",
    "0.4.1/assets/docs/js/docs": "./src/0.4.1/assets/docs/js/docs.js",
    "0.4.2/assets/docs/js/docs": "./src/0.4.2/assets/docs/js/docs.js",
    "0.4.3/assets/docs/js/docs": "./src/0.4.3/assets/docs/js/docs.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "static", to: "" }
      ]
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            passes: 5
          }
        }
      }),
      new HtmlMinimizerPlugin({
        minimizerOptions: {
          conservativeCollapse: false
        }
      }),
      new CssMinimizerPlugin()
    ]
  }
};
