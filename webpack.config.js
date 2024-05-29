// const path = require('path');

// module.exports = {
//   resolve: {
//     extensions: ['*', '.mjs', '.js', '.json']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.mjs$/,
//         include: [
//           path.resolve(__dirname, 'node_modules'),
         
//         ],
//         type: 'javascript/auto'
//       }
//     ]
//   }
// };


const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Allow importing without specifying file extensions for .js and .jsx files
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match JavaScript and JSX files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel to transpile JavaScript and JSX
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Use preset-env for compiling modern JavaScript, and preset-react for JSX
          },
        },
      },
    ],
  },
};
