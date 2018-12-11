module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  },
  rules: {
    'no-var': 'error',
    indent: [
      'error',
      2,
      { SwitchCase: 1 } // 首行缩进
    ],
    'keyword-spacing': [
      // 关键字缩进
      'error',
      {
        before: true,
        after: true
      }
    ],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'no-unreachable': [
      // 不允许在 return, throw, break添加代码
      'error'
    ],
    'spaced-comment': [
      // 注释后预留空格
      'error',
      'always'
    ],
    'space-before-function-paren': [0, 'always'],
    //为了prettier格式化，暂时不需要这条规则（函数前括号）
    eqeqeq: [
      // 使用 ===
      'error',
      'always'
    ],
    'space-infix-ops': [
      // 拼接字符串预留空格
      'error',
      {
        int32Hint: false
      }
    ],
    'no-multiple-empty-lines': [
      // 最大空行数
      'error',
      {
        max: 2
      }
    ],
    'block-spacing': [
      // 大括号两边预留空格
      'error',
      'always'
    ],
    'array-bracket-spacing': [2, 'never'],
    'brace-style': [2, '1tbs', { allowSingleLine: true }], // java风格的大括号
    'comma-dangle': [2, 'never'], // 对象最后一个key不允许带 ‘,’
    'comma-spacing': [
      // 逗号前后的空格
      2,
      {
        before: false,
        after: true
      }
    ],
    'comma-style': [2, 'last'], // 逗号在行尾
    'linebreak-style': [
      'error',
      'unix' // 换行使用LF
    ],
    quotes: [
      'error',
      'single' // 强制使用单引号
    ],
    semi: ['error', 'never'], // 禁止使用分号
    'no-console': 'off'
  }
}
