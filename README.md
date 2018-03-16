# 简介

这是一个简约的**滚动监听**工具库。

# 安装

直接通过 script 标签引入：

```html
<script src="https://unpkg.com/caler_scroll_listener@0.0.1/dist/scrollListener-0.0.1.js"></script>
```

这时会注册一个全局函数 `scrollListener`。

通过 npm 安装：

```sh
npm i --save caler_scroll_listener
```

引入组件中：

```js
const scrollListener = require('caler_scroll_listener');
```

# 使用方法

scrollListener 函数接收两个参数，第一个参数为将要监听滚动项的包裹元素，也可以传入一个 css 选择器字符串，函数内部将调用 `document.querySelector` 获取包裹元素；第二个参数是一个对象，为 scrollListener 的配置参数：

```js
scrollListener('#wrapper', {
  relative: 'wrapper',
  itemSelector: 'h4.title',
  cb (currentItem, currentItemIndex) {
    // do something
  }
})
```

## 配置参数

### relative

值：`viewport` | `wrapper`

默认值：`viewport`

规定元素滚动时的参照物，`viewport` 是基于视口，`wrapper` 是基于元素的包裹容器进行计算。

**建议使用 wrapper 模式，viewport 会重复计算元素的 getBoundingClientRect，性能较 wrapper 稍差。**

### itemSelector

值：监听滚动项目的 CSS 选择器。字符串类型。

默认值：'[data-scroll-item]'

### top

默认值：20

当滚动项目距离参照元素顶部多少像素时，就认为当前项目为该项目。

### reduceTime

默认值：100

函数内部使用了节流函数以优化 `scroll` 事件的性能，可通过该选项自定义节流的时间间隔，单位为毫秒。

### cb()

值：回调函数。传入两个参数，第一个为当前项目，第二个为当前项目的 index。

默认值：undefined

`scrollListener` 只提供计算得出当前项目，并不参与实际的业务逻辑，所以要通过`cb`回调函数实现具体的业务功能，该函数将接收两个参数，分别为当前项目元素，与当前项目元素的 index。

示例：

```js
const navLis = document.querySelector('li.items');
scrollListener('#wrapper', {
  relative: 'wrapper',
  itemSelector: '.title-item',
  cb (currentItem, currentItemIndex) {
    for (let item of navLis) {
      item.classList.remove('active');
    }
    navLis[currentItemIndex].classList.add('active');
  }
})
```