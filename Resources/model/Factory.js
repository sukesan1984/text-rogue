(function() {
  var Enemy, EnemyMaster, FieldSequencial, ItemInstance, ItemMaster, ModelFactory, Player, Records;

  Records = require('model/instance/Fields');

  Enemy = require('model/instance/Enemy');

  Player = require('model/instance/Player');

  ItemInstance = require('model/instance/Item');

  EnemyMaster = require('model/master/Enemy');

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
        case "Player":
          this._models[name] = new Player();
          break;
        case "ItemInstance":
          this._models[name] = new ItemInstance();
          break;
        case "EnemyMaster":
          this._models[name] = new EnemyMaster();
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
