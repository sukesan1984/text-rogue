(function() {
  var StatusController;

  StatusController = (function() {

    function StatusController(titleStr) {
      this.win = Ti.UI.createWindow({
        title: titleStr,
        backgroundColor: "#FFFFFF"
      });
      this.label = Ti.UI.createLabel({
        text: titleStr,
        color: "#666666",
        backgroundColor: "#FFFFFF"
      });
      this.label.addEventListener("click", function() {
        var helloStr;
        helloStr = "Hello %s.";
        alert(String.format(helloStr, titleStr));
      });
      this.win.add(this.label);
      return this.win;
    }

    return StatusController;

  })();

  module.exports = StatusController;

}).call(this);
