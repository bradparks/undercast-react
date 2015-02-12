define(['undercast_model'], function(UndercastModel) {

	var AccountModel = UndercastModel.extend({
	  url : function() {
	   		return this.urlRoot + "account";
	  }
	});

	return AccountModel;
});