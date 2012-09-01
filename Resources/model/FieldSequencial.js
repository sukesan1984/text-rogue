(function() {
  var FieldSequencial, ModelBase,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelBase = require('model/Base');

  FieldSequencial = (function(_super) {

    __extends(FieldSequencial, _super);

    function FieldSequencial() {
      var sql;
      sql = 'CREATE TABLE IF NOT EXISTS\nseq_field (\n    value integer\n)';
      this.execute(sql);
      this.execute('DELETE FROM seq_field');
      this.insert(1);
      this.close();
    }

    FieldSequencial.prototype.insert = function(value) {
      var sql;
      sql = 'INSERT INTO seq_field\n(\n    value\n)\nvalues\n(\n    ?\n)';
      return this.execute(sql, value);
    };

    FieldSequencial.prototype.update = function() {
      var sql;
      sql = 'UPDATE seq_field\nSET value = value + 1';
      this.execute(sql);
      return this.close();
    };

    FieldSequencial.prototype.get = function(id) {
      var rows, value;
      rows = this.execute("SELECT * FROM seq_field");
      while (rows.isValidRow()) {
        value = rows.fieldByName('value');
        rows.next();
      }
      rows.close();
      this.close();
      this.update();
      return value;
    };

    return FieldSequencial;

  })(ModelBase);

  module.exports = FieldSequencial;

}).call(this);
