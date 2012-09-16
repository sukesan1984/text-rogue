Fields = require 'model/instance/Fields'
Enemy = require 'model/instance/Enemy'
PlayerInstance = require 'model/instance/Player'
ItemInstance = require 'model/instance/Item'
LogsInstance = require 'model/instance/Logs'
EnemyMaster = require 'model/master/Enemy'
EnemyMapMaster = require 'model/master/EnemyMap'
ItemMaster = require 'model/master/Item'
DungeonMaster = require 'model/master/Dungeon'
FieldSequencial = require 'model/FieldSequencial'
ModelFactory = new class
    constructor:->
        @_models = {}
        @_instances = []
    get: (name)->
        return @_models[name] if ( @_models[name] )
        switch name
            when "Fields"
                @_models[name] = new Fields()
            when "Enemy"
                @_models[name] = new Enemy()
            when "PlayerInstance"
                @_models[name] = new PlayerInstance()
                @_instances.push @_models[name]
            when "ItemInstance"
                @_models[name] = new ItemInstance()
                @_instances.push @_models[name]
            when "LogsInstance"
                @_models[name] = new LogsInstance()
                @_instances.push @_models[name]
            when "EnemyMaster"
                @_models[name] = new EnemyMaster()
            when "EnemyMapMaster"
                @_models[name] = new EnemyMapMaster()
            when "ItemMaster"
                @_models[name] = new ItemMaster()
            when "DungeonMaster"
                @_models[name] = new DungeonMaster()
            when "FieldSequencial"
                @_models[name] = new FieldSequencial()
            else
                @_models[name] = new Fields()
               
        return @_models[name]
    initiate: ->
        for instance in @_instances
            instance.initiate()

module.exports = ModelFactory
