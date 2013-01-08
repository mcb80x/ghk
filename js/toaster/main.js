(function() {

  scene('Action Potential Generation', 'ghk')(function() {
    return interactive('Basic GHK walk-through')(function() {
      stage('ghk');
      duration(10);
      wait(500);
      line('ap_line1', "This is just a dummy script... the real version would walk the student through using the demo point by point", {
        'NaChannelVisible': true,
        'KChannelVisible': false
      });
      play('beginning');
      goal(function() {
        return {
          initial: {
            transition: function() {
              if (this.stage.iterations >= 3) {
                return 'continue';
              }
            }
          },
          hint1: {
            action: function() {
              return line('hint1', "This message will pop up after 10 seconds, just ignore it");
            },
            transition: function() {
              return 'initial';
            }
          }
        };
      });
      return line('ap_line1', "That's it!");
    });
  });

  $(function() {
    var t;
    t = new mcb80x.Timeline('#timeline', scenes.ghk);
    return scenes.ghk.run();
  });

}).call(this);
