# ----------------------------------------------------
# Imports (using coffee-toaster directives)
# ----------------------------------------------------

#<< mcb80x/util
#<< mcb80x/bindings
#<< mcb80x/oscilloscope
#<< mcb80x/sim/linear_compartment
#<< mcb80x/properties
#<< mcb80x/sim/stim
#<< mcb80x/lesson_plan


class GHKDemo extends mcb80x.ViewModel

    constructor: ->
        @duration = ko.observable(10.0)

    # ----------------------------------------------------
    # Set up the simulation
    # ----------------------------------------------------

    init: ->

        # Build an object that will compute the GHK equation whenever
        # any of its properties change
        @ghk = mcb80x.sim.GHK(10)

        # ------------------------------------------------------
        # Bind variables
        # ------------------------------------------------------

        @inheritProperties(@ghk)


        scaleMapping = d3.scale.linear().domain([50, 400]).range([0.3, 1.0])
        # scaleMapping = (selector) ->

        #     bbox = d3.select(selector).node().getBBox()
        #     console.log('bbox: ' + bbox)
        #     anchor = [bbox.x, bbox.y + bbox.height]
        #     console.log('anchor:' + anchor)
        #     mapping = (val) ->
        #         s = cScale(val)
        #         transform = ''
        #         transform += 'translate(' + anchor[0] + ', ' + anchor[1] + ') '

        #         transform += 'scale(' + s + ') '
        #         transform += 'translate(' + (-1 * anchor[0]) + ', ' + (-1 * anchor[1]) + ') '

        #         return transform


        svgbind.bindScale('#KExtraSymbol', @K_extra, scaleMapping, 'sw')
        svgbind.bindScale('#NaExtraSymbol', @Na_extra, scaleMapping, 'sw')
        svgbind.bindScale('#KIntraSymbol', @K_intra, scaleMapping, 'sw')
        svgbind.bindScale('#NaIntraSymbol', @Na_intra, scaleMapping, 'sw')

        @E_m_mv = ko.computed( =>
            (1000.0 * @E_m()).toFixed(0)
        )
        svgbind.bindText('#EmText', @E_m_mv, true)

        # Set the html-based Knockout.js bindings in motion
        # This will allow templated 'data-bind' directives to automagically control the simulation / views
        ko.applyBindings(this)

        # # Float property setting divs over a rect in the svg
        util.floatOverRect('#art svg', '#KExtraSliderArea', '#K_extra_pane')
        util.floatOverRect('#art svg', '#KIntraSliderArea', '#K_intra_pane')
        util.floatOverRect('#art svg', '#NaExtraSliderArea', '#Na_extra_pane')
        util.floatOverRect('#art svg', '#NaIntraSliderArea', '#Na_intra_pane')


    play: ->

    stop: ->

    # Main initialization function; triggered after the SVG doc is
    # loaded
    svgDocumentReady: (xml) ->

        # Attach the SVG to the DOM in the appropriate place
        importedNode = document.importNode(xml.documentElement, true)
        d3.select('#art').node().appendChild(importedNode)
        d3.select('#art').transition().style('opacity', 1.0).duration(1000)

        @init()


    show: ->
        console.log('showing ghk')
        d3.xml('svg/membrane.svg', 'image/svg+xml', (xml) => @svgDocumentReady(xml))

    hide: ->
        @runSimulation = false
        d3.select('#art').transition().style('opacity', 0.0).duration(1000)


root = window ? exports
root.stages.ghk = new GHKDemo()
