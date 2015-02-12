define(["react","api","jsx!components/posts/reel", "jsx!components/posts/reel-mobile-safari","jsx!components/loading"], function(React,ApiMixin,Reel,ReelMobileSafari,Loading){
    "use strict";
    var Post = React.createClass({
    	mixins : [ApiMixin],
      getInitialState: function() {
        return {data: {content :{}, content_type : 'none'
      }};
      },
    	componentDidMount : function(){
    		$.ajax({
        url: this.apiUrl + '/account/'+this.props.data.username+'/post/'+this.props.data.id,
        dataType: 'json',
        success: function(data) {
          data['username'] = this.props.data.username;
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    		
    	},
      render: function(){
          switch(this.state.data.content_type){
            case 'reel' : return (navigator.userAgent.match(/iPhone|iPad|iPod/i) ? <ReelMobileSafari data={this.state.data} /> : <Reel data={this.state.data} />); break;
            case 'none' : return (<Loading />); break;
            default : return (<Loading />); break;
          }
          
      }
    })
    return Post;
} );
