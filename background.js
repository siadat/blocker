let redirects = {
  "https://github.com/": "https://news.ycombinator.com/best",
  "https://twitter.com/home": "https://news.ycombinator.com/best",
  "https://www.linkedin.com/feed/": "https://news.ycombinator.com/best",
};

let urlVisited = function(url, tabId) {
  for(const filter in redirects) {
    if(url == filter) {
      chrome.tabs.update(tabId, {url: redirects[filter]});
    }
  }
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  urlVisited(changeInfo.url, tabId)
});

chrome.tabs.onCreated.addListener(function(tab) {
  urlVisited(tab.pendingUrl, tab.Id)
});
