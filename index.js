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
  initCacheElement();
  function initCacheElement() {
    cacheElement.wrapper =
      wrapper instanceof HTMLElement ? wrapper : document.querySelector(wrapper);
    cacheElement.items = Array.from(document.querySelectorAll(finalOpts.itemSelector));
  }

  if (finalOpts.relative === 'viewport') {
    cacheElement.wrapper.onscroll = reduce(relativeByViewPort(), finalOpts.reduceTime);
  } else if (finalOpts.relative === 'wrapper') {
    cacheElement.wrapper.onscroll = reduce(relativeByParent(), finalOpts.reduceTime);
  }

  // 相对于视口的滚动监听
  function relativeByViewPort() {

    return function handler () {
      let currentItem = null;
      let currentItemIndex = null;

      const cacheItemBoundingClientRectTop = []
      for (let [i, item] of cacheElement.items.entries()) {
        cacheItemBoundingClientRectTop[i] =
          item.getBoundingClientRect().top;
      }

      // 如果倒数第二个已经超出视口，那么当前项就为最后一个
      if (cacheItemBoundingClientRectTop[cacheElement.items.length - 1] < 0) {
        currentItemIndex = cacheElement.items.length - 1;
        currentItem = cacheElement.items[currentItemIndex];
      } else {
        const cacheTopABS= [];
        // 如果有项目位于限定的位置
        for (let [i, top] of cacheItemBoundingClientRectTop.entries()) {
          cacheTopABS[i] = Math.abs(top);
          if (top > 0 && top < finalOpts.top) {
            currentItemIndex = i;
            currentItem = cacheElement.items[currentItemIndex];
            break;
          }
        }
        // 如果没有项目位于限定的位置，就找一个距离视口最近的元素
        if (!currentItem) {
          currentItemIndex = cacheTopABS.indexOf(Math.min(...cacheTopABS));
          currentItem = cacheElement.items[currentItemIndex];
        }
      }
      finalOpts.cb && finalOpts.cb(currentItem, currentItemIndex);
    };
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
