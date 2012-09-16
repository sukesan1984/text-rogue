RecordEnemy = require 'view/dungeon/record/Enemy'
RecordItem = require 'view/dungeon/record/Item'
RecordFloor = require 'view/dungeon/record/Floor'

DungeonRecordFactory = new class
    get: ( row )->
        switch row.type
            when 1 then return new RecordEnemy( row )
            when 2 then return new RecordItem( row )
            when 3 then return new RecordFloor( row )
            else
                return new RecordEnemy( row )

module.exports = DungeonRecordFactory
