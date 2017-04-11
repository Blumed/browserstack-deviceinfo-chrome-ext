// // Standard Google Universal Analytics code
// var _gaq = _gaq || [];
// _gaq.push(['_setAccount', 'UA-81115441-1']);
// _gaq.push(['_trackPageview', '/options.html']);

// var console = chrome.extension.getBackgroundPage().console;

// function contentScript() {
//     chrome.tabs.executeScript({
//         file: 'assets/js/contentScript.js'
//     });
// }

// function allElements() {
//     chrome.tabs.executeScript({
//         file: 'assets/js/allElements.js'
//     });
// }

// function removeClass() {
//     chrome.tabs.executeScript({
//         file: 'assets/js/remove.js'
//     });
// }

// function hoverItUp() {
//     chrome.tabs.executeScript({
//         file: 'assets/js/outliner.js'
//     });
// }

// function settingsPage() {
//     location.href="/options.html";
// }

// document.getElementById('settingsButton').addEventListener('click', settingsPage);
// document.getElementById('clearButton').addEventListener('click', removeClass);

// var app = {
//     init: function() {
//         //Cache elements
//         var customSelectors = document.getElementById('inputPressed'),
//             customSelectorsInput = document.getElementById('submitButton'),
//             toggleShaders = document.getElementById('shaderererzzz'),
//             allSelectors = document.getElementById('allButton'),
//             hoverToggle = document.getElementById('hoverToggle'),
//             matchedResults = document.getElementById('matchedResults'),
//             removeSelectorsBtn = document.getElementById('clearButton'),
//             storage = chrome.storage.local,
//             removeCustomeSelectors = "";
//         noMatches = "None";

//         //Retrieve existing settings
//         $('*:checkbox').each(function(index, element) {
//             var name = this.name;
//             storage.get(name, function(items) {
//                 element.checked = items[name]; // true  OR  false / undefined (=false)
//             });
//         });

//         $('*:checkbox').on('change', saveCheckedSettings);

//         //Save or delete settings
//         function saveCheckedSettings() {
//             var name = this.name;
//             var items = {};
//             items[name] = this.checked;
//             storage.set(items, function() {
//                 // console.log("saved");
//             });

//         }

//         $('#submitBorders').on('change', saveCheckedSettings);
//         // check hover toggle
//         this.hoverChecked = hoverToggle.checked;

//         // hover toggle event listener
//         hoverToggle.addEventListener('change', function() {
//             // store checked state
//             hoverChecked = this.checked;

//             // close window if hover is checked
//             if (hoverChecked){
//                 window.close();
//             }



//             //set hover state in chrome local storage
//             chrome.storage.local.set({
//                 hoverChecked: hoverChecked
//             });

//             // send hover state
//             chrome.tabs.query({
//                 active: true,
//                 currentWindow: true
//             }, function(tabs) {
//                 chrome.tabs.sendMessage(tabs[0].id, {
//                     hoverChecked: hoverChecked
//                 });
//             });

//             // fire outliner
//             hoverItUp();
//         });


//         //Adding Selectors
//         chrome.runtime.sendMessage({ fn: "getSelector" }, function(response) {
//             //console.log("got selector" + response.selector);
//             if (response === "") {
//                 removeCustomeSelectors = response.selector;
//                 noMatches = response.matched;
//                 //console.log("you are here" + customSelectors.value);
//             } else {
//                 customSelectors.value = response.selector;
//                 var currentStyle = $('input[type="checkbox"]:checked').attr('id');
//                 //console.log(currentStyle);
//                 currentStyle = response.style;
//             }
//         });

//         //Pressing Enter on input field triggers click
//         $(customSelectors).on('keyup', function(e, customSelectors) {
//             if (e.which == 13) {
//                 $(customSelectorsInput).trigger('click');
//                 return false;
//             }
//         });

//         //Pressing Enter on input checkbox field triggers click
//         $('input[type="checkbox"]').on('keyup', function(e, toggleShaders) {
//             if (e.which == 13) {
//                 $('input[type="checkbox"]').trigger('click');
//                 return false;
//             }
//         });

//         //Sends border or shader style to page
//         customSelectorsInput.addEventListener('click', function() {
//             //console.log('button click' + ' ' + customSelectors.value);

//             //iterates over checkbox and grabs the checked ones and puts them in a string inside of the array
//             var currentStyle = [];
//             $('.feature-styles input[type="checkbox"]:checked').each(function() {
//                 currentStyle.push($(this).attr('id'));
//             });
//             //turn array into a string
//             currentStyle = currentStyle.toString();
//             //remove array comma and replace with space
//             currentStyle = currentStyle.replace(/,/g, " ");
//             //console.log(currentStyle);
//             var matched = "";
//             chrome.runtime.sendMessage({ fn: "setSelections", selector: customSelectors.value, style: currentStyle, data: matched });
//             //Runs contentscript so background respnonse will activate selectors on current page
//             contentScript();
//             var selector = new Object();
//                 selector.active = true;
//                 selector.element = customSelectors.value;
//                 selector.count = customSelectors.length;




//         });

//         //Sends border or shader style to all Elements on the page
//         allSelectors.addEventListener('click', function() {
//             //console.log('button click' + ' ' + customSelectors.value);
//             removeSelectorsBtn.focus();

//             //iterates over checkbox and grabs the checked ones and puts them in a string inside of the array
//             var currentStyle = [];
//             $('.feature-styles input[type="checkbox"]:checked').each(function() {
//                 currentStyle.push($(this).attr('id'));
//             });
//             //turn array into a string
//             currentStyle = currentStyle.toString();
//             //remove array comma and replace with space
//             currentStyle = currentStyle.replace(/,/g, " ");

//             chrome.runtime.sendMessage({ fn: "setSelections", selector: customSelectors.value, style: currentStyle });
//             //Runs allElements script so background respnonse will activate selectors on current page
//             allElements();
//         });

//         //Removing Selectors
//         removeSelectorsBtn.addEventListener('click', function() {
//             //Need to clear input field
//             // console.log('Clear was clicked');
//             customSelectors.value = "";
//             customSelectors.focus();
//             var currentStyle = $('button.is-active').attr('id');
//             //console.log('button click' + ' ' + customSelectors.value);
//             chrome.runtime.sendMessage({ fn: "setSelections", selector: removeCustomeSelectors, style: currentStyle });
//             // console.log('clear clicked');

//             //Runs contentscript so background respnonse will activate selectors on current page
//             removeClass();
//         });

//     }
// }

// app.init();
// chrome.tabs.getSelected(null, function(tab) {
//     chrome.tabs.sendMessage(tab.id, {method: "getText"}, function(response) {
//         if(response.method=="getText"){
//             alltext = response.data;
//         }
//     });
// });

// Update the relevant fields with the new data
function setDOMInfo(info) {
    //document.getElementById('device').textContent = info.device;
    document.getElementById('browser').textContent = info.browser;
    document.getElementById('os').textContent = info.os;  
    document.getElementById('orientation').textContent   = info.orientation;  
    document.getElementById('resolution').textContent  = info.resolution;
    document.getElementById('screen').textContent = info.screen;
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