(function() {
  var GHKDemo, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  GHKDemo = (function(_super) {

    __extends(GHKDemo, _super);

    function GHKDemo() {
      this.duration = ko.observable(10.0);
    }

    GHKDemo.prototype.init = function() {
      var scaleMapping,
        _this = this;
      this.ghk = mcb80x.sim.GHK(10);
      this.inheritProperties(this.ghk);
      scaleMapping = d3.scale.linear().domain([50, 400]).range([0.3, 1.0]);
      svgbind.bindScale('#KExtraSymbol', this.K_extra, scaleMapping, 'sw');
      svgbind.bindScale('#NaExtraSymbol', this.Na_extra, scaleMapping, 'sw');
      svgbind.bindScale('#KIntraSymbol', this.K_intra, scaleMapping, 'sw');
      svgbind.bindScale('#NaIntraSymbol', this.Na_intra, scaleMapping, 'sw');
      this.E_m_mv = ko.computed(function() {
        return (1000.0 * _this.E_m()).toFixed(0);
      });
      svgbind.bindText('#EmText', this.E_m_mv, true);
      ko.applyBindings(this);
      util.floatOverRect('#art svg', '#KExtraSliderArea', '#K_extra_pane');
      util.floatOverRect('#art svg', '#KIntraSliderArea', '#K_intra_pane');
      util.floatOverRect('#art svg', '#NaExtraSliderArea', '#Na_extra_pane');
      return util.floatOverRect('#art svg', '#NaIntraSliderArea', '#Na_intra_pane');
    };

    GHKDemo.prototype.play = function() {};

    GHKDemo.prototype.stop = function() {};

    GHKDemo.prototype.svgDocumentReady = function(xml) {
      var importedNode;
      importedNode = document.importNode(xml.documentElement, true);
      d3.select('#art').node().appendChild(importedNode);
      d3.select('#art').transition().style('opacity', 1.0).duration(1000);
      return this.init();
    };

    GHKDemo.prototype.show = function() {
      var _this = this;
      console.log('showing ghk');
      return d3.xml('svg/membrane.svg', 'image/svg+xml', function(xml) {
        return _this.svgDocumentReady(xml);
      });
    };

    GHKDemo.prototype.hide = function() {
      this.runSimulation = false;
      return d3.select('#art').transition().style('opacity', 0.0).duration(1000);
    };

    return GHKDemo;

  })(mcb80x.ViewModel);

  root = typeof window !== "undefined" && window !== null ? window : exports;

  root.stages.ghk = new GHKDemo();

}).call(this);
