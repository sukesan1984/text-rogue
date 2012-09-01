(function() {
  var ModelBase, Records,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelBase = require('model/Base');

  Records = (function(_super) {

    __extends(Records, _super);

    function Records() {
      this.execute('CREATE TABLE IF NOT EXISTS record_data ( id integer, type integer )');
      this.execute('DELETE FROM record_data');
      this.close();
    }

    Records.prototype.insert = function(id, type) {
      this.execute('INSERT INTO record_data (id, type) values ( ?, ? )', id, type);
      return this.close();
    };

    Records.prototype["delete"] = function(id) {
      this.execute("DELETE FROM record_data where id = ?", id);
      return this.close();
    };

    Records.prototype.get_all = function() {
      var result, rows;
      rows = this.execute('SELECT id, type FROM record_data');
      result = [];
      while (rows.isValidRow()) {
        result.push({
          id: rows.fieldByName('id'),
          type: rows.fieldByName('type')
        });
        rows.next();
      }
      rows.close();
      this.close();
      return result;
    };

    return Records;

  })(ModelBase);

  module.exports = Records;

}).call(this);
