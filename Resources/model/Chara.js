(function() {
  var Chara;

  Chara = new ((function() {

    function _Class() {
      this.record = {
        name: "sukesan1984",
        hp_remain: 15,
        hp_max: 30
      };
    }

    _Class.prototype.get = function() {
      return this.record;
    };

    return _Class;

  })());

  module.exports = Chara;

}).call(this);
