const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');
const htmlPagesDir = path.join(__dirname, 'development');
const htmlFiles = fs.readdirSync(htmlPagesDir).filter(file => file.endsWith('.html'));

const htmlPlugins = htmlFiles.map(filename => new HtmlWebpackPlugin({
  filename: filename,
  template: path.join(htmlPagesDir, filename),
  inject: true, // Injects the script tags for the generated webpack bundles into the body
}));

// Function to scan the src directory and find all TSX files
function findTsxEntries(srcDir) {
  const entries = {};
  const files = fs.readdirSync(srcDir);

  files.forEach(file => {
    if (file.endsWith('.tsx')) {
      const basename = path.basename(file, '.tsx');
      entries[basename] = path.resolve(srcDir, file);
    }
  });

  return entries;
}

const entryPoints = findTsxEntries(path.resolve(__dirname, 'src'));

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: "production",
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, "production"),
    filename: "[name].js",
    library: "[name]",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
    clean: true
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'firebase': 'firebase',
    'axios': 'axios'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'development'), // Set the static files directory
    },
    hot: true, // Enable hot module replacement
    open: true, // Open the browser after the server starts
    port: 3000, // You can specify the port here (optional)
    historyApiFallback: true, // For single-page applications
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Handle TypeScript files
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(js|jsx)$/, // Target both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // Use the Babel presets for transpilation
          }
        }
      },
      {
        test: /\.css$/, // Existing rule for CSS files
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader',   // Translates CSS into CommonJS
          'postcss-loader' // Processes CSS with PostCSS
        ]
      }
    ]
  },
  plugins: [
    ...(isProduction ? [] : htmlPlugins), // Include HTML plugins only in development
  ]
};
