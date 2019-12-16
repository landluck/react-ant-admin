# React Ant Admin

`React Ant Admin` 是参考 `Ant Design Pro` 的 `UI`，抛开 `Ant Design Pro` 的实现，完整的从零开发一个 `React Admin System`

#### 介绍

最开始的时候，我需要一个 `react` 开发的 `amdin` 模版，在开源社区寻找了一边之后，比较中意 `ant design pro` 的 `UI`，当我一堆操作把 `ant desgin pro` 的代码拉下来研究之后，发现内容是在太多了，除了 `react`、`redux` 之外，还包含了 `umi`、`dva`、`ant-design/pro-layout` 等其它东西，当这些概念和 `ts` 结合起来使用的时候，我瞬间感觉无处下手，后面又仔细了阅读了权限设计、菜单栏渲染部分的代码，我得出结论， `Ant Design Pro` 足够优秀，但不适合我的需求场景。很遗憾，只能放弃使用

但是，`Ant Design Pro` 的 `UI` 是我见过的 `react` `admin` 系统中最为好看的一个，颜值即正义，既然我无法放弃 `Ant Design Pro` 的 `UI`，那干脆模仿 `Ant Design Pro` 的 `UI`，自己来实现一个较为简单的版本

#### 规划

- 从零使用 `react` 搭建系统
- 全面使用 `react-hooks` 开发，抛弃 `class` 组件写法、所有组件异步加载，提高首屏渲染速度
- 动态权限设计，开发配套的后端 Api
- ...

#### 使用技术

- **UI 框架**: `react`、`react-hook`、`classnames`
- **UI 组件**: `antd`、`@ant-design/aliyun-theme`
- **数据管理**：`redux`、`react-redux`、`redux-thunk`、`redux-logger`
- **类型检查**：`typescript`
- **接口请求**：`axios`
- **cookies**：`js-cookie`
- **过渡动画**：`react-transition-group`
- **CSS 规则**：`BEM`
- **后端 API**：`nodejs`、`eggjs`、`ts`、`mysql`、`sequelize`

#### 模板

```js
-首页介绍 - 系统介绍 - 权限管理 - 用户管理 - 角色管理 - 菜单管理;
```

#### 使用

```bash
$ git clone https://github.com/landluck/react-ant-admin.git
$ cd react-ant-admin
$ npm install
$ npm start

```

#### 支持环境

现代浏览器及 IE11
