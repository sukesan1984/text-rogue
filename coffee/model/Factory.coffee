Records = require 'model/instance/Fields'
Enemy = require 'model/instance/Enemy'
Player = require 'model/instance/Player'
EnemyMaster = require 'model/master/Enemy'
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
            when "EnemyMaster"
                @_models[name] = new EnemyMaster()
            when "FieldSequencial"
                @_models[name] = new FieldSequencial()
            else
                @_models[name] = new Records()
               
        return @_models[name]

module.exports = ModelFactory
