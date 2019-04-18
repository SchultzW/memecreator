const webpack = require('webpack');
module.exports = {
	context: __dirname,
	entry: {	general: './src/js/general.js',
		memes: './src/js/memes.js',
	},
	output: {path: __dirname + "/dist",
		filename: '[name].js',
    },
    module: {
        rules: [
            { 
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: { loader: 'babel-loader'}
            }, 
            { 
            test: /\.css$/,  
            use: [ 'style-loader', 'css-loader' ]
            },
        ],
    },
    module: {
        rules: [	{ 
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: { loader: 'babel-loader'}
            }, { 
            test: /\.(less|css)$/, 
            use: [ 'style-loader', 'css-loader', 'less-loader' ]		
            },{  
            test: /\.(svg|eot|ttf|woff|woff2)$/,  
            loader: 'url-loader',  options: {    limit: 10000,    name: 'fonts/[name].[ext]'  }
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({ jQuery: 'jquery', $: 'jquery', jquery: 'jquery' }),
        ],
    module: {
        rules: [	
            {  ... 
            }, 
            { 
            test: /\.(png|jpg|gif)$/,
            loaders: [
                {loader: 'url-loader', options: { limit: 10000, name: 'images/[name].[ext]'}},
                'img-loader'
            ],
                },
            ],
        },
    entry: {...},
    output: {...
        output: { ..., publicPath: '/dist/',},
            },
    devServer: {
                compress: true, port: 8080, hot: true,
                },
    module: {..},
    plugins: [ ...,
            new webpack.HotModuleReplacementPlugin(),
            ],
    


}