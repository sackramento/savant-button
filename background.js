chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    enabledSites: {
      'espn.com': true,
      'cbssports.com': true,
      'sports.yahoo.com': true,
      'fantrax.com': true,
      'nfc.shgn.com': true,
      'ottoneu.fangraphs.com': true,
      'underdogfantasy.com': true
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete' || !tab.url) return;

  const url = new URL(tab.url);
  const hostname = url.hostname;

  chrome.storage.sync.get('enabledSites', (data) => {
    const enabledSites = data.enabledSites || {};
    const domain = Object.keys(enabledSites).find(key => hostname.includes(key));
    if (domain && enabledSites[domain]) {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ['content.js']
      });
    }
  });
});
