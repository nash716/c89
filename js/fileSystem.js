// ===============
// サンプルコード前半
// ===============

chrome.fileSystem.chooseEntry({
    type: 'openDirectory'
}, function(entry) {
    chrome.storage.local.set({
        retainId: chrome.fileSystem.retainEntry(entry)
    }, function() { });
});

// ===============
// サンプルコード後半
// ===============

chrome.storage.local.get('retainId', function(items) {
    var filename = 'hogehoge.txt';
    var blob = new Blob([ 'hogehoge~~' ]);

    chrome.fileSystem.isRestorable(items.retainId || '', function(success) {
        if (success) {
            chrome.fileSystem.restoreEntry(items.retainId, function(entry) {
                entry.getFile(filename, { create: true }, function(fileEntry) {
                    fileEntry.createWriter(function(fileWriter) {
                        fileWriter.onwriteend = function(e) {
                            // do something
                        };

                        fileWriter.onerror = function(e) {
                            // error handling
                        };

                        fileWriter.write(blob);
                    }, function() {
                        // error handling
                    });
                });
            });
        } else {
            // もう一度ユーザにディレクトリの選択を求める
        }
    });
});
