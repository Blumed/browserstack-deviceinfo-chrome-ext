chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data

    //https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript?page=1&tab=active#tab-top
    let deviceOrientation = '';
    let deviceViewport = '';
    let qd = {};
    if (location.href) {
        var re = /(\#|\&)/;
        location.href.substr(1).split(re).forEach(item => {let [k,v] = item.split("="); v = v && decodeURIComponent(v).replace(/\+/g, " "); (qd[k] = qd[k] || []).push(v)})
    }
    (!$('#skinParent').hasClass('rotate270')) ? deviceOrientation = 'Portrait' : deviceOrientation = 'Landscape';
    $('#device-info-resolution') ? deviceViewport = $('#device-info-viewport').text() : deviceViewport = $('#dockResolution').text();
    let domInfo = {
        device: 'undefined' === typeof qd.device ? 'N/A' : qd.device,
        browser: 'undefined' === typeof qd.browser ? qd.device_browser : qd.browser + ' ' + qd.browser_version,
        os: qd.os + ' '+ qd.os_version,
        orientation: deviceOrientation,
        resolution:  $('#device-info-resolution').text(),
        screen: deviceViewport,
        date: moment().format('MMMM Do YY'),
        time: moment().format('h:mm:ss a')
    };
      console.log(domInfo.device);
      console.log(domInfo.browser);
      console.log(domInfo.os);
      console.log(domInfo.orientation);
      console.log(domInfo.resolution);
      console.log(domInfo.screen);
      console.log(domInfo.date);
      console.log(domInfo.time);
    // Directly respond to the sender (popup),
    // through the specified callback */
    response(domInfo);
  }
});
