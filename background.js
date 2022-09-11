function replaceLinks() {
    var links = document.querySelectorAll('[data-href]');
    links.forEach(function (link) {
        link.setAttribute('href', link.getAttribute('data-href'));
        link.setAttribute('target', '_blank');
        link.removeAttribute('data-href')
    })
}

function injectScript(tabId) {
    chrome.scripting.executeScript({
        target: {tabId: tabId}, func: replaceLinks,
    });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        injectScript(tabId);
    }
});