chrome.tabs.onActivated.addListener((activeInfo) => {
    const tabId = activeInfo.tabId;
    const currentTime = Date.now();

    // Store last active time
    chrome.storage.local.set({
        [tabId]: currentTime
    });
});
chrome.tabs.onActivated.addListener((activeInfo) => {
    const tabId = activeInfo.tabId;
    const currentTime = Date.now();

    console.log("Tab switched:", tabId); // DEBUG

    chrome.storage.local.set({
        [tabId]: currentTime
    });
});