chrome.processes.getProcessInfo([ ], true, function(processes) {
    for (var key in processes) {
        var p = processes[key];

        if (p.type == 'renderer' && // タブのプロセスの type は renderer
            p.privateMemory > 300 * 1024 * 1024) {

            chrome.processes.terminate(p.id, function(success) {
                console.log(success ? 'success' : 'failed');
            });
        }
    }
});
