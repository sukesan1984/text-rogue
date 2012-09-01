(function() {
  var ETableViewRow;

  ETableViewRow = (function() {

    function ETableViewRow() {
      this.table_view_row = Ti.UI.createTableViewRow();
      return this;
    }

    ETableViewRow.prototype.add = function(child) {
      return this.table_view_row.add(child);
    };

    ETableViewRow.prototype.remove = function(child) {
      return this.table_view_row.remove(child);
    };

    ETableViewRow.prototype.setHasCheck = function(hasCheck) {
      if (hasCheck === (true | false)) {
        return;
      }
      return this.table_view_row.setHasCheck(hasCheck);
    };

    ETableViewRow.prototype.getHasCheck = function() {
      return this.table_view_row.getHasCheck();
    };

    ETableViewRow.prototype.addEventListener = function(event, callback) {
      return this.table_view_row.addEventListener(event, callback);
    };

    ETableViewRow.prototype.getObject = function() {
      return this.table_view_row;
    };

    return ETableViewRow;

  })();

  module.exports = ETableViewRow;

}).call(this);
