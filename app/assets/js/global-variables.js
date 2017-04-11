console.log(window.BrowserStack.user.recentHistory.url);
console.log('global-variables have loaded');
(function() {
  window.postMessage({ type: "FROM_PAGE", url: window.BrowserStack.user.recentHistory.url }, "*");
}())
