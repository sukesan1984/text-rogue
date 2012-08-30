(function() {

  exports.init = function(titleStr) {
    var RecordManager, goButton, searchBar, tableView, win;
    win = Ti.UI.createWindow({
      title: titleStr,
      backgroundColor: '#FFFFFF'
    });
    searchBar = Ti.UI.createSearchBar({
      barColor: '#385292',
      showCancel: false
    });
    RecordManager = require('record/Manager');
    tableView = RecordManager.getTableView();
    win.add(tableView);
    goButton = Ti.UI.createButton({
      systemButton: Ti.UI.iPhone.SystemButton.DONE
    });
    goButton.setHeight(50);
    goButton.setWidth(300);
    goButton.setTop(305);
    goButton.setTitle("GO");
    goButton.addEventListener('click', function(e) {
      RecordManager.countUpTurn();
      RecordManager.notify("action");
      RecordManager.reload();
      RecordManager._setMock();
    });
    win.add(goButton);
    return win;
  };

}).call(this);
