(function() {
  var ModelChara, StatusView;

  ModelChara = require('model/Chara');

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
        backgroundColor: 'red',
        font: {
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'Arial'
        },
        left: 5,
        top: 1,
        height: 30,
        width: 'auto',
        text: ModelChara.get().name
      });
      return this._statusView.add(this._name);
    };

    StatusView.prototype._set_hp = function() {
      var text;
      this._hp = Ti.UI.createLabel({
        color: '#576996',
        backgroundColor: 'blue',
        font: {
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'Arial'
        },
        right: 0,
        top: 1,
        height: 30,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        width: 200
      });
      text = ModelChara.get().hp_remain + "/" + ModelChara.get().hp_max;
      this._hp.setText(text);
      return this._statusView.add(this._hp);
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
