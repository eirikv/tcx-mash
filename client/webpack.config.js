const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: `${__dirname}/src/index.js`,

    output: {
        path: `${__dirname}/app`,
        filename: 'tcx-mash.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader',
            }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'TCX-Mash',
            hash: true,
            template: `${__dirname}/build/index.ejs`,
        }),
    ],
};

module.exports = config;
