(function() {
  var ETableViewRow, ModelFactory, RecordBase;

  ETableViewRow = require('ui/ETableViewRow');

  ModelFactory = require('model/Factory');

  RecordBase = (function() {

    function RecordBase(row) {
      var _this = this;
      this.row = new ETableViewRow();
      this.row.addEventListener('click', function(e) {
        return _this.onClick();
      });
      this.model = ModelFactory.get("ModelRecords");
      this.modelLogsInstance = ModelFactory.get("LogsInstance");
      this.id = row.id;
      this.type = row.type;
      this._clickObserver = [];
      this.message = Ti.UI.createLabel({
        color: '#576996',
        font: {
          fontSize: 12,
          fontWeight: 'bold',
          fontFamily: 'Arial'
        },
        left: 70,
        top: 2,
        height: 30,
        width: 300
      });
      this.row.add(this.message);
      this.right_bottom = Ti.UI.createLabel({
        color: '#576996',
        font: {
          fontSize: 12,
          fontWeight: 'bold',
          fontFamily: 'Arial'
        },
        right: 1,
        bottom: 1,
        height: 30,
        width: 50
      });
      this.row.add(this.right_bottom);
      this.photo = Ti.UI.createView({
        top: 5,
        left: 10,
        width: 50,
        height: 50
      });
      this.setImage();
      this.row.add(this.photo);
      return this;
    }

    RecordBase.prototype.addObserver = function(event, func) {
      switch (event) {
        case "click":
          return this._clickObserver.push(func);
        default:
          return this._clickObserver.push(func);
      }
    };

    RecordBase.prototype.setMessage = function(message) {
      return this.message.setText(message);
    };

    RecordBase.prototype.setRightBottomText = function(text) {
      return this.right_bottom.setText(text);
    };

    RecordBase.prototype.onClick = function(e) {
      var f, _i, _len, _ref, _results;
      _ref = this._clickObserver;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        _results.push(f(e, this));
      }
      return _results;
    };

    RecordBase.prototype.get = function() {
      return this.row.getObject();
    };

    RecordBase.prototype.getName = function() {
      return this.row.name;
    };

    RecordBase.prototype.action = function() {
      if (!this.row.getHasCheck()) {

      }
    };

    RecordBase.prototype._backgroundImage = function() {
      return 'images/floor/ashiato.png';
    };

    RecordBase.prototype.setImage = function() {
      return this.photo.setBackgroundImage(this._backgroundImage());
    };

    return RecordBase;

  })();

  module.exports = RecordBase;

}).call(this);
