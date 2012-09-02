(function() {
  var ItemController;

  ItemController = (function() {

    function ItemController(titleStr) {
      this.win = Ti.UI.createWindow({
        title: titleStr,
        backgroundColor: '#FFFFFF'
      });
      this.rows = [
        {
          title: 'Row1',
          hasChild: true
        }, {
          title: 'Row2',
          hasDetail: true
        }, {
          title: 'Row3',
          hasCheck: true
        }, {
          title: 'Row4'
        }
      ];
      this.tableview = Ti.UI.createTableView({
        data: this.rows
      });
      this.tableview.addEventListener('click', function(e) {
        var index, row, rowdata, section;
        index = e.index;
        section = e.section;
        row = e.rows;
        return rowdata = e.rowData;
      });
      this.win.add(this.tableview);
      return this.win;
    }

    return ItemController;

  })();

  module.exports = ItemController;

}).call(this);
