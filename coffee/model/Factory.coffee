Records = require 'model/instance/Fields'
Enemy = require 'model/instance/Enemy'
Player = require 'model/instance/Player'
ItemInstance = require 'model/instance/Item'
EnemyMaster = require 'model/master/Enemy'
ItemMaster = require 'model/master/Item'
FieldSequencial = require 'model/FieldSequencial'
ModelFactory = new class
    constructor:->
        @_models = {}
    get: (name)->
        return @_models[name] if ( @_models[name] )
        switch name
            when "Records"
                @_models[name] = new Records()
            when "Enemy"
                @_models[name] = new Enemy()
            when "Player"
                @_models[name] = new Player()
            when "ItemInstance"
                @_models[name] = new ItemInstance()
            when "EnemyMaster"
                @_models[name] = new EnemyMaster()
            when "ItemMaster"
                @_models[name] = new ItemMaster()
            when "FieldSequencial"
                @_models[name] = new FieldSequencial()
            else
                @_models[name] = new Records()
               
        return @_models[name]

module.exports = ModelFactory
