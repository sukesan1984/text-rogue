(function() {
  var RecordBase;

  RecordBase = (function() {

    function RecordBase(rowNum) {
      var _this = this;
      this.row = Ti.UI.createTableViewRow();
      this.row.addEventListener('click', function(e) {
        var check;
        check = _this.row.getHasCheck();
        return _this.row.setHasCheck(!check);
      });
      this.row.selectedBackgroundColor = '#fff';
      this.row.height = 60;
      this.row.className = 'datarow';
      this.row.name = "row" + rowNum;
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
      this.message.rowNum = rowNum;
      this.row.add(this.message);
      this.photo = Ti.UI.createView({
        top: 5,
        left: 10,
        width: 50,
        height: 50
      });
      this.photo.rowNum = rowNum;
      this.setImage();
      this.row.add(this.photo);
      return this;
    }

    RecordBase.prototype.getRow = function() {
      return this.row;
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
