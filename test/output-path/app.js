const scriptURL =  require('../../index.js?outputPath=__out__/workers!./sw.js');

navigator.serviceWorker.register(scriptURL).then(() => {
  console.log('Hello Service Worker!');
});
