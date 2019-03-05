/*!
 * lazy load google maps script tags
 *
 * @author Thomas Schallert
 * @copyright FHNW Brugg/Windisch
 *
 */

;(function(window, document, undefined) {

	document.addEventListener('DOMContentLoaded', function() {

		var mapsKeyUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBcDRcaQnzeQSjZQgeZSfhxrqwPXWKsYUY&libraries=places';

		function loadScript(src, callback) {

			var s,
				r,
				t;
			r = false;
			s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = src;
			s.onload = s.onreadystatechange = function() {
				// console.log( this.readyState ); //uncomment this line to see which ready states are called.
				if (!r && (!this.readyState || this.readyState === 'complete')) {
					r = true;
					callback();
				}
			};
			t = document.getElementsByTagName('script')[0];
			t.parentNode.insertBefore(s, t);

		}

		function initLocationSlider() {

			var instances = Object.keys(window.estatico.widgets.location_slider.instances);
			instances.forEach(function(inst) {
				window.estatico.widgets.location_slider.instances[inst].init();
			});
		}

		var lazyScripts = [].slice.call(document.querySelectorAll('script.b-lazy'));

		if ('IntersectionObserver' in window) {

			var lazyScriptObserver = new IntersectionObserver(function(entries) {
				entries.forEach(function(entry) {
					if (entry.isIntersecting) {
						var lazyScript = entry.target;
						loadScript(mapsKeyUrl, function() {
							initLocationSlider();
							var el = document.querySelector('.b-lazy');
							el.parentNode.removeChild(el);
							lazyScriptObserver.unobserve(lazyScript);
						});
					}
				});
			});

			lazyScripts.forEach(function(lazyScript) {
				lazyScriptObserver.observe(lazyScript);
			});

		} else {

			window.bLazy = new window.Blazy({
				container: '.container',
				success: function() {
					loadScript(mapsKeyUrl, function() {
						var el = document.querySelector('.b-lazy');
						el.parentNode.removeChild(el);
						initLocationSlider();
						console.log('Fallback: B-Lazy');
					});
				}
			});
		}
	});

})(window, document);
