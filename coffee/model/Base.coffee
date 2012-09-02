class ModelBase
    constructor:->
        return @
    execute: ->
        @db = Ti.Database.open('mydb')
        @db.execute.apply = Function.prototype.apply
        return @db.execute.apply(@db, arguments)
    close: ->
        @db.close()
    get_rand: (max) ->
        rand = parseInt(Math.random()*max)
module.exports = ModelBase
