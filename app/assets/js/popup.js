// Update the relevant fields with the new data
function setDOMInfo(info) {
    document.getElementById('device').textContent = info.device;
    document.getElementById('browser').textContent = info.browser;
    document.getElementById('os').textContent = info.os;
    document.getElementById('orientation').textContent   = info.orientation;
    document.getElementById('resolution').textContent  = info.resolution;
    document.getElementById('screen').textContent = info.screen;
    document.getElementById('url').textContent = info.url;
    document.getElementById('date').textContent = info.date;
    document.getElementById('time').textContent = info.time;
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called
        //    from the receiving end (content script)
        setDOMInfo);
  });
});
(function(){
    new Clipboard('#btn-copy');
})();
