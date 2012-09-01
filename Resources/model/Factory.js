(function() {
  var Enemy, EnemyMaster, FieldSequencial, ModelFactory, Records;

  Records = require('model/Records');

  Enemy = require('model/Enemy');

  EnemyMaster = require('model/EnemyMaster');

  FieldSequencial = require('model/FieldSequencial');

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
        case "Enemy":
          this._models[name] = new Enemy();
          break;
        case "EnemyMaster":
          this._models[name] = new EnemyMaster();
          break;
        case "FieldSequencial":
          this._models[name] = new FieldSequencial();
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
