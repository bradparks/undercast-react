define(["react","api","jsx!components/dragdrop","jsx!components/clips/list"], function(React,ApiMixin,DragDrop,ClipList){
    "use strict";
    var Admin = React.createClass({
    	mixins : [ApiMixin],
      currentShowId : 0,

      getInitialState: function() {
        return {shows: [],showname : 'Stanford vs Oregon',showid : 1271,clips:[]};
      },
    	componentDidMount : function(){
    		$.ajax({
        url: this.apiUrl + '/enabled_shows',
        dataType: 'json',
        success: function(data) {
          this.setState({shows : data},function(){
            this.retrieveClips();
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });

    		
    	},
      retrieveClips : function(){
        $.ajax({
        url: this.apiUrl + '/show/'+this.state.showid+'/clips',
        dataType: 'json',
        success: function(data) {
          var reversedData = data.reverse();
          this.setState({clips : reversedData});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      },
      showClicked : function(event){
        $(".category-shows li").removeClass("highlighted");
        $(event.target).addClass('highlighted');
        this.setState({showname : event.target.dataset.showname, showid : event.target.dataset.showid},function(){
          this.retrieveClips();
        });
        //setInterval(this.retrieveClips, 3000);
        
      },
      render: function(){
        var showList = this.state.shows.map(function(category){
            var categoryShows = category.shows.map(function(show){
              return <li onClick={this.showClicked} className="show-name" key={show.id} data-showname={show.name} data-showid={show.id}>{show.name}</li>;
            }.bind(this));
            return  <div key={category.name} >
                      <h3>{category.name}</h3>
                      
                    <ul className="category-shows">{categoryShows}</ul>
                    </div>

        }.bind(this));
     
        var clips = this.state.showid != 0 ? <ClipList reloadClips={this.retrieveClips} clips={this.state.clips} showid={this.state.showid} /> : '';
        return <div>
                  <div className="col-1-8">
                    {showList}
                  </div>
                  <div className="col-10-12">
                    <DragDrop showname={this.state.showname} showid={this.state.showid}/>
                    {clips}
                  </div>
              </div>
          
      }
    })
    return Admin;
} );
