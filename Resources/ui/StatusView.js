(function() {
  var StatusView;

  StatusView = (function() {

    function StatusView() {
      var _this = this;
      this._statusView = Ti.UI.createView({
        backgroundColor: 'red',
        height: 30,
        top: 0,
        left: 0,
        right: 0
      });
      this._pushed = false;
      this._clickObserver = [];
      this._statusView.addEventListener('click', function(e) {
        return _this.onClick(e);
      });
      return this;
    }

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
