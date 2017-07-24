;(function($, undefined) {
	var flagEnv = '',
		location = window.location.href;

	if (/^https?:\/\/(www|webcms)\.dev\.fhnw\.ch/.test(location)) {
		flagEnv = 'dev';
	} else if (/^https?:\/\/(www|webcms)0\.test\.fhnw\.ch/.test(location)) {
		flagEnv = 'test';
	}

	// apply environment class to body element for dev and test environments
	if (flagEnv) {
		$('body').addClass('is-env-' + flagEnv);
	}
})(jQuery);
