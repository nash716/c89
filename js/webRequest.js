chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    for (var i = 0; i < details.requestHeaders.length; i++) {
        if (details.requestHeaders[i].name.toLowerCase() == 'cookie') {
            details.requestHeaders.splice(i, 1);
            break;
        }
    }

    return {
        requestHeaders: details.requestHeaders
    };
}, { urls: [ '*://twitter.com/*' ] }, [ 'blocking', 'requestHeaders' ]);
