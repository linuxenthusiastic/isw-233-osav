const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';

    return {
        entry: './src/main.js',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.[contenthash].js',
            clean: true,
        },

        devtool: isDev ? 'source-map' : false,

        devServer: {
            static: './dist',
            hot: true,
            port: 3000,
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.hbs$/,
                    use: ['handlebars-loader'],
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 8 * 1024,
                        },
                    },
                    generator: {
                        filename: 'images/[name].[hash][ext]',
                    },
                },
                {
                    test: /\.(woff|woff2|ttf|eot)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name].[hash][ext]',
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: 'src/img', to: 'img' },
                ],
            }),

            new HtmlWebpackPlugin({
                template: '!!handlebars-loader?partialDirs[]=' + path.resolve(__dirname, 'src/partials') + '!./src/index.html',
                minify: isDev ? false : {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                },
            }),
            new MiniCssExtractPlugin({
                filename: 'main.[contenthash].css',
            }),
            ...(isDev ? [] : [new BundleAnalyzerPlugin()]),
        ],

        optimization: {
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: 'all',
            },
        },
    };
};