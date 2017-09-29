
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  var http = new XMLHttpRequest();
  // var url = "http://localhost:8080/logAction";
  var url = "https://tkunderu.herokuapp.com/logAction";
  var params = JSON.stringify({type: request["type"], content: request["content"], id: request["id"]});
  http.open("POST", url);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(params);
});

chrome.browserAction.onClicked.addListener(function(activeTab) {
  // var newURL = 'http://localhost:8080/profile';
  var newURL = 'https://tkunderu.herokuapp.com/profile';
  chrome.tabs.create({ url: newURL });
});
