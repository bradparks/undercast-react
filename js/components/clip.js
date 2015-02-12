define(["react","api"], function(React, ApiMixin){
    "use strict";
    var Clip = React.createClass({
        mixins : [ApiMixin],
       render: function(){
         return <li className="clip grid">
         			<img className="col-1-4" height="25%" src={this.mediaUrl + "/clips-thumbs/"+this.props.showid+"/"+this.props.clipid+".jpg"} />
         			<ClipForm />


         			{this.props.clipid}
         		</li>
       }
    })
    return Clip;
} );