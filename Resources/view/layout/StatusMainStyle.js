(function() {

  exports.get = function() {
    var style;
    style = {
      root: {
        color: '#FFFFFF',
        left: 0,
        top: 44,
        height: 388,
        width: 380
      },
      name: {
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
      },
      hp: {
        color: '#576996',
        font: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        left: 0,
        top: 30,
        height: 30,
        width: 'auto',
        text: 'hp'
      },
      lv: {
        color: '#576996',
        font: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        left: 0,
        top: 60,
        height: 30,
        width: 'auto',
        text: 'lv'
      }
    };
    return style;
  };

}).call(this);
