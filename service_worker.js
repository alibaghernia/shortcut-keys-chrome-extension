chrome.commands.onCommand.addListener((command) => {
    if (command === 'open-chatgpt') {
        chrome.tabs.create({ url: "https://chatgpt.com/" });
        return;
    }

})