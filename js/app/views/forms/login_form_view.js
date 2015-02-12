define(['base_form_view','ejs','jquery'], function(BaseFormView,EJS,$) {
	
	var LoginFormView = BaseFormView.extend({
		template : function(serialized_model) {
					var html = new EJS({url : 'js/app/views/templates/login.ejs'}).render(serialized_model);
				    return html;
		}
	});

	return LoginFormView;
});