(function() {
  var ETableViewRow, ModelFactory, RecordBase;

  ETableViewRow = require('ui/ETableViewRow');

  ModelFactory = require('model/Factory');

  RecordBase = (function() {

    function RecordBase(id) {
      var _this = this;
      this.row = new ETableViewRow();
      this.row.addEventListener('click', function(e) {
        var check;
        check = _this.row.getHasCheck();
        return _this.row.setHasCheck(!check);
      });
      this.model = ModelFactory.get("ModelRecords");
      this.id = id;
      this.message = Ti.UI.createLabel({
        color: '#576996',
        font: {
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'Arial'
        },
        left: 70,
        top: 2,
        height: 30,
        width: 200
      });
      this.row.add(this.message);
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
      return '';
    };

    RecordBase.prototype.setImage = function() {
      return this.photo.setBackgroundImage(this._backgroundImage());
    };

    return RecordBase;

  })();

  module.exports = RecordBase;

}).call(this);
