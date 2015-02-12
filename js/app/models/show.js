define(['undercast_model'], function(UndercastModel) {

	var ShowModel = UndercastModel.extend({
		initialize: function(){console.log('show model created')},
	  startTime : function(starttime){
	  		return 'blah start';
	  },
	  
	  isLive : function(starttime,endtime){
	  		return true;
	  }

	});

	return ShowModel;
});