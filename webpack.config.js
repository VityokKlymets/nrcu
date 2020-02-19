const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  entry: ["./src/app.ts", "./src/index.sass"],
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        query: {
          partialDirs: [path.join(__dirname, "src", "partials")],
          inlineRequires: "/assets/"
        }
      },
      {
        test: /\.(tsx?|js)$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-url-loader",
          options: {}
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              esModule: false,
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: "bundle.css",
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/index.hbs",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/news-detail.hbs",
      filename: "news-detail.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/radio-ray.hbs",
      filename: "radio-ray.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/radio-ukr.hbs",
      filename: "radio-ukr.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/radio-culture.hbs",
      filename: "radio-culture.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/speaker.hbs",
      filename: "speaker.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/speakers.hbs",
      filename: "speakers.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/programs.hbs",
      filename: "programs.html"
    })
  ]
}
