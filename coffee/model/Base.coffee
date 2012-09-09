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
    get_time: ->
        if (@date)
            return @date.getTime()
        else
            @date = new Date()
            return @date.getTime()

module.exports = ModelBase
