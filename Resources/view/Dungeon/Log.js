(function() {
  var DungeonLogView, ModelFactory;

  ModelFactory = require('model/Factory');

  DungeonLogView = (function() {

    function DungeonLogView(logView) {
      this._logView = logView;
      return this;
    }

    DungeonLogView.prototype.onStatusClick = function(e, pushed) {
      var top;
      top = this._logView.getTop();
      if (pushed === false) {
        return this._logView.setTop(top + 70);
      } else {
        return this._logView.setTop(top - 70);
      }
    };

    DungeonLogView.prototype.setText = function() {
      var result, t, text, _i, _len;
      this.modelLogsInstance = ModelFactory.get("LogsInstance");
      result = this.modelLogsInstance.getCurrent(3);
      text = '';
      for (_i = 0, _len = result.length; _i < _len; _i++) {
        t = result[_i];
        text = t.text + '\n' + text;
      }
      return this._logView.setText(text);
    };

    DungeonLogView.prototype.appendedTo = function(win) {
      return win.add(this._logView);
    };

    return DungeonLogView;

  })();

  module.exports = DungeonLogView;

}).call(this);
