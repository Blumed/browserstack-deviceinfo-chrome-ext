chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

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
        //device: $('#device-info-browser').text(),
        browser: $('#device-info-browser').text(),
        os: $('#device-info-os').text(),
        orientation: deviceOrientation,
        resolution:  $('#device-info-resolution').text(),
        screen: $('#device-info-viewport').text(),
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