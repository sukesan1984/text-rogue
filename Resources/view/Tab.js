(function() {
  var AppTabMods;

  AppTabMods = (function() {

    function AppTabMods() {
      this.tabGroup = Ti.UI.createTabGroup();
    }

    AppTabMods.prototype.appendTabs = function(params) {
      var param, self, _i, _len;
      self = this;
      for (_i = 0, _len = params.length; _i < _len; _i++) {
        param = params[_i];
        self.tabGroup.addTab(Ti.UI.createTab(param));
      }
    };

    AppTabMods.prototype.open = function(defaultTabNums) {
      var self;
      if (defaultTabNums == null) {
        defaultTabNums = 0;
      }
      self = this;
      self.tabGroup.setActiveTab(defaultTabNums);
      self.tabGroup.open();
    };

    AppTabMods.prototype.close = function() {
      return this.tabGroup.close();
    };

    return AppTabMods;

  })();

  module.exports = AppTabMods;

}).call(this);
