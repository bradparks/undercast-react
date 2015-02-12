define(["react","api", "jsx!components/clips/form"], function(React, ApiMixin,ClipForm){
    "use strict";
    var Clip = React.createClass({
        mixins : [ApiMixin],
        getInitialState : function(){
            return {showForm : 'hide', buttonText:"Edit"}
        },
        toggleForm : function(){
            if(this.state.showForm == 'hide'){
                this.setState({showForm : 'show',buttonText:"Hide"});
            }else{
                this.setState({showForm : 'hide',buttonText:"Edit"});
            }
        },
        imageClicked : function(){
            console.log("image clicked "+this.props.clipid);

        },
       render: function(){
         return <li className="clip grid">
                    <h4>CLIP: {this.props.data.id} <button ref="editForm" className="push-right" onClick={this.toggleForm}>{this.state.buttonText}</button></h4>
                    <div className="col-1-4 image-container" onClick={this.imageClicked}> 
                        <i className="fa fa-play play-button fa-4x"></i>
         			    <img width="100%" src={this.mediaUrl + "/clips-thumbs/"+this.props.showid+"/"+this.props.data.id+".jpg"} />
         			</div>
                    <div className="col-8-12">
                        <ClipForm showForm={this.state.showForm} showid={this.props.showid} data={this.props.data} />
                    </div>
         		</li>
       }
    })
    return Clip;
} );