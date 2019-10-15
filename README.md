
## runtime environment

- `nodejs v8.9.1`
- `npm 5.5.1`


## 使用技术

1. vue2.0
2. vuex
3. element-ui
4. sass
5. webpack
6. es6
7. lodash
8. moment

## Build Setup

```
# install dependencies
yarn


## 安装依赖包：yarn == yarn install

## 添加依赖包：yarn add package-name -D

# start
npm start

`yarn设置淘宝镜像：`
`yarn config set registry "https://registry.npm.taobao.org"`

# build for production with minification
npm run build
```

## 命名规范

1. 文件夹命名：`aB`；
2. 文件命名（js、css、vue、html）：`aB.*`；
3. 样式class命名：`a-b`；
4. image命名：`a-b`；
5. js变量命名：`aB`；
6. js常量命名：`A_B`；
7. js私有变量或方法：`_aB`；
8. js方法的返回值如果是布尔值，方法名则必须以is、can、has、should等为前缀；
9. js service 命名：`Ab`;
10. js component 命名：`Ab`;

## git分支命名规范

2. bug紧急修复：`hotfix-{description}`；
3. 版本开发：`feature-{description}_{username}`，例如：`feature-add-news_yq`；

## 代码规范
1. 在页面中添加img的时候，请尽量使用css background-image，避免webpack无法暂时对html img src支持不友好问题.
2. 项目中使用EditorConfig来定义代码风格,需要安装相关编辑器的插件[查看对应编辑器插件](http://editorconfig.org/#file-format-details)
3. 提交代码前会执行eslint检查代码规范,规范文档参见[http://standardjs.com/](http://standardjs.com/)
   提交代码前eslint自动修复部分`js`文件错误，`vue`文件的js部分错误，`scss`文件错误无法修复

## 添加vuex devtool

安装chrome扩展程序重新启动即可，详见：https://github.com/vuejs/vue-devtools


## 注意!
如果是在windows中使用npm install，那么安装node、node-sass有环境要求：
1.node必须装32位即x86，不能x64.
2.安装并使用cnpm,因为使用npm在安装node-sass的时候会出现莫名其妙的环境错误。
    安装方法：`npm install -g cnpm --registry=https://registry.npm.taobao.org`
    然后安装时使用`cnpm install、cnpm install packagename -D`
