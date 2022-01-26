import resolve from 'rollup-plugin-node-resolve';
// 测试环境需安装 vue 最好对应生产环境版本进行调试，代码差异可能会导致意料之外的问题
import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json'
import commonjs from "@rollup/plugin-commonjs";
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'js/index.js', // 打包入口
  output: { // 打包出口
    file: pkg.main, // 最终打包出来的文件路径和文件

    // cjs esm amd
    format: 'esm'
  },

  // 忽略打包的外部依赖，由外部安装
  external: ['qrcodejs2', 'vue', 'element-plus'],
  globals: {
    vue: 'Vue'
  },

  plugins: [
    // 寻找外部依赖
    resolve(),

    // 解析 vue 文件
    vue(),

    // json 依赖
    json(),

    // 使用预设 @babel/preset-env 转换 es6
    // 插件配置 plugin-transform-runtime 插件处理代码依赖复用
    babel({
      babelHelpers: 'runtime',
      exclude: '**/node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            'corejs': 3,
            'useBuiltIns': 'usage'
          }
        ]
      ],
      plugins: [
        ['@babel/plugin-transform-runtime']
      ]
    }),

    // 转换 commonjs
    commonjs(),

    // 代码压缩
    terser()
  ]
};
