(function($, app) {

	var DEFAULT_VALUE_IF_NO_DATA = '-';

	/**
	 * Gets called on script load
	 */
	var initialize = function () {
		loadSubmissions(function(submissions) {
			populateSubmissionsInDom(submissions);
		});
	};

	/**
	 * Loads the submissions from the server and invokes the supplied callback
	 */
	var loadSubmissions = function(callback) {
		app.loading(true);
		$.ajax({
			url: app.candidatesUrl,
			type: 'GET'
		}).done(function(response) {
    	callback(response);
  	}).always(function() {
			app.loading(false);
  	});
	};

	/**
	 * Populates the DOM with the supplied submissions
	 */
	var populateSubmissionsInDom = function(submissions) {
		if(submissions) {
			var container = document.querySelector('[populated-with="submissions"]');
			if(container) {
				for(var i = 0; i < submissions.length; i++) {
					var submission = submissions[i];
					var element = document.createElement('flcc-submission');
					element.setAttribute('first-name', submission.name.first);
					element.setAttribute('last-name', submission.name.last);
					element.setAttribute('email', submission.email);
					if(submission.answers) {
						setElementAttributeWithDefault(element, 'answer-one', submission.answers.one);
						setElementAttributeWithDefault(element, 'answer-two', submission.answers.two);
						setElementAttributeWithDefault(element, 'answer-three', submission.answers.three);
					}
					container.appendChild(element);
				}
			}
		}
	};

	/**
	 * Sets an element's attribute with the supplied value. If no value is specified, 
	 * the default DEFAULT_VALUE_IF_NO_DATA is used.
	 */
	var setElementAttributeWithDefault = function(element, attribute, value) {
		if(value) {
			element.setAttribute(attribute, value);
		}
		else {
			element.setAttribute(attribute, DEFAULT_VALUE_IF_NO_DATA);
		}
	};

	// Call initialize on script load
	initialize();

}(window.jQuery, window.app));