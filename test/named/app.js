const scriptURL =  require('../../index.js?name=service-worker.js!./sw.js');

navigator.serviceWorker.register(scriptURL).then(() => {
  console.log('Hello Service Worker!');
});
