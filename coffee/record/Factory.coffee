RecordEnemy = require 'record/Enemy'
RecordItem = require 'record/Item'

Factory = new class
    get: ( id, type )->
        switch type
            when 1 then return new RecordEnemy( id )
            when 2 then return new RecordItem( id )
            else
                return new RecordEnemy( id )

module.exports = Factory
