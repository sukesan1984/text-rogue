(function() {
  var Fields, ModelBase,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelBase = require('model/Base');

  Fields = (function(_super) {

    __extends(Fields, _super);

    function Fields() {
      var sql;
      sql = 'CREATE TABLE IF NOT EXISTS\nlog_data (\n    id INTEGER PRIMARY KEY AUTOINCREMENT\n    , type integer\n    , text text\n    , created_at integer\n    , updated_at integer\n)';
      this.execute(sql);
      this.execute('DELETE FROM log_data');
      this.close();
    }

    Fields.prototype.insert = function(type, text) {
      console.log(text);
      this.execute('INSERT INTO log_data (type, text, created_at, updated_at) values ( ?, ?, ?, ? )', type, text, this.get_time(), this.get_time());
      return this.close();
    };

    Fields.prototype["delete"] = function(id) {
      this.execute("DELETE FROM log_data where id = ?", id);
      return this.close();
    };

    Fields.prototype.getCurrent = function(num) {
      var result, rows, sql;
      sql = 'SELECT * FROM log_data\nORDER BY id DESC\nLIMIT ?';
      rows = this.execute(sql, num);
      result = [];
      while (rows.isValidRow()) {
        result.push({
          id: rows.fieldByName('id'),
          type: rows.fieldByName('type'),
          text: rows.fieldByName('text')
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
