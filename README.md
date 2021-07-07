# Referral Project Frontend

## 框架/技术栈

- React.js
- Type Script
- less
- Ant Design
- Craco

## 设计图

[Link to figma](https://www.figma.com/file/1lfjwrjZ6SMgCcB9oge1rQ/Referral-Project?node-id=132%3A0)

## 使用

- 本项目的 package manager 使用 [yarn](https://yarnpkg.com/)，请先自行下载安装
- 首次运行请先在根目录下运行 `yarn` 或 `yarn install`
- 之后在根目录下运行 `yarn start`，React App 会在 **localhost:3000** 启动

## 开发注意事项

**Git:**

- 请在每周领到开发任务后，先 `git pull` 获取最新代码
- 用 `git chechout -b [branch name]` 来新建一个 git 分支，并在你的分支上完成本周的任务。其中 `[branch name]` 的命名应概括你本周的工作内容，如：`login-page`
- 开发任务完成后，我会把你的 branch 给 merge 到 `master branch`

**Type Script:**

- 原则是能用尽量用，但是有什么解决不了的问题也可以直接写 js
- 有些 npm 的 package 会报 Type Script 相关的错误，比如 `Could not find a declaration file for module 'module-name'` 解决方法可能会有以下两种：
  - `yarn remove [package name]` ，  
    然后 `yarn add @types/[package name]`  
    举例：`yarn add @types/my-package`
  - 如果上述方法没有解决错误/在安装时报错，可以尝试在使用到这个 package 的同一目录下新建文件 `package-name.d.ts`，然后在这个文件里写 `declare module 'package-name';`  
    举例：我在 `src/App.tsx` 里使用了 `react-router-dom` 这个 package，直接启动时发现报错，所以我在 `src` 这个目录里创建了 `react-router-dom.d.ts` 这个文件，解决了报错

**文件结构:**

- 整个的页面放在 `screens` 这个目录
- 页面上的部件放在 `components` 这个目录
- 图片放在 `images`这个目录
- 每个 `screen` / `component` 都要有自己的文件夹，该 screen / componet 最外层的 wrapper 命名最好与它文件夹的名字相同
- 文件结构可能会在后续开发过程中发生细微调整

**less:**

<!-- - 最好先把页面上每一个部件的styles ```@import``` 到页面所属的 ```.less```文件里，然后把这个文件 ```@import``` 到 ```index.less```
- 注意，一定要把 ```@import``` 的styles加在 ```@import '~antd/dist/antd.less';``` 这一行的下面，否则我们的styles可能会被 ant design 的同名 class 覆盖 -->

- 全局变量，例如 `@primary-color` 和 `@mobile-width` 等，请在 `craco.config.js` 里进行定义，然后可以直接在所有 `.less` 文件里使用
- class 命名请加上当前 component/screen 的名字，避免命名冲突
  - 举例：在 `homeCard.less` 里的所有 class 应该以 `home-card` 开头，详情请见 `homeCard.less`

**craco:**

- 是一个 create-react-app 的配置层，详见 [官方介绍](https://github.com/gsoft-inc/craco)
- 我们可以在 `craco.config.js` 里定义 less 需要用到的全局变量
- 我已经更改了我们 app 的 start, build, 和 test script，详见 `package.json`

**代码规范:**

- 遵循 React 新版本的规范，尽量多写 `functional component`，少写 `class component`
- 逻辑复杂的地方记得写注释
- js 行结尾记得加分号
- 保持缩进正确。HTML 里每向内一层应该多一个缩进
- 随时检查 `return()`或 `render()` 里的代码是不是太长了，有没有哪些部分是可以拆分成单独的 component 的

<!-- **国内开发相关:**
- **最好不要使用 ```cnpm```，这玩意容易出各种问题**
- 如果 npm 的速度非常慢，可以考虑：
    - 使用 [yarn](https://yarnpkg.com/)
    - 给 npm 配置proxy （如果你的电脑上用 shadowsocks 之类的代理）：
        - ```npm config set proxy http://localhost:1080``` (1080是shadowsocks的默认端口，你可能需要根据你使用的代理软件做出调整)
        - ```npm config set https-proxy http://localhost:1080```
        - 重启你的 ```terminal``` 或 ```power shell```
        - 如果需要重置 proxy: ```npm config delete proxy``` & ```npm config delete https-proxy``` -->

## 其他

有其他任何问题，请微信与 Tech Lead 联系
