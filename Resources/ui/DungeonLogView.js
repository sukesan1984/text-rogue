(function() {
  var DungeonLogView, ETableView;

  ETableView = require('ui/ETableView');

  DungeonLogView = (function() {

    function DungeonLogView() {
      this._tableView = new ETableView(this);
      this._tableViewObj = this._tableView.getObject();
      this._tableViewObj.top = 30;
      this._tableViewObj.setRowHeight(60);
      this._tableViewObj.setHeight(300);
      return this;
    }

    DungeonLogView.prototype.deleteAll = function(rowData) {
      var r, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = rowData.length; _i < _len; _i++) {
        r = rowData[_i];
        _results.push(this._tableView.deleteRow[0]);
      }
      return _results;
    };

    DungeonLogView.prototype.onClick = function(e, pushed) {
      console.log("pushed" + pushed);
      if (pushed === false) {
        return this._tableView.setTop(100);
      } else {
        return this._tableView.setTop(30);
      }
    };

    DungeonLogView.prototype.appendedTo = function(win) {
      return win.add(this._tableViewObj);
    };

    DungeonLogView.prototype.setData = function(rowData) {
      return this._tableView.setData(rowData);
    };

    return DungeonLogView;

  })();

  module.exports = DungeonLogView;

}).call(this);
