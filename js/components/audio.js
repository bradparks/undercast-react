define(["react","howler"], function(React){
    "use strict";
    var Audio = React.createClass({
      audioPlayer : '',
      isReady : false,
      
      componentDidMount : function(){
       this.audioPlayer = new Howl({
          urls : [this.props.audioUrl],
          onend : function(){console.log("AUDIO FINISHED")},
          onload : function(){this.isReady = true;this.props.audioLoaded();}.bind(this)
       });
      },

      componentDidUpdate : function(){
        
      },
      getAudioIsReady : function(){
        return this.isReady;
      },
      getDuration : function(){
        return this.audioPlayer._duration;
      },
      getCurrentTime : function(){
        return this.audioPlayer.pos();
      },
      playSound : function(){
        this.audioPlayer.play();
      },
      pauseSound : function(){
        this.audioPlayer.pause();
      },
    
      render: function(){
        return (<div></div>);
          
      }
    })
    return Audio;
} );