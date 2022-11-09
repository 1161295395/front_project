// 引入一个包
const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

//webpack的配置信息
module.exports = {
      //文件的入口
      entry: "./src/index.ts",
      mode: 'development',
      //指定输出文件目录
      output: {
        path: path.resolve(__dirname, 'dist'),
        //打包后的文件
        filename: 'bundle.js',
        environment: {
            arrowFunction: false,
        }

      },
      //webpack打包使用的文件
      module: {

        rules: [
            {
                //规定生效的文件
                test: /.\ts$/,
                //要使用的loader
                use: [
                    //配置babel
                    {
                        loader: "babel-loader",
                        //设置Babel
                        options: {
                            //设置预定义环境
                            presets: [
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        targets: {
                                            "chrome": "88",
                                        },
                                        //指定corejs的版本
                                        "corejs": "3",
                                        //表示按需加载
                                        "useBuildIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
                exclude: /node-modules/
            },
            {
                test: /\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]

            }
        ]

      },
      //配置webpack插件
      plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
        }),
      ],
      //用来设置引用模块
      resolve: {
        extensions: ['.ts','.js'],
      }
      
};