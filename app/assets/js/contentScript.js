chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}

injectScript( chrome.extension.getURL('/assets/js/global-variables.js'), 'body');

var port = chrome.runtime.connect();
var urlString = '';
window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    urlString = event.data.url
    console.log("Content script received: " + urlString);
    port.postMessage(event.data.url);
  }
}, false);
//console.log('content-script' + ' ' + event.data.url);

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var deviceOrientation = '';

    orientation()

    var domInfo = {
        device: $('#device-name').text(),
        browser: $('#device-info-browser').text(),
        os: $('#device-info-os').text(),
        orientation: deviceOrientation,
        resolution:  $('#device-info-resolution').text(),
        screen: $('#device-info-viewport').text(),
        url: urlString,
        date: moment().format('MMMM Do YY'),
        time: moment().format('h:mm:ss a')
      };

      function orientation() {
          if (!$('#skinParent').hasClass('rotate270')) {
              deviceOrientation  = 'Portrait';
              console.log('portrait');
          } else {
              deviceOrientation = 'Landscape'
              console.log('lasndscape');
          }
      }
      console.log(domInfo.device);
      console.log(domInfo.browser);
      console.log(domInfo.os);
      console.log(domInfo.orientation);
      console.log(domInfo.resolution);
      console.log(domInfo.screen);
      console.log(domInfo.url);
      console.log(domInfo.date);
      console.log(domInfo.time);
    // Directly respond to the sender (popup),
    // through the specified callback */
    response(domInfo);
  }
});
