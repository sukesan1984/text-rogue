Chara = new class
    constructor: ->
        @record =
            name: "sukesan1984"
            hp_remain: 15
            hp_max: 30
    get: ->
        return @record

module.exports = Chara
