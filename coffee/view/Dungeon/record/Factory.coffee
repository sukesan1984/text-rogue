RecordEnemy = require 'view/dungeon/record/Enemy'
RecordItem = require 'view/dungeon/record/Item'

Factory = new class
    get: ( row )->
        switch row.type
            when 1 then return new RecordEnemy( row )
            when 2 then return new RecordItem( row )
            else
                return new RecordEnemy( row )

module.exports = Factory
