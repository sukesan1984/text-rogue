(function() {
  var Fields, ModelBase,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelBase = require('model/Base');

  Fields = (function(_super) {

    __extends(Fields, _super);

    function Fields() {
      var sql;
      sql = 'CREATE TABLE IF NOT EXISTS\nfield_data (\n    id integer\n    , type integer\n)';
      this.execute(sql);
      this.execute('DELETE FROM field_data');
      this.close();
    }

    Fields.prototype.getTableName = function() {
      return 'field_data';
    };

    Fields.prototype.insert = function(id, type) {
      this.execute('INSERT INTO field_data (id, type) values ( ?, ? )', id, type);
      return this.close();
    };

    Fields.prototype["delete"] = function(id) {
      this.execute("DELETE FROM field_data where id = ?", id);
      return this.close();
    };

    Fields.prototype.deleteAll = function() {
      return this.execute("DELETE FROM field_data");
    };

    Fields.prototype.get_all = function() {
      var result, rows;
      rows = this.execute('SELECT id, type FROM field_data');
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

    return Fields;

  })(ModelBase);

  module.exports = Fields;

}).call(this);
