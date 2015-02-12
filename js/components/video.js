define(["react"], function(React){
    "use strict";
    var Video = React.createClass({
      video : '',
      getInitialState : function(){
        return {mp4_src: ''};
      },
      componentDidMount : function(){
        var videoId = "clip"+this.props.data.clip_id;
        this.video = document.getElementById(videoId);
        this.video.addEventListener('ended',this.props.videoEnded);
        this.video.addEventListener('canplay', this.props.videoLoaded.bind(null,this.props.data.clip_id)); 
      },

      setSrc : function(){
        
        if(this.state.mp4_src != this.props.data.mp4_src){
          this.setState({mp4_src : this.props.data.mp4_src},function(){this.video.load();}.bind(this));
        }
        
        
      },
      getVideoIsReady : function(){
         return this.video.readyState >= 3;
      },
      playVideo : function(){
        this.video.play();
      },
      pauseVideo : function(){
        this.video.pause();
      },
      resetVideo : function(){
        this.video.currentTime = 0;
      },
      setPlaybackRate : function(rate){
        this.video.playbackRate = rate;
      },
      getDuration : function(){
         
        return this.video.duration;
      },
      getCurrentTime : function(){
        return this.video.currentTime;
      },
      loadVideo : function(){
        this.video.load();
      },
      hideVideo : function(){
        $(this.video).hide();
      },
      showVideo : function(){
        $(this.video).show();
      },
      render: function(){
        return (
        	<video refs="videoPlayer" id={"clip"+this.props.data.clip_id} muted={this.props.videoMuted} >
        		<source type="video/mp4" src={this.state.mp4_src} />
        	</video>);
          
      }
    })
    return Video;
} );