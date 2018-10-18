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
						lazyScript.removeAttribute('data-src');
						lazyScript.removeAttribute('class');
						lazyScript.removeAttribute('async');
						lazyScriptObserver.unobserve(lazyScript);
						console.log('successfully loaded script');
					}
				});
			});

			lazyScripts.forEach(function(lazyScript) {
				lazyScriptObserver.observe(lazyScript);
			});

		} else {

			window.bLazy = new window.Blazy({
				container: '.container',
				success: function(element) {
					console.log('Element loaded: ', element.nodeName);
				}
			});

		}

	});

})(window, document);
