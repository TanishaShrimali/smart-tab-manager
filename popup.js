document.addEventListener("DOMContentLoaded", () => {

    chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
        const activeTabId = activeTabs[0].id;

        // ✅ Update active tab time
        chrome.storage.local.set({
            [activeTabId]: Date.now()
        }, () => {

            // ✅ ONLY run after update completes
            const tabList = document.getElementById("tabList");

            chrome.tabs.query({}, (tabs) => {
                chrome.storage.local.get(null, (data) => {

                    const currentTime = Date.now();
                    const INACTIVE_LIMIT = 10 * 1000;

                    tabs.forEach((tab) => {

                        // 🚫 Skip active tab
                        if (tab.id === activeTabId) return;

                        const lastActive = data[tab.id] || currentTime;

                        if (currentTime - lastActive > INACTIVE_LIMIT) {
                            let li = document.createElement("li");
                            li.textContent = tab.title;
                            tabList.appendChild(li);
                        }
                    });

                });
            });

        }); // ✅ important callback

    });

});
document.getElementById("closeTabs").addEventListener("click", () => {

    // Step 1: Get active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
        const activeTabId = activeTabs[0].id;

        // Step 2: Update its timestamp FIRST
        chrome.storage.local.set({
            [activeTabId]: Date.now()
        }, () => {

            // Step 3: After update, run closing logic
            chrome.tabs.query({}, (tabs) => {
                chrome.storage.local.get(null, (data) => {

                    const currentTime = Date.now();
                    const INACTIVE_LIMIT = 10 * 1000; // keep same as display

                    tabs.forEach((tab) => {

                        // 🚫 Never close active tab
                        if (tab.id === activeTabId) return;

                        const lastActive = data[tab.id] || currentTime;

                        if (currentTime - lastActive > INACTIVE_LIMIT) {
                            console.log("Closing:", tab.title);
                            chrome.tabs.remove(tab.id);
                        }
                    });

                });
            });

        }); // IMPORTANT callback

    });

});