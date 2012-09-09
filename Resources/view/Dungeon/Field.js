(function() {
  var DungeonFieldView, ETableView;

  ETableView = require('ui/ETableView');

  DungeonFieldView = (function() {

    function DungeonFieldView(tableView) {
      this._tableView = tableView;
      return this;
    }

    DungeonFieldView.prototype.deleteAll = function(rowData) {
      var r, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = rowData.length; _i < _len; _i++) {
        r = rowData[_i];
        _results.push(this._tableView.deleteRow[0]);
      }
      return _results;
    };

    DungeonFieldView.prototype.onStatusClick = function(e, pushed) {
      var top;
      top = this._tableView.getTop();
      if (pushed === false) {
        return this._tableView.setTop(top + 70);
      } else {
        return this._tableView.setTop(top - 70);
      }
    };

    DungeonFieldView.prototype.appendedTo = function(win) {
      return win.add(this._tableView);
    };

    DungeonFieldView.prototype.setData = function(rowData) {
      return this._tableView.setData(rowData);
    };

    return DungeonFieldView;

  })();

  module.exports = DungeonFieldView;

}).call(this);
