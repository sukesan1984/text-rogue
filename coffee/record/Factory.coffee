RecordEnemy = require 'record/Enemy'
RecordItem = require 'record/Item'

Factory = new class
    get: ( parent, id, type )->
        switch type
            when 1 then return new RecordEnemy( parent )
            when 2 then return new RecordItem( parent )
            else
                return new RecordEnemy( parent )

module.exports = Factory
