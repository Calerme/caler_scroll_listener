global.window = global;
const scrollListener = require('../dist/scrollListener-0.0.1');

if ('function' === typeof scrollListener) {
  console.log('成功！')
} else {
  console.log('失败！')
}