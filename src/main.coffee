#<< mcb80x/timeline
#<< mcb80x/lesson_plan
#<< ghk


# Script

scene('Action Potential Generation', 'ghk') ->

    interactive('Basic GHK walk-through') ->
        stage 'ghk'
        duration 10

        wait 500

        line 'ap_line1',
            "This is just a dummy script... the real version would walk the student through using the demo point by point",
            {'NaChannelVisible': true, 'KChannelVisible': false} # <-- settings for the stage

        play 'beginning'

        goal ->
            initial:
                transition: ->
                    if @stage.iterations >= 3
                        return 'continue'
            hint1:
                action: ->
                    line 'hint1', "This message will pop up after 10 seconds, just ignore it"

                transition: -> 'initial'

        line 'ap_line1',
            "That's it!"


$ ->

	t = new mcb80x.Timeline('#timeline', scenes.ghk)
	scenes.ghk.run()
