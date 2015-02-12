define(["react","api","jsx!components/video","jsx!components/controls","jquery"], function(React,ApiMixin,Video,Controls,$){
    "use strict";
    var ReelMobileSafari = React.createClass({
    	mixins : [ApiMixin],
      
      getInitialState: function() {
        return {data: {content :{}}, progress : "1%",mediaPaused : false};
      },
      
      calculatePercentageFinished : function(){
          var percentage = this.refs.videoElement.getCurrentTime() / this.refs.videoElement.getDuration() * 100;
          if(percentage >= 100){
            
          }
          var percentageString = percentage + "%";
          this.setState({progress : percentageString});
      },
      videoLoaded : function(clip_id){
        console.log("video loaded")
        
      },
      videoEnded : function(){
        this.refs.videoElement.resetVideo();
        this.refs.controls.showPlayButton();
        
      }, 
      pauseReel : function(){  
        this.refs.videoElement.pauseVideo();
      },
      playReel : function(){
        this.refs.videoElement.playVideo();
      },
    	componentDidMount : function(){
        this.resizeVideoContainer();
        this.refs.videoElement.setSrc();
        this.refs.controls.showPlayButton();
        setInterval(this.calculatePercentageFinished,30);
        window.onresize = this.resizeVideoContainer;
      },
      resizeVideoContainer : function(){
        console.log('resizing');
        var domNode = this.getDOMNode();
        var firstVideoWidth = $(domNode).find('video:visible').first().outerWidth();
        $(".video-player-container").css('height',Math.ceil(firstVideoWidth * (9/16)));
      },
      render: function(){
          
          return (
              <div className="reel">
          			<h1>{this.props.data.show_name}</h1>
                <div className="video-player-container">
                    <Video ref="videoElement" videoControls="controls='false'" videoMuted="" videoEnded={this.videoEnded} videoLoaded={this.videoLoaded} data={{clip_id : "mobile-video",mp4_src : this.mediaUrl+"/posts-videos/"+this.props.data.username+"/"+this.props.data.id+".m4v"}} />
                     <div className="clear"></div>
                </div>
                <div className="controls">
                  <Controls ref="controls" progress={this.state.progress} pauseButtonClicked={this.pauseReel} playButtonClicked={this.playReel} />
                 
                  <div className="progress-bar">
                    <div className="indicator" style={{"width" : this.state.progress}}><i style={{"float" : "right"}} className="fa fa-circle"></i> </div>
                  </div>
                </div>
               <h2>{this.props.data.content.description}</h2>  
          </div>
          );
      }
    })
    return ReelMobileSafari;
} );
