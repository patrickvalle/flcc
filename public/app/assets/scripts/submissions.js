(function($, app) {

	var DEFAULT_VALUE_IF_NO_DATA = '-';

	var dialogButtonsRegistered = false;
	var submissionId = false;

	/**
	 * Gets called on script load
	 */
	var initialize = function () {
		loadSubmissions(function(submissions) {
			populateSubmissionsInDom(submissions);
			initializeSubmissionDeleteButtons();
		});
	};

	/**
	 * Loads the submissions from the server and invokes the supplied callback
	 */
	var loadSubmissions = function(callback) {
		app.loading(true);
		$.ajax({
			url: app.applicationsApiUrl,
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
					element.setAttribute('model-id', submission._id);
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
	 * Initializes each delete button within a submission
	 */
	var initializeSubmissionDeleteButtons = function() {
		window.addEventListener('flcc-submission.removed', function(event) {
			// Set the submission id to be deleted
			submissionId = event.detail.modelId;
			// Show the dialog (and register the buttons if they haven't already been)
			var dialog = document.querySelector('paper-dialog');
			if(!dialogButtonsRegistered) {
				var dialogConfirmButton = dialog.querySelector('paper-button[dialog-confirm]');
				dialogConfirmButton.addEventListener('tap', onRemoveSubmission);
				dialogButtonsRegistered = true;
			}
			dialog.toggle();
		});
	};

	/**
	 * Handler that gets called when the user chooses to remove a submission
	 */
	var onRemoveSubmission = function() {
		app.loading(true);
		$.ajax({
			url: app.applicationsApiUrl + '/' + submissionId,
			type: 'DELETE'
		}).done(function(response) {
			// Remove the submission DOM element
			var submissionDomElement = document.querySelector('flcc-submission[model-id="' + submissionId + '"]');
			submissionDomElement.parentNode.removeChild(submissionDomElement);
			// Show a toast
    	app.toast(response.name.first + ' ' + response.name.last + '\'s submission has been removed.');
  	}).always(function() {
			app.loading(false);
  	});
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