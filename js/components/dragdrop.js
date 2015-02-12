define(["react","api"], function(React, ApiMixin){
    "use strict";
    var DragDrop = React.createClass({
        mixins : [ApiMixin],
        getInitialState: function() {
        return {progress : 0,displayProgress : 'hide'};
      },
       handleDrop : function(event){
          event.preventDefault();
          event.stopPropagation();
          var files = event.dataTransfer.files;
          var formData = new FormData();
          for (var i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
          }
          var xhr = new XMLHttpRequest();
          xhr.upload.addEventListener("progress", this.progressUpload, false);
          xhr.upload.addEventListener("load", this.progressFinished, false);
          xhr.upload.addEventListener("error", function(evt){console.log(evt);}, false);
          xhr.upload.addEventListener("abort", function(){console.log('abort')}, false);
          xhr.open('POST', this.apiUrl+"/show/"+this.props.showid+"/clip");
          xhr.send(formData);
       },
       progressUpload : function(evt){
          if (evt.lengthComputable) {
            if(this.state.displayProgress == 'hide'){
              this.setState({displayProgress : 'show margin-auto'});
            }
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            this.setState({progress : percentComplete});
          }
          
       },
       progressFinished : function(evt){
          this.setState({progress : 0});
          this.setState({displayProgress : 'hide'});
       },
       render: function(){
        var titleText = this.props.showname != '' ? this.props.showname : "Please select a game";
        var dragDrop  = this.props.showname != '' ? <div onDragOver={function(){return false;}} onDragEnd={function(){return false;}} onDrop={this.handleDrop} className="file-upload-boundary">
                    <i className="fa fa-plus fa-3x">&nbsp;Add files here</i>
                    <progress id="uploadprogress" className={this.state.displayProgress} min="0" max="100" value={this.state.progress}></progress>
                  </div> : '';
        return (<div>
                  <h2>{titleText}</h2>
                  {dragDrop}
          </div>);
          
      }
    })
    return DragDrop;
} );