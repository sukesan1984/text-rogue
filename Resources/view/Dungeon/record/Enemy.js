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
      var dialog;
      this.model["delete"](this.id);
      dialog = Titanium.UI.createAlertDialog();
      dialog.setTitle('YEAHHHHH');
      dialog.setMessage(this.enemy_master.name + 'を倒した。');
      dialog.show();
      return RecordEnemy.__super__.onClick.call(this, e);
    };

    RecordEnemy.prototype.action = function() {
      this.modelEnemyData.update({
        hp_remain: this.enemy_data.hp_remain,
        message: this.enemy_master.name + "の攻撃！" + this.enemy_master.attack + "のダメージ"
      }, this.id);
      if (!this.row.getHasCheck()) {

      }
    };

    return RecordEnemy;

  })(RecordBase);

  module.exports = RecordEnemy;

}).call(this);
