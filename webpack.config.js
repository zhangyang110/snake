let path = require("path")
let htmlWebpackPlugin = require("html-webpack-plugin")
let {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = {
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "boundle.js",
        environment: {
            // 告诉webpack  兼容 ie 不用箭头函数
            arrowFunction: false,
        }
    },
    // 打包时需要的模块
    module: {
        rules: [
            {
                test: /\.ts$/,
                //这里是从下往上匹配 按顺序调用 loader  先走tsloader  加载器  然后用babel-loader 在进行转换
                //1. ts loader 是把ts 转成 js
                //2. babe- loader 是把 js 转化为指定浏览器可兼容的版本的js
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        // 要兼容的的目标浏览器  剩下的事情 让babel 自动转化
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11",
                                        },
                                        // 指定corejs 的版本
                                        // corejs 是为了兼容ie 中没有promise 类的 写法
                                        // 如果不配置corejs promise 无法在 ie 浏览器中运行

                                        "corejs": "3",
                                        // 使用corejs 的方式  usage  表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    "ts-loader",
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    // 用来设置引用模块  也就是指定哪些文件可以被用来引用 作为模块化解析
    resolve: {
        extensions: ['.js', '.ts']

    },
    mode: 'development' // 设置mode
}