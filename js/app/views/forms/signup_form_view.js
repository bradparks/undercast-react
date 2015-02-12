define(['base_form_view','ejs','jquery'], function(BaseFormView,EJS,$) {
	
	var SignupFormView = BaseFormView.extend({
		template : function(serialized_model) {
					var html = new EJS({url : 'js/app/views/templates/signup.ejs'}).render(serialized_model);
				    return html;
		}
	});

	return SignupFormView;
});