;(function($, Base64) {
	'use strict';

	/**
	 Graceful E-mail Obfuscation

	Like:
	https://github.com/collective/collective.geotransform/blob/master/collective/geotransform/skins/collective_geotransform/geoMailDecoder.js
	Plus:
	* Fixed 'encodedMail', 'decodedMail' variable declared on global (browser's window) scope
	* Fixed code style triggers a couple of linter warnings
	* Support for utf-8 (and base64) encoded strings (via https://www.npmjs.com/package/js-base64)
	**/
	function obfuscateEmails() {
		// Decode the geomailaddress span to extract the mail
		if(!($('.widg_extendedlinks').length || $('form.easyformForm').length)) {
			$('span.geomailaddress').each(function() {
				var encodedMail = $(this).text();
				var decodedMail = Base64.decode(encodedMail);
				$(this).replaceWith(decodedMail);
			});
		}

		// Decode the geomailto href attribute to extract the mail
		if(!($('.widg_extendedlinks').length || $('form.easyformForm').length)) {
			$('a[href^=geomailto]').each(function() {
				$(this).attr('class', 'link-mailto');
				var encodedMail = $(this).attr('href').replace('geomailto:', '');
				var decodedMail = Base64.decode(encodedMail);
				$(this).attr('href', 'mailto:' + decodedMail);
			});
		}

		// see https://gitlab.fhnw.ch/webteam/fhnw.webauftritt/issues/998
		if(!($('.widg_extendedlinks').length || $('form.easyformForm').length)) {
			$('a[onclick*=geomailto]').each(function() {
				var encodedMail = $(this).attr('onclick').slice(32, -1);
				var decodedMail = Base64.decode(encodedMail);
				$(this).attr('onclick', 'window.location.href="mailto:' + decodedMail + '"');
			});
		}
	}

	function improveEmailWrapping() {
		if(!($('.widg_extendedlinks').length || $('form.easyformForm').length)) {
			$('a[href^=mailto]').each(function() {
				$(this).html('<span>' + $(this).text()
						.replace('@', '</span>@<span>')
						.replace('.', '</span>.<span>')
						.replace('_', '</span>_<span>')
						.replace('-', '</span>-<span>') +
						'</span>');
			});
		}
	}

	$(document).ready(function() {
		obfuscateEmails();
		improveEmailWrapping();

	});

})(jQuery, Base64);
