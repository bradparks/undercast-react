define([], function() {

	var SessionModel = Backbone.Model.extend({
	  url : function() {
	   		return "http://mrshoe.org:9999/account";
	  }
	});

	return SessionModel;
});