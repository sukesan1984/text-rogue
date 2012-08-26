(function() {

  exports.init = function(titleStr) {
    var RecordManager, goButton, rowData, searchBar, tableView, win;
    win = Ti.UI.createWindow({
      title: titleStr,
      backgroundColor: '#FFFFFF'
    });
    searchBar = Ti.UI.createSearchBar({
      barColor: '#385292',
      showCancel: false
    });
    RecordManager = require('record/Manager');
    rowData = RecordManager.getRecords();
    tableView = Ti.UI.createTableView({
      data: rowData,
      seach: searchBar
    });
    tableView.setHeight(300);
    tableView.setTop(0);
    RecordManager.setTableView(tableView);
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
      RecordManager.notifyRecords("action");
    });
    win.add(goButton);
    return win;
  };

}).call(this);
