define(["react"], function(React){
    "use strict";
    var Controls = React.createClass({
      
      
      componentDidMount : function(){
        this.setUpButtons();
        this.showPauseButton();  
      },
      showPlayButton : function(){
        $("#pauseButton").hide();
        $("#playButton").show();
      },
      showPauseButton : function(){
        $("#playButton").hide();
        $("#pauseButton").show();
      },
      setUpButtons : function(){
        $("#playButton").on('click',function(){this.showPauseButton();this.props.playButtonClicked();}.bind(this));
        $("#pauseButton").on('click',function(){this.showPlayButton();this.props.pauseButtonClicked();}.bind(this));
      },
      render: function(){
        return (
              <div className="buttons">
                <span id="playButton"><i className="fa fa-play fa-2x"></i></span>
                <span id="pauseButton"><i className="fa fa-pause fa-2x"></i></span>
              </div>
            );
          
      }
    })
    return Controls;
});