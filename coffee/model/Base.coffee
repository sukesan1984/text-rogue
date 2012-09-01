class ModelBase
    constructor:->
        return @
    execute: ->
        @db = Ti.Database.open('mydb')
        @db.execute.apply = Function.prototype.apply
        return @db.execute.apply(@db, arguments)
    close: ->
        @db.close()
module.exports = ModelBase
