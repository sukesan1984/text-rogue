(function() {
  var ModelBase;

  ModelBase = (function() {

    function ModelBase() {
      return this;
    }

    ModelBase.prototype.execute = function() {
      this.db = Ti.Database.open('mydb');
      this.db.execute.apply = Function.prototype.apply;
      return this.db.execute.apply(this.db, arguments);
    };

    ModelBase.prototype.close = function() {
      return this.db.close();
    };

    return ModelBase;

  })();

  module.exports = ModelBase;

}).call(this);
