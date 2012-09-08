(function() {
  var DungeonLogView, ETableView;

  ETableView = require('ui/ETableView');

  DungeonLogView = (function() {

    function DungeonLogView(tableView) {
      this._tableView = tableView;
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

    DungeonLogView.prototype.onStatusClick = function(e, pushed) {
      var top;
      top = this._tableView.getTop();
      if (pushed === false) {
        return this._tableView.setTop(top + 70);
      } else {
        return this._tableView.setTop(top - 70);
      }
    };

    DungeonLogView.prototype.appendedTo = function(win) {
      return win.add(this._tableView);
    };

    DungeonLogView.prototype.setData = function(rowData) {
      return this._tableView.setData(rowData);
    };

    return DungeonLogView;

  })();

  module.exports = DungeonLogView;

}).call(this);
