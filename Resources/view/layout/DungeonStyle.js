(function() {

  exports.get = function() {
    var style;
    style = {
      log: {
        color: '#FFFFFF',
        left: 0,
        top: 30,
        rowHeight: 60,
        height: 300
      },
      status: {
        height: 30,
        top: 0,
        left: 0,
        right: 0,
        children: []
      },
      go: {
        systemButton: Ti.UI.iPhone.SystemButton.DONE,
        height: 50,
        width: 300,
        bottom: 10,
        title: "GO"
      }
    };
    return style;
  };

}).call(this);
