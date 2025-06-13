document.addEventListener('DOMContentLoaded', () => {
  const sites = [
    'espn.com',
    'cbssports.com',
    'sports.yahoo.com',
    'fantrax.com',
    'nfc.shgn.com',
    'ottoneu.fangraphs.com',
    'underdogfantasy.com'
  ];

  chrome.storage.sync.get('enabledSites', (data) => {
    const enabledSites = data.enabledSites || {};

    sites.forEach(site => {
      const checkbox = document.getElementById(site);
      checkbox.checked = enabledSites[site] !== false;

      checkbox.addEventListener('change', () => {
        enabledSites[site] = checkbox.checked;
        chrome.storage.sync.set({ enabledSites });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) chrome.tabs.reload(tabs[0].id);
        });
      });
    });
  });
});
