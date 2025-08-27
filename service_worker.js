chrome.commands.onCommand.addListener((command) => {
    if (command === 'open-chatgpt') {
        chrome.tabs.create({ url: "https://chatgpt.com/" });
        return;
    }
    if (command === 'open-youtube') {
        chrome.tabs.create({ url: "https://www.youtube.com/" });
        return;
    }

})