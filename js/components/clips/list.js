define(["react","api", "jsx!components/clips/clip"], function(React, ApiMixin,Clip){
    "use strict";
    var ClipList = React.createClass({
       
       
       render: function(){
        var clipsList = this.props.clips.map(function(obj){
          return <Clip key={obj.id+"clip"} data={obj}  showid={this.props.showid} />
        }.bind(this));
        return (<div>
                <h3>Clips Uploaded <i onClick={this.props.reloadClips} className="clip-refresh fa fa-refresh"></i></h3>
                <ul className="nine columns">
                    {clipsList}    
                </ul>
          </div>);
          
      }
    })
    return ClipList;
} );