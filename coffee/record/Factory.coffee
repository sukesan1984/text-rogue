RecordEnemy = require 'record/Enemy'
RecordItem = require 'record/Item'

Factory = new class
    get: ( parent, id, type )->
        switch type
            when 1 then return new RecordEnemy( parent, id )
            when 2 then return new RecordItem( parent, id )
            else
                return new RecordEnemy( parent, id )

module.exports = Factory
