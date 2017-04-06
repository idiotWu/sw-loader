const scriptURL =  require('../../index.js!./sw.js');

navigator.serviceWorker.register(scriptURL).then(() => {
  console.log('Hello Service Worker!');
});
