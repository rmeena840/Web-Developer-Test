const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env, argv) => {
  const isDevMode = argv.mode === "development";

  return {
    mode: argv.mode,
    entry: [
      path.resolve(__dirname, "src", "scripts/app.js"),
      // path.resolve(__dirname, "src", "styles/app.scss"),
    ],
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "scripts/app.[contenthash].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
        },
        {
          test: /\.scss$/,
          use: [
            isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["autoprefixer"]],
                },
              },
            },
            "sass-loader",
            {
              loader: "sass-resources-loader",
              options: {
                resources: path.resolve(
                  __dirname,
                  "src",
                  "styles/_abstract.scss"
                ),
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    devtool: isDevMode ? "inline-source-map" : false,
    devServer: {
      host: "192.168.178.59",
      contentBase: "./public",
      open: true,
      hot: true,
      transportMode: "ws",
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "styles/app.[contenthash].css",
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/pages/index.html",
      }),
      new HtmlWebpackPlugin({
        filename: "cart/index.html",
        template: "src/pages/cart/index.html",
      }),
      new CopyPlugin({
        patterns: [{ from: "src/static", to: "static" }],
      }),
      new Dotenv({ systemvars: true }),
    ],
    optimization: {
      minimize: true,
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
  };
};
