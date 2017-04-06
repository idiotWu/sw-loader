const scriptURL =  require('../../index.js?publicPath=workers/!./sw.js');

navigator.serviceWorker.register(scriptURL).then(() => {
  console.log('Hello Service Worker!');
});
