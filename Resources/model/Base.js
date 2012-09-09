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

    ModelBase.prototype.get_rand = function(max) {
      var rand;
      return rand = parseInt(Math.random() * max);
    };

    ModelBase.prototype.get_time = function() {
      if (this.date) {
        return this.date.getTime();
      } else {
        this.date = new Date();
        return this.date.getTime();
      }
    };

    return ModelBase;

  })();

  module.exports = ModelBase;

}).call(this);
