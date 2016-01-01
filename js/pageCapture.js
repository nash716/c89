// tabId は適宜変更してください
chrome.pageCapture.saveAsMHTML({ tabId: 12 }, function(blob) {
    getString(blob, function(text) {
        var uri = 'data:application/mhtml,' + encodeURIComponent(text);
        window.open(uri);
    });
});

function getString(blob, callback) {
    var reader = new FileReader();

    reader.onloadend = function() {
        callback(reader.result);
    };
    reader.readAsText(blob);
}
