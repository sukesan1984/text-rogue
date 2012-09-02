(function() {
  var ModelBase, Player,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelBase = require('model/Base');

  Player = (function(_super) {

    __extends(Player, _super);

    function Player() {
      this.record = {
        name: "sukesan1984",
        hp_remain: 15,
        hp_max: 30
      };
    }

    Player.prototype.get = function() {
      return this.record;
    };

    return Player;

  })(ModelBase);

  module.exports = Player;

}).call(this);
