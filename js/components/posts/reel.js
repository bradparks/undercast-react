define(["react","api","jsx!components/video","jsx!components/audio","jsx!components/controls","jquery"], function(React,ApiMixin,Video,Audio,Controls,$){
    "use strict";
    var Reel = React.createClass({
    	mixins : [ApiMixin],
      audioPlayer : '',
      videoComponent : '',
      playingIndex : 0,
      loadingIndex : 0, 
      checkCommandInterval : '',
      checkCommandIndex : 0,
      currentRate : 1,
      getInitialState: function() {
        return {data: {content :{}}, progress : "1%",mediaPaused : false};
      },
      setUpVideoPlayer : function(){
        if(this.props.data.content.clips){
          this.loadNextVideo();
        }
        
      }, 
      loadNextVideo : function(){
        this.getVideoByIndex(this.loadingIndex).setSrc();
        
      },
      videoLoaded : function(clip_id){
        if(this.loadingIndex == 0){
          this.checkMediaFiles();
          this.resizeVideoContainer();
        }
        this.loadingIndex++;
        if(this.loadingIndex < this.props.data.content.clips.length){
          this.loadNextVideo();
        }
        
      },
      videoEnded : function(){
        var currentVideo = this.getVideoByIndex(this.playingIndex);
        currentVideo.hideVideo();
        currentVideo.resetVideo();
        this.playingIndex++;
        if(this.playingIndex < this.props.data.content.clips.length){
          this.getVideoByIndex(this.playingIndex).playVideo();
          this.getVideoByIndex(this.playingIndex).setPlaybackRate(this.currentRate);
        }else{
          this.playingIndex = 0;
          this.getVideoByIndex(this.playingIndex).showVideo();
        }
        
      }, 
      getVideoByIndex : function(index){
        var clipRef = "clip-"+this.props.data.content.clips[index];
        return this.refs[clipRef];
      },
      checkMediaFiles : function(){
        if(this.refs.audioPlayer.getAudioIsReady() && this.getVideoByIndex(this.playingIndex).getVideoIsReady()){
          this.playReel();
          this.startCommandInterval();
        }
        
      },
      checkCommands : function(){       
       var currentCommand = this.props.data.content.commands[this.checkCommandIndex];
        if(currentCommand && this.refs.audioPlayer.getCurrentTime() > currentCommand.time){
          this.currentRate = currentCommand.rate;
          this.getVideoByIndex(this.playingIndex).setPlaybackRate(this.currentRate);
          this.checkCommandIndex++;
        }
        this.calculatePercentageFinished();
        
      },
      startCommandInterval : function(){
        this.checkCommandInterval = setInterval(this.checkCommands,30);
      },
      calculatePercentageFinished : function(){
          var percentage = this.refs.audioPlayer.getCurrentTime() / this.refs.audioPlayer.getDuration() * 100;
          if(percentage >= 100){
            clearInterval(this.checkCommandInterval);
          }
          var percentageString = percentage + "%";
          this.setState({progress : percentageString});
      },
      pauseReel : function(){  
        this.getVideoByIndex(this.playingIndex).pauseVideo();
        this.refs.audioPlayer.pauseSound();
      },
      playReel : function(){
        this.getVideoByIndex(this.playingIndex).playVideo();
        this.refs.audioPlayer.playSound();
      },
    	componentDidMount : function(){
        this.setUpVideoPlayer();
        this.resizeVideoContainer();
        window.onresize = this.resizeVideoContainer;
      },
      resizeVideoContainer : function(){
        console.log('resizing');
        var domNode = this.getDOMNode();
        var firstVideoWidth = $(domNode).find('video:visible').first().outerWidth();
        $(".video-player-container").css('height',Math.ceil(firstVideoWidth * (9/16)));
      },
      render: function(){
          var clips = {};
          var reversedClips = this.props.data.content.clips.slice(0);
          reversedClips.reverse().forEach(function(clip) {
            clips['clip-' + clip] = <Video ref={"clip-"+clip} videoControls="" videoMuted="muted" videoEnded={this.videoEnded} videoLoaded={this.videoLoaded} data={{clip_id : clip,mp4_src : this.mediaUrl+"/clips-large/"+this.props.data.showid+"/"+clip+".m4v"}} />;
          }.bind(this));
          return (
              <div className="reel">
          			<h1>{this.props.data.show_name}</h1>
                <div className="video-player-container">
                    {clips}
                     <div className="clear"></div>
                </div>
                <div className="controls">
                  <Controls progress={this.state.progress} pauseButtonClicked={this.pauseReel} playButtonClicked={this.playReel} />
                 
                  <div className="progress-bar">
                    <div className="indicator" style={{"width" : this.state.progress}}><i style={{"float" : "right"}} className="fa fa-circle"></i> </div>
                  </div>
                </div>
               <h2>{this.props.data.content.description}</h2>
              <Audio ref="audioPlayer" audioUrl={this.mediaUrl+"/reel-audio/"+this.props.data.id+".m4a"} audioLoaded={this.checkMediaFiles} />
                
          </div>
          );
      }
    })
    return Reel;
} );