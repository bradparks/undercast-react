define(['marionette','jquery'], function(Marionette,$) {

	var BaseFormView = Marionette.ItemView.extend({

		events : {
  			"click button" : "process_form"
		},
		process_form : function(e){
				e.preventDefault();
				var form = this.$('form');
				this.model.save(form.serializeJSON(), {
		        success: function(model, response, options) {
		            console.log("SUCCESS!");
		        },
		        error: function(model, response, options) {
		           console.log(response);
		        }
			});
		}

	});

	return BaseFormView;
});