chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data

    //qd.destroy();
    //https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript?page=1&tab=active#tab-top
    let deviceOrientation,
        deviceResolution,
        deviceViewport,
        deviceBootstrap = '';

    let qd = {};
    
    if (location.href) {
      let re = /(\#|\&)/;
      location.href.substr(1).split(re).forEach(item => { let [k, v] = item.split("="); v = v && decodeURIComponent(v).replace(/\+/g, " "); (qd[k] = qd[k] || []).push(v) })
    }
    (!$('#skinParent').hasClass('rotate270')) ? deviceOrientation = 'Portrait' : deviceOrientation = 'Landscape';
    ($('#dock').hasClass('is-desktop')) ? (deviceResolution = 'N/A', deviceViewport = $('#dockResolution').text() + ' px') : (deviceResolution = $('#device-info-resolution').text(), deviceViewport = $('#device-info-viewport').text().replace('dp', 'px'));

    // Isolate device viewport width into bootstrap variable
    deviceBootstrap = deviceViewport.match(/(?:(?!\ x).)*/);

    // Set bootstrap string to bootstrap breakpoint names bashed on window width
    deviceBootstrap < 768 ? deviceBootstrap = 'XS' : false;
    deviceBootstrap >= 768 && deviceBootstrap < 992 ? deviceBootstrap = 'SM' : false;
    deviceBootstrap >= 992 && deviceBootstrap < 1200 ? deviceBootstrap = 'MD' : false;
    deviceBootstrap >= 1200 ? deviceBootstrap = 'LG' : false;

    // Attach above information to domInfo Object    
    let domInfo = {
        device: 'undefined' === typeof qd.device ? 'N/A' : qd.device,
        browser: 'undefined' === typeof qd.browser ? qd.device_browser : qd.browser + ' ' + qd.browser_version,
        os: qd.os + ' '+ qd.os_version,
        orientation: deviceOrientation,
        resolution:  deviceResolution,
        screen: deviceViewport,
        bootstrap: deviceBootstrap,
        url: '',
        date: moment().format('MMMM Do YY'),
        time: moment().format('h:mm:ss a')
    };
      // console.log(domInfo.device);
      // console.log(domInfo.browser);
      // console.log(domInfo.os);
      // console.log(domInfo.orientation);
      // console.log(domInfo.resolution);
      // console.log(domInfo.screen);
      // console.log(domInfo.bootstrap[0]);
      // console.log(domInfo.date);
      // console.log(domInfo.time);
      // console.log('-----------');
      // console.log(domInfo);
    // Directly respond to the sender (popup),
    // through the specified callback */
      response(domInfo);
  }
});
