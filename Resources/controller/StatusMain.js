(function() {
  var StatusMainController, Styles, styles;

  Styles = require('view/layout/StatusMainStyle');

  styles = Styles.get();

  StatusMainController = (function() {

    function StatusMainController(titleStr) {
      this.win = Ti.UI.createWindow({
        title: titleStr,
        backgroundColor: "#FFFFFF"
      });
      this.win.hideNavBar();
      this.StatusMainView = Ti.UI.createView(styles['root']);
      this.name = Ti.UI.createLabel({
        color: '#576996',
        font: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        left: 0,
        top: 0,
        height: 30,
        width: 'auto',
        text: 'name'
      });
      this.hp = Ti.UI.createLabel(styles['hp']);
      this.lv = Ti.UI.createLabel(styles['lv']);
      this.StatusMainView.add(this.name);
      this.StatusMainView.add(this.hp);
      this.StatusMainView.add(this.lv);
      this.win.add(this.StatusMainView);
      return this.win;
    }

    return StatusMainController;

  })();

  module.exports = StatusMainController;

}).call(this);
