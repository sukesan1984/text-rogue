(function() {
  var ETableView;

  ETableView = (function() {

    function ETableView(parent) {
      this._parent = parent;
      this.table_view = Ti.UI.createTableView();
      return this;
    }

    ETableView.prototype.add = function(child) {
      return this.table_view.add(child);
    };

    ETableView.prototype.remove = function(child) {
      return this.table_view.remove(child);
    };

    ETableView.prototype.deleteRow = function(row, animation) {
      return this.table_view.deleteRow(row, animation);
    };

    ETableView.prototype.removeFromParent = function() {
      return this._parent.remove(this.table_view);
    };

    ETableView.prototype.setHeight = function(value) {
      return this.table_view.setHeight(value);
    };

    ETableView.prototype.setTop = function(value) {
      return this.table_view.setTop(value);
    };

    ETableView.prototype.setData = function(rowData) {
      return this.table_view.setData(rowData);
    };

    ETableView.prototype.appendRow = function(row, animation) {
      return this.table_view.appendRow(row, animation);
    };

    ETableView.prototype.getObject = function() {
      return this.table_view;
    };

    return ETableView;

  })();

  module.exports = ETableView;

}).call(this);
