const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')

const inputPath = path.resolve(__dirname, './src/index.js')
const outputUmdPath = path.resolve(__dirname, './dist/datav.umd.js')
const outputEsPath = path.resolve(__dirname, './dist/datav.es.js')

module.exports = {
    input: inputPath,
    output: [
        {
            file: outputUmdPath,
            format: 'umd',// 输出模块协议，表示输出一个umd的模块（一个jsfunction函数），cjs全称commonjs是nodejs中使用的一种模块化标椎（浏览器不能支持），es是一种es6模块化标准（浏览器不能支持需要在<script type="module"></script>引入浏览器才能支持）
            name: 'Datav',
            globals: {
                vue: 'Vue'
            }
        },
        {
            file: outputEsPath,
            format: 'es',//配置打包多文件（两种模块化标准）
            globals: {
                vue: 'Vue'
            }
        }
    ],
    // TODO 插件引入顺序的问题
    plugins: [
        // 将第三方模块进行混合打包
        vue(),
        babel({
            exclude: 'node_modules/**', // 哪些模块不进行babel编译
            runtimeHelpers: true,
            plugins: [
                [
                    "@babel/plugin-transform-runtime",
                    {
                        regenerator: true
                    }
                ]
            ]
        }),
        resolve({
            preferBuiltins: true
        }),
        commonjs(),
        json(),
        postcss({
            plugins: []
        })
    ],
    external: [
        // 将引入的模块当做外部模块引入，不会被打包到主文件中，即使使用了resolve也不行
        'vue',
        'echarts'
    ]
}
