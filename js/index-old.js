define([
    'backbone',
    'jquery',
    'signup_form_view',
    'account_model'
], function(Backbone,$, SignupFormView,AccountModel) {
	console.log('index file loaded');
	var signUpForm = new SignupFormView({model : new AccountModel()});
  	var renderedForm = signUpForm.render();
  	$("#main-signup").html(renderedForm.el);
  
});