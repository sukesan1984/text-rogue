(function() {
  var ModelFactory, RecordBase, RecordEnemy,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RecordBase = require('record/Base');

  ModelFactory = require('model/Factory');

  RecordEnemy = (function(_super) {

    __extends(RecordEnemy, _super);

    function RecordEnemy(row) {
      this.modelEnemyData = ModelFactory.get("Enemy");
      this.enemy_data = this.modelEnemyData.get_by_id(row.id);
      this.modelEnemyMaster = ModelFactory.get("EnemyMaster");
      this.enemy_master = this.modelEnemyMaster.get_by_id(this.enemy_data.enemy_id);
      return RecordEnemy.__super__.constructor.call(this, row);
    }

    RecordEnemy.prototype._backgroundImage = function() {
      return this.enemy_master.image;
    };

    RecordEnemy.prototype.action = function() {
      var dialog;
      if (!this.row.getHasCheck()) {
        return;
      }
      this.model["delete"](this.id);
      dialog = Titanium.UI.createAlertDialog();
      dialog.setTitle('YEAHHHHH');
      dialog.setMessage('敵を倒した。');
      return dialog.show();
    };

    return RecordEnemy;

  })(RecordBase);

  module.exports = RecordEnemy;

}).call(this);
