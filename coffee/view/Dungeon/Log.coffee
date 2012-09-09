ModelFactory = require 'model/Factory'
class DungeonLogView
    constructor: ( logView )->
        @_logView = logView
        return @
    onStatusClick: ( e, pushed )->
        top = @_logView.getTop()
        if pushed is false
            @_logView.setTop ( top ) + 70
        else
            @_logView.setTop ( top ) - 70

    setText: ()->
        @modelLogsInstance = ModelFactory.get("LogsInstance")
        result = @modelLogsInstance.getCurrent( 3 )
        text = ''
        for t in result
            text = t.text + '\n' + text

        @_logView.setText text
    appendedTo: ( win )->
        win.add @_logView

module.exports = DungeonLogView
