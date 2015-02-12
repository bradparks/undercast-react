define(['backbone'], function(Backbone) {

	var UndercastModel = Backbone.Model.extend({
	  urlRoot : "http://mrshoe.org:9999/"
	});

	return UndercastModel;
});