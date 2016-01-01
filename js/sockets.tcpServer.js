chrome.sockets.tcpServer.create({ }, function(createInfo) {
    chrome.sockets.tcpServer.listen(createInfo.socketId,
                                    '127.0.0.1', 8989,
                                    function(result) {
        chrome.sockets.tcpServer.setPaused(createInfo.socketId, false);
    });
});

chrome.sockets.tcpServer.onAccept.addListener(function(info) {
    chrome.sockets.tcp.setPaused(info.clientSocketId, false);
});

chrome.sockets.tcp.onReceive.addListener(function(info) {
    chrome.sockets.tcp.send(info.socketId, info.data, function() {
        chrome.sockets.tcp.close(info.socketId);
    });
});
