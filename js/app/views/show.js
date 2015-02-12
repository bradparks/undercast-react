define(['marionette','ejs'], function(Marionette, EJS) {

	var ShowView = Marionette.ItemView.extend({
		template : function(serialized_model) {
					var html = new EJS({url : 'js/app/views/templates/show.ejs'}).render(serialized_model);
				    return html;
		}
		

	});

	return ShowView;
});