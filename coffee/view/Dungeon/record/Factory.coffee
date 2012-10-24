RecordEnemy = require 'view/dungeon/record/Enemy'
RecordItem = require 'view/dungeon/record/Item'
RecordFloor = require 'view/dungeon/record/Floor'
RecordSelectDungeon = require 'view/dungeon/record/SelectDungeon'
RecordNextTurn = require 'view/dungeon/record/NextTurn'
RecordBase = require 'view/dungeon/record/Base'

DungeonRecordFactory = new class
    get: ( row )->
        switch row.type
            when 1 then return new RecordEnemy( row )
            when 2 then return new RecordItem( row )
            when 3 then return new RecordFloor( row )
            when 4 then return new RecordSelectDungeon( row )
            when 5 then return new RecordNextTurn( row )
            when 99 then return new RecordBase( row )
            else
                return new RecordEnemy( row )

module.exports = DungeonRecordFactory
