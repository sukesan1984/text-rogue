(function() {
  var Enemy, EnemyMapMaster, EnemyMaster, FieldSequencial, ItemInstance, ItemMaster, LogsInstance, ModelFactory, PlayerInstance, Records;

  Records = require('model/instance/Fields');

  Enemy = require('model/instance/Enemy');

  PlayerInstance = require('model/instance/Player');

  ItemInstance = require('model/instance/Item');

  LogsInstance = require('model/instance/Logs');

  EnemyMaster = require('model/master/Enemy');

  EnemyMapMaster = require('model/master/EnemyMap');

  ItemMaster = require('model/master/Item');

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
        case "PlayerInstance":
          this._models[name] = new PlayerInstance();
          break;
        case "ItemInstance":
          this._models[name] = new ItemInstance();
          break;
        case "LogsInstance":
          this._models[name] = new LogsInstance();
          break;
        case "EnemyMaster":
          this._models[name] = new EnemyMaster();
          break;
        case "EnemyMapMaster":
          this._models[name] = new EnemyMapMaster();
          break;
        case "ItemMaster":
          this._models[name] = new ItemMaster();
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
