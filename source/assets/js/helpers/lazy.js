/*!
 * lazy load google maps script tags
 *
 * @author Thomas Schallert
 * @copyright FHNW Brugg/Windisch
 *
 */

;(function(window, document, undefined) {

	document.addEventListener('DOMContentLoaded', function() {

		var lazyScripts = [].slice.call(document.querySelectorAll('script.b-lazy'));

		console.log('lazyScripts', lazyScripts);

		if ('IntersectionObserver' in window) {
			var lazyScriptObserver = new IntersectionObserver(function(entries) {
				console.log('entries:', entries);
				entries.forEach(function(entry) {
					if (entry.isIntersecting) {
						var lazyScript = entry.target;
						console.log('lazyScript: ', lazyScript);
						lazyScript.src = lazyScript.dataset.src;
						lazyScript.classList.remove('b-lazy');
						lazyScriptObserver.unobserve(lazyScript);
						console.log('successfully loaded script');
					}
				});
			});

			lazyScripts.forEach(function(lazyScript) {
				lazyScriptObserver.observe(lazyScript);
			});
		} else {
			// Possibly fall back
		}
	});

})(window, document);
