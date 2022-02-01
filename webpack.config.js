const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        use: "babel-loader"
      },
      {
        test: /\.ts|\.tsx$/,
        include: [path.resolve(__dirname, "src")],
        use: "ts-loader"
      },
      {
        test: /\.css|\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(woff|woff2|png|svg)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inlineSource: ".js$"
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      root: __dirname,
      src: path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components"),
      routes: path.resolve(__dirname, "src/routes"),
      api: path.resolve(__dirname, "src/api"),
      hooks: path.resolve(__dirname, "src/hooks"),
      pages: path.resolve(__dirname, "src/pages"),
      assets: path.resolve(__dirname, "src/assets"),
      config: path.resolve(__dirname, "src/config"),
      services: path.resolve(__dirname, "src/services"),
      App: path.resolve(__dirname, "src/App")
    }
  }
};
