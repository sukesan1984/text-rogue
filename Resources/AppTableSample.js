(function() {

  exports.init = function(titleStr) {
    var goButton, i, message, photo, row, rowData, searchBar, tableView, win, _i;
    win = Ti.UI.createWindow({
      title: titleStr,
      backgroundColor: '#FFFFFF'
    });
    searchBar = Ti.UI.createSearchBar({
      barColor: '#385292',
      showCancel: false
    });
    rowData = [];
    for (i = _i = 1; _i < 6; i = ++_i) {
      row = Ti.UI.createTableViewRow();
      row.selectedBackgroundColor = '#fff';
      row.height = 60;
      row.className = 'datarow';
      if (i <= 3) {
        message = Ti.UI.createLabel({
          color: '#576996',
          font: {
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Arial'
          },
          left: 70,
          top: 2,
          height: 30,
          width: 200,
          text: 'dragon' + i + ' has appeared'
        });
        message.rowNum = i;
        row.add(message);
        photo = Ti.UI.createView({
          backgroundImage: 'images/dragon.png',
          top: 5,
          left: 10,
          width: 50,
          height: 50
        });
        photo.rowNum = i;
        row.add(photo);
      } else {
        message = Ti.UI.createLabel({
          color: '#576996',
          font: {
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Arial'
          },
          left: 70,
          top: 2,
          height: 30,
          width: 200,
          text: 'hammer`' + i
        });
        message.rowNum = i;
        row.add(message);
        photo = Ti.UI.createView({
          backgroundImage: 'images/hammer.png',
          top: 5,
          left: 10,
          width: 50,
          height: 50
        });
        photo.rowNum = i;
        row.add(photo);
      }
      rowData.push(row);
    }
    tableView = Ti.UI.createTableView({
      data: rowData,
      seach: searchBar
    });
    tableView.setHeight(300);
    tableView.setTop(0);
    win.add(tableView);
    goButton = Ti.UI.createButton({
      systemButton: Ti.UI.iPhone.SystemButton.DONE
    });
    goButton.setHeight(50);
    goButton.setWidth(300);
    goButton.setTop(305);
    goButton.setTitle("GO");
    win.add(goButton);
    return win;
  };

}).call(this);
