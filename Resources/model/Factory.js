(function() {
  var ModelFactory, Records;

  Records = require('model/Records');

  ModelFactory = new ((function() {

    function _Class() {
      this._models = {};
    }

    _Class.prototype.get = function(name) {
      if (this._models[name]) {
        return this._models[name];
      }
      switch (name) {
        case "Records":
          this._models[name] = new Records();
          break;
        default:
          this._models[name] = new Records();
      }
      return this._models[name];
    };

    return _Class;

  })());

  module.exports = ModelFactory;

}).call(this);
