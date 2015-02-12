define(["react","api", "jsx!components/clips/clip"], function(React, ApiMixin,Clip){
    "use strict";
    var ClipList = React.createClass({
        getInitialState : function(){
          modal_video_src : ''
        },
       playVideo : function(clip_id){

       },
       
       render: function(){
        var clipsList = this.props.clips.map(function(obj){
          return <Clip key={obj.id+"clip"} clipid={obj.id}  showid={this.props.showid} imageClicked={this.playVideo}/>
        }.bind(this));
        return (<div>
                <h3>Clips Uploaded &nbsp;<i onClick={this.props.reloadClips} className="clip-refresh fa fa-refresh"></i></h3>
                <ul className="nine columns">
                    {clipsList}    
                </ul>
                <Video ref="videoElement" videoControls="" videoMuted="" videoEnded="" videoLoaded="" data={{clip_id : "mobile-video",mp4_src : this.state.modal_video_src}} />
                     
          </div>);
          
      }
    })
    return ClipList;
} );