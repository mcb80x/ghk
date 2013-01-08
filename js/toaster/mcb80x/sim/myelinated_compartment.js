(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  mcb80x.sim.MyelinatedLinearCompartmentModelSim = (function(_super) {

    __extends(MyelinatedLinearCompartmentModelSim, _super);

    function MyelinatedLinearCompartmentModelSim(nCompartments, nNodes) {
      var c, interNodeDistance, n, _i, _j, _k, _len, _len1, _ref, _ref1;
      this.nCompartments = nCompartments;
      this.nNodes = nNodes;
      interNodeDistance = (this.nCompartments - this.nNodes) / (this.nNodes - 1);
      this.nodeIndices = [];
      this.compartments = [];
      _ref = this.nodeIDs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        this.compartments.push(new HHSimulationRK4());
        this.nodeIndices.push(this.compartments.length - 1);
        for (c = _j = 0; 0 <= interNodeDistance ? _j <= interNodeDistance : _j >= interNodeDistance; c = 0 <= interNodeDistance ? ++_j : --_j) {
          this.compartments.push(new PassiveMembrane());
        }
      }
      this.compartments.push(new HHSimulationRK4());
      this.nodeIndices.push(this.compartments.length - 1);
      this.t = this.compartments[0].t;
      this.R_a = this.prop(10.0);
      this.v = (function() {
        var _k, _len1, _ref1, _results;
        _ref1 = this.cIDs;
        _results = [];
        for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
          c = _ref1[_k];
          _results.push(0.0);
        }
        return _results;
      }).call(this);
      this.I = (function() {
        var _k, _len1, _ref1, _results;
        _ref1 = this.cIDs;
        _results = [];
        for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
          c = _ref1[_k];
          _results.push(0.0);
        }
        return _results;
      }).call(this);
      _ref1 = this.cIDs;
      for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
        c = _ref1[_k];
        this['v' + c] = this.prop(0.0);
        this['I' + c] = this.prop(0.0);
      }
      this.unpackArrays();
    }

    return MyelinatedLinearCompartmentModelSim;

  })(mcb80x.sim.LinearCompartmentModel);

  mcb80x.sim.MyelinatedLinearCompartmentModel = function(c, n) {
    return new mcb80x.sim.MyelinatedLinearCompartmentModelSim(c, n);
  };

}).call(this);
