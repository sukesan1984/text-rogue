(function() {
  var ModelFactory, StatusView, modelPlayer;

  ModelFactory = require('model/Factory');

  modelPlayer = ModelFactory.get("Player");

  StatusView = (function() {

    function StatusView() {
      var _this = this;
      this._statusView = Ti.UI.createView({
        height: 30,
        top: 0,
        left: 0,
        right: 0
      });
      this._set_name();
      this._set_hp();
      this._set_equipment();
      this._pushed = false;
      this._clickObserver = [];
      this._statusView.addEventListener('click', function(e) {
        return _this.onClick(e);
      });
      return this;
    }

    StatusView.prototype._set_name = function() {
      this._name = Ti.UI.createLabel({
        color: '#576996',
        font: {
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'Arial'
        },
        left: 5,
        top: 1,
        height: 30,
        width: 'auto',
        text: modelPlayer.get().name
      });
      return this._statusView.add(this._name);
    };

    StatusView.prototype._set_hp = function() {
      var text;
      this._hp = Ti.UI.createLabel({
        color: '#576996',
        font: {
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'Arial'
        },
        right: 5,
        top: 1,
        height: 30,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        width: 200
      });
      text = "HP" + modelPlayer.get().hp_remain + "/" + modelPlayer.get().hp_max;
      this._hp.setText(text);
      return this._statusView.add(this._hp);
    };

    StatusView.prototype._set_equipment = function() {
      this._equipment = Ti.UI.createLabel({
        color: '#576996',
        font: {
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'Arial'
        },
        left: 5,
        top: 31,
        height: 30,
        width: 'auto',
        text: "装備"
      });
      this._statusView.add(this._equipment);
      this._set_weapon();
      return this._set_shield();
    };

    StatusView.prototype._set_weapon = function() {
      var text;
      this._weapon = Ti.UI.createView({
        right: 5,
        top: 35,
        height: 30,
        width: 200
      });
      this._weapon_image = Ti.UI.createView({
        right: 1,
        height: 30,
        width: 30,
        backgroundImage: 'images/hammer.png'
      });
      this._weapon_text = Ti.UI.createLabel({
        color: '#576996',
        font: {
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'Arial'
        },
        right: 32,
        height: 30,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        width: 200
      });
      text = "最強のハンマー";
      this._weapon_text.setText(text);
      this._weapon.add(this._weapon_image);
      this._weapon.add(this._weapon_text);
      return this._statusView.add(this._weapon);
    };

    StatusView.prototype._set_shield = function() {
      var text;
      this._shield = Ti.UI.createView({
        right: 5,
        top: 60,
        height: 30,
        width: 200
      });
      this._shield_image = Ti.UI.createView({
        right: 1,
        height: 30,
        width: 30,
        backgroundImage: 'images/shield.png'
      });
      this._shield_text = Ti.UI.createLabel({
        color: '#576996',
        font: {
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'Arial'
        },
        right: 32,
        height: 30,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        width: 200
      });
      text = "いかれた盾";
      this._shield_text.setText(text);
      this._shield.add(this._shield_image);
      this._shield.add(this._shield_text);
      return this._statusView.add(this._shield);
    };

    StatusView.prototype.appendedTo = function(win) {
      return win.add(this._statusView);
    };

    StatusView.prototype.addObserver = function(event, func) {
      switch (event) {
        case "click":
          return this._clickObserver.push(func);
        default:
          return this._clickObserver.push(func);
      }
    };

    StatusView.prototype.onClick = function(e) {
      var f, _i, _len, _ref;
      if (this._pushed === false) {
        this._statusView.setHeight(100);
      } else {
        this._statusView.setHeight(30);
      }
      _ref = this._clickObserver;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        f(e, this._pushed);
      }
      return this._pushed = this._pushed ? false : true;
    };

    return StatusView;

  })();

  module.exports = StatusView;

}).call(this);
