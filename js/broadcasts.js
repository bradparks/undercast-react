define(['undercast_model','backbone','show_view','show_model','moment'], function(UndercastModel,Backbone,ShowView,ShowModel,moment) {
	moment().format();
	var ShowsCollection = Backbone.Collection.extend({
  			model: ShowModel,
  			url : function(){return "http://mrshoe.org:9999/shows";}
		});
	var shows = new ShowsCollection();
	shows.fetch();
	ShowsView = Backbone.Marionette.CollectionView.extend({
  			itemView : ShowView
	});
	console.log(shows);
	var showsView = new ShowsView({collection : shows});
	$("#shows").html(showsView.render().el);
});