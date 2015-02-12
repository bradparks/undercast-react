define(["react"], function(React){
    "use strict";
    var Loading = React.createClass({
     
      render: function(){
        return (<div className="loading"><i className="fa fa-circle-o-notch fa-5x fa-spin"></i></div>);
          
      }
    })
    return Loading;
} );