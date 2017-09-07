
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  var http = new XMLHttpRequest();
  //var url = "http://localhost:8080/logAction";
  var url = "http://18.220.166.24/logAction";
  var params = JSON.stringify({type: request["type"], content: request["content"], id: request["id"]});
  http.open("POST", url);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(params);
});

chrome.browserAction.onClicked.addListener(function(activeTab) {
  //chrome.browserAction.setPopup({ popup: ''});
  //var newURL = 'http://localhost:8080/profile';
  var newURL = 'http://18.220.166.24/profile';
  chrome.tabs.create({ url: newURL });
});
