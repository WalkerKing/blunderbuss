module.exports = {
    "extends": ["standard", 'plugin:vue/recommended', '@vue/standard'],
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    }, // 额外支持新的 ES6 全局变量 ,比如 Set 等新类型
    "parserOptions": {
        "ecmaVersion": 6, // 启用 ES6 语法支持
        "sourceType": "module",
        "parser": "babel-eslint",
    },
    "rules": {
        "indent": [1, 4], // 缩进4个空格
        "semi": [0, "always"],
        "eqeqeq": 2, // 要求使用 === 和 !==
        "no-console": 2, // 禁用 console
        "arrow-parens": 0, // 要求箭头函数的参数使用圆括号
        "max-len": 0, // 强制一行的最大长度
        'vue/html-indent': [2, 4, {
            'attribute': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': [],
        }],
    },
    "overrides": [
        {
            'files': ['*.vue'],
            'rules': {
                'indent': [2, 4],
            }
        },
    ]
};