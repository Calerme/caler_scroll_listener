function scrollListener(wrapper, opts) {
  const defaultOpts = {
    relative: 'viewport',
    top: 0,
    bottom: null,
    itemSelector: '[data-scroll-item]'
  };
  const finalOpts = Object.assign({}, defaultOpts, opts);
  const cacheElement = {};
  initCacheElemtn();
  function initCacheElemtn() {
    cacheElement.wrapper =
      wrapper instanceof HTMLElement ? wrapper : document.querySelector(wrapper);
    cacheElement.items = document.querySelectorAll(finalOpts.itemSelector);
  }
}