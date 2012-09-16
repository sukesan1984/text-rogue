(function() {
  var ModelFactory, RecordBase, RecordEnemy,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RecordBase = require('view/dungeon/record/Base');

  ModelFactory = require('model/Factory');

  RecordEnemy = (function(_super) {

    __extends(RecordEnemy, _super);

    function RecordEnemy(row) {
      this.modelEnemyData = ModelFactory.get("Enemy");
      this.enemy_data = this.modelEnemyData.get_by_id(row.id);
      this.modelEnemyMaster = ModelFactory.get("EnemyMaster");
      this.modelPlayer = ModelFactory.get("PlayerInstance");
      this.enemy_master = this.modelEnemyMaster.get_by_id(this.enemy_data.enemy_id);
      RecordEnemy.__super__.constructor.call(this, row);
      this.message.setText(this.enemy_data.message);
      this.right_bottom.setText(this.enemy_data.hp_remain + "/" + this.enemy_master.hp_max);
      return this;
    }

    RecordEnemy.prototype._backgroundImage = function() {
      return this.enemy_master.image;
    };

    RecordEnemy.prototype.onClick = function(e) {
      var currentHp, damage, player;
      player = this.modelPlayer.get();
      damage = player.base_attack;
      currentHp = this.enemy_data.hp_remain - damage;
      if (currentHp <= 0) {
        this.model["delete"](this.id);
        this.modelLogsInstance.insert(2, this.enemy_master.name + 'を倒した。');
      } else {
        this.modelLogsInstance.insert(2, this.enemy_master.name + "に" + damage + "のダメージ");
        this.modelEnemyData.update({
          hp_remain: currentHp,
          message: ""
        }, this.id);
      }
      return RecordEnemy.__super__.onClick.call(this, e);
    };

    RecordEnemy.prototype.action = function() {
      var damage, player, player_hp;
      player = this.modelPlayer.get();
      damage = this.enemy_master.attack;
      player_hp = player.hp_remain - damage;
      this.modelPlayer.update_hp(player_hp);
      this.modelEnemyData.update({
        hp_remain: this.enemy_data.hp_remain,
        message: this.enemy_master.name + "の攻撃！" + this.enemy_master.attack + "のダメージ"
      }, this.id);
      if (player_hp <= 0) {
        return this.modelLogsInstance.insert(4, "あなたは死んだ");
      }
    };

    return RecordEnemy;

  })(RecordBase);

  module.exports = RecordEnemy;

}).call(this);
