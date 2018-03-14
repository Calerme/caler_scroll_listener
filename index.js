function scrollListener(wrapper, opts) {
  const defaultOpts = {
    relative: 'viewport',
    top: 20,
    bottom: null,
    itemSelector: '[data-scroll-item]',
    reduceTime: 100
  };
  const finalOpts = Object.assign({}, defaultOpts, opts);
  const cacheElement = {};
  initCacheElemtn();
  function initCacheElemtn() {
    cacheElement.wrapper =
      wrapper instanceof HTMLElement ? wrapper : document.querySelector(wrapper);
    cacheElement.items = Array.from(document.querySelectorAll(finalOpts.itemSelector));
  }

  if (finalOpts.relative === 'viewport') {

  } else if (finalOpts.relative === 'wrapper') {
    wrapper.onscroll = reduce(relativeByParent(), finalOpts.reduceTime);
  }

  // 相对于视口的滚动监听
  function relativeByViewPort() {

  }
  // 相对于父容器的滚动监听
  function  relativeByParent() {
    const wrapper = cacheElement.wrapper,
      wrapperPos = getComputedStyle(wrapper).position;

    const itemsOffsetTop = [];

    if (wrapperPos === 'static') {
      wrapper.style.position = 'relative';
    }

    for (let [i, item] of cacheElement.items.entries()) {
      itemsOffsetTop[i] = item.offsetTop
    }
    return function handler() {
      const wrapperScrollHeight = wrapper.scrollHeight;
      const wrapperScrollTop = wrapper.scrollTop;
      const wrapperClientHeight = wrapper.clientHeight;
      let currentItem = null;
      let currentItemIndex = null;
      const cacheItemsY = [];
      /* 滚动到底，当前元素就是最后一个 */
      if ( wrapperScrollHeight - wrapperScrollTop === wrapperClientHeight) {
        currentItemIndex = cacheElement.items.length - 1;
        currentItem = cacheElement.items[currentItemIndex];
      } else {
        /* 否则第一个位于设定区间的元素就是当前元素 */
        for (let [i, item] of cacheElement.items.entries()) {
          let ret = itemsOffsetTop[i] - wrapperScrollTop;
          cacheItemsY[i] = Math.abs(ret);
          if (ret > 0 && ret < finalOpts.top) {
            currentItem = item;
            currentItemIndex = i;
            break;
          }
        }
        /* 如果没有元素位于设置的区域内，就查找一个距离父容器顶端最近的元素 */
        if (!currentItem) {
          let nearest = cacheItemsY.indexOf(Math.min(...cacheItemsY));
          currentItem = cacheElement.items[nearest];
          currentItemIndex = nearest;
        }
      }
      finalOpts.cb && finalOpts.cb(currentItem, currentItemIndex);
    }

  }
  // 节流函数
  function reduce(fn, time) {
    let timer = null;
    
    return function () {
      if (timer) {
        return
      }
      timer = setTimeout(function () {
        fn();
        clearTimeout(timer);
        timer = null;
      }, time);
    }
  }
}

const wrapper = document.querySelector('article');
const navItems = document.querySelectorAll('span');
scrollListener(wrapper, {
  relative: 'wrapper',
  itemSelector: 'h4',
  cb (currentItem, currentIndex) {
    for ( let item of navItems ) {
      item.classList.remove('active');
    }
    navItems[currentIndex].classList.add('active');
  }
});