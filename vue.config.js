let path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    outputDir: 'dist',
    lintOnSave: true,
    runtimeCompiler: true, //关键点在这

    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
    },
    configureWebpack: () => {},
    devServer: {
        open: true,  // 启动服务自动打开浏览器
        port:8888,
        proxy: {
            '/basic': {
                target: "http://localhost",
                changeOrigin: true,
                pathRewrite: {
                    "/basic": ""
                }
            },
        }
    }
}
