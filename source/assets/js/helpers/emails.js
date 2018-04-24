/**
 Graceful E-mail Obfuscation

 Like:
 https://github.com/collective/collective.geotransform/blob/master/collective/geotransform/skins/collective_geotransform/geoMailDecoder.js
 Plus:
 * Fixed 'encodedMail', 'decodedMail' variable declared on global (browser's window) scope
 * Fixed code style triggers a couple of linter warnings
 * Support for utf-8 (and base64) encoded strings (via https://www.npmjs.com/package/js-base64)
 **/

;(function($, Base64) {
	'use strict';

	$(document).ready(function() {
		// Decode the geomailaddress span to extract the mail
		$('span.geomailaddress').each(function(i) {
			var encodedMail = $(this).text();
			var decodedMail = Base64.decode(encodedMail);
			$(this).replaceWith(decodedMail);
		});
		// Decode the geomailto href attribute to extract the mail
		$('a[href^=geomailto]').each(function(i) {
			$(this).attr('class', 'link-mailto');
			var encodedMail = $(this).attr('href').replace('geomailto:', '');
			var decodedMail = Base64.decode(encodedMail);
			$(this).attr('href', 'mailto:' + decodedMail);
		});
		// Decode the geomailto from the onclick attribute to extract the mail
		$('a[onclick^="window.location.href=\'geomailto:"]').each(function(i) {
			var encodedMail = $(this).attr('onclick').replace('window.location.href=\'geomailto:', '').slice(0, -1);
			var decodedMail = Base64.decode(encodedMail);
			$(this).attr('onclick', 'window.location.href=\'mailto:' + decodedMail + '\'');
		});
	});

})(jQuery, Base64);
