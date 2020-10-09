module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://api.li.xmartjoy.com',
                changeOrigin: true
            },
        },
        hot: true,
        disableHostCheck: true,
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 37.5,
                        propList: ['*'],
                    }),
                ],
            },
        },
    },
}
