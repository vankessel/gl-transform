const path = require('path');
const entry_path = path.resolve(__dirname, 'src', 'index.ts');
const output_path = path.resolve(__dirname, 'dist');
const node_modules_path = path.resolve(__dirname, 'node_modules');

module.exports = {
    mode: 'development',
    entry: entry_path,
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: node_modules_path,
            },
        ],
    },
    output: {
        path: output_path,
        filename: 'bundle.js',
        library: 'gl-transform',
        libraryTarget: 'umd2'
    },
    devtool: 'source-map'
};
