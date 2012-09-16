(function() {
  var DungeonMaster, Enemy, EnemyMapMaster, EnemyMaster, FieldSequencial, Fields, ItemInstance, ItemMaster, LogsInstance, ModelFactory, PlayerInstance;

  Fields = require('model/instance/Fields');

  Enemy = require('model/instance/Enemy');

  PlayerInstance = require('model/instance/Player');

  ItemInstance = require('model/instance/Item');

  LogsInstance = require('model/instance/Logs');

  EnemyMaster = require('model/master/Enemy');

  EnemyMapMaster = require('model/master/EnemyMap');

  ItemMaster = require('model/master/Item');

  DungeonMaster = require('model/master/Dungeon');

  FieldSequencial = require('model/FieldSequencial');

  ModelFactory = new ((function() {

    function _Class() {
      this._models = {};
      this._instances = [];
    }

    _Class.prototype.get = function(name) {
      if (this._models[name]) {
        return this._models[name];
      }
      switch (name) {
        case "Fields":
          this._models[name] = new Fields();
          this._instances.push(this._models[name]);
          break;
        case "Enemy":
          this._models[name] = new Enemy();
          this._instances.push(this._models[name]);
          break;
        case "PlayerInstance":
          this._models[name] = new PlayerInstance();
          this._instances.push(this._models[name]);
          break;
        case "ItemInstance":
          this._models[name] = new ItemInstance();
          this._instances.push(this._models[name]);
          break;
        case "LogsInstance":
          this._models[name] = new LogsInstance();
          this._instances.push(this._models[name]);
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
        case "DungeonMaster":
          this._models[name] = new DungeonMaster();
          break;
        case "FieldSequencial":
          this._models[name] = new FieldSequencial();
          break;
        default:
          this._models[name] = new Fields();
      }
      return this._models[name];
    };

    _Class.prototype.initiate = function() {
      var instance, _i, _len, _ref, _results;
      _ref = this._instances;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        instance = _ref[_i];
        _results.push(instance.initiate());
      }
      return _results;
    };

    return _Class;

  })());

  module.exports = ModelFactory;

}).call(this);
