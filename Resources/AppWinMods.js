(function() {
  var helloStr;

  helloStr = "Hello %s.";

  exports.init = function(titleStr) {
    var label, win;
    win = Ti.UI.createWindow({
      title: titleStr,
      backgroundColor: "#FFFFFF"
    });
    label = Ti.UI.createLabel({
      text: titleStr,
      color: "#666666",
      backgroundColor: "#FFFFFF"
    });
    label.addEventListener("click", function() {
      alert(String.format(helloStr, titleStr));
    });
    win.add(label);
    return win;
  };

}).call(this);
