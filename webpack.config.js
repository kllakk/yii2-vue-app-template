const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
    mode: 'development',
    entry: {
        site: [
            '@babel/polyfill',
            './app/src/js/site',
        ],
    },
    output: {
        path: path.join(__dirname, 'app/dst'),
        filename: '[name].[chunkhash].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules\/(?!(bootstrap-vue\/src)\/)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    }
                }]
            },
        ],
    },
    resolve: {
        modules: ['node_modules'],
        alias: {
            'bootstrap-vue$': 'bootstrap-vue/src/index.js',
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Popper: 'popper.js/dist/umd/popper',
            axios: 'axios',
            Vue: 'vue',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new ManifestPlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '*.js',
                '*.css',
                '*.map',
            ]
        }),
        new VueLoaderPlugin(),
    ]
};

module.exports = (env, options) => {
    console.log(`This is the Webpack 4 'mode': ${options.mode}`);

    config.resolve.alias.vue$ = options.mode === 'production' ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js'

    return config;
};