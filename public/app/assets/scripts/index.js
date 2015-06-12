/**
 * Functionality specific to the index page
 */
(function($, app) {

	/**
	 * Gets called on script load
	 */
	var initialize = function () {
		initializeSubmitButton();
	};

	/**
	 * Wires up the form's submit button to actually... submit
	 */
	var initializeSubmitButton = function() {
		var submitButton = document.querySelector('[type=submit]');
		submitButton.addEventListener('click', onFormSubmit);
	};

	/**
	 * Function called on form submission
	 */
	var onFormSubmit = function() {
		var form = document.querySelector('form');
		if(validateForm(form)) {
			app.loading(true);
			var formJson = $(form).serializeObject();
			$.ajax({
				url: app.candidatesUrl,
				type: 'POST',
				contentType:'application/json',
				dataType:'json',
				data: JSON.stringify(formJson)
			}).done(function() {
	    	app.applicationSubmitted();
	  	}).fail(function() {
	    	app.toast('Something awful happened while trying to submit your application.');
	  	}).always(function() {
				app.loading(false);
	  	});
	  }
	  else {
	  	app.toast('Please fill out all of the required fields.');
	  }
	};

	/**
	 * Validates the supplied form for any missing fields and returns 
	 * whether or not the form is valid
	 */
	var validateForm = function(form) {
		var isValid = true;
		var requiredFields = form.querySelectorAll('input[required]');
		if(requiredFields) {
			for(var i = 0; i < requiredFields.length; i++) {
				var requiredField = requiredFields[i];
				if(!requiredField.value || requiredField.value.length < 1) {
					isValid = false;
				}
			}
		}
		else {
			isValid = false;
		}
		return isValid;
	};

	// Call initialize on script load
	initialize();

}(window.jQuery, window.app));