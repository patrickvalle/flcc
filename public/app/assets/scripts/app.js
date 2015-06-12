/**
 * Module definition for common, app-level functionality
 */
var app = (function() {

	var CANDIDATES_URL = '/api/candidates';
	var APPLICATION_SUBMITTED_URL = '/submissions.html?submitted';

	/**
	 * Toggles display of the loading animation based off the supplied toggle param
	 */
	var loading = function(toggle) {
		var progressBar = document.querySelector('paper-progress');
		if(progressBar) {
			if(toggle === true) {
				progressBar.style.display = 'block';
			}
			else if(toggle === false) {
				progressBar.style.display = 'none';
			}
		}
	};

	/**
	 * Shows a toast with the provided message
	 */
	var toast = function(message) {
		var toast = document.querySelector('paper-toast');
		if(toast) {
			toast.setAttribute('text', message);
			toast.show();
		}
	};

	/**
	 * Handler called upon successful application submission
	 */
	var applicationSubmitted = function() {
		window.location = APPLICATION_SUBMITTED_URL;
	};

	return {
		applicationSubmitted: applicationSubmitted,
		candidatesUrl: CANDIDATES_URL,
		loading: loading,
		toast: toast
	};

}());