chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
    if(message == "clear"){
        
        chrome.browsingData.remove({
            "origins": ["https://www.unc.edu"]
          }, {
            "cacheStorage": true,
            "cookies": true,
            "fileSystems": true,
            "indexedDB": true,
            "localStorage": true,
            "pluginData": true,
            "serviceWorkers": true,
            "webSQL": true
          });
          console.log("CLEARED");
    }
});

// Update the declarative rules on install or upgrade.
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'connectcarolina.unc.edu'},
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction() ]
      }]);
    });
  });
