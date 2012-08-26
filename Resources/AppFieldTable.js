(function() {

  exports.init = function(titleStr) {
    var rows, tableview, win;
    win = Ti.UI.createWindow({
      title: titleStr,
      backgroundColor: '#FFFFFF'
    });
    rows = [
      {
        title: 'Row1',
        hasChild: true
      }, {
        title: 'Row2',
        hasDetail: true
      }, {
        title: 'Row3',
        hasCheck: true
      }, {
        title: 'Row4'
      }
    ];
    tableview = Ti.UI.createTableView({
      data: rows
    });
    tableview.addEventListener('click', function(e) {
      var index, row, rowdata, section;
      index = e.index;
      section = e.section;
      row = e.rows;
      return rowdata = e.rowData;
    });
    win.add(tableview);
    return win;
  };

}).call(this);
