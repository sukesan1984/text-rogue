Records = require 'model/Records'
ModelFactory = new class
    constructor:->
        @_models = {}
    get: (name)->
        return @_models[name] if ( @_models[name] )
        switch name
            when "Records"
                @_models[name] = new Records()
            else
                @_models[name] = new Records()
               
        return @_models[name]

module.exports = ModelFactory
