/**
 * Init widgets modules on specified events
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	var $document = $(document),
		initEvents = estatico.helpers.initEvents || {},
		keys = Object.keys(initEvents);

	if (keys.length === 0) {
		return;
	}

	// avoid initialization if running in test mode
	if (window.__PREVENT_INITIALIZATION__) {
		return;
	}

	$document.on(keys.join(' '), function(event) {
		var initPlugins = initEvents[event.type];

		$('[data-init]').each(function() {
			var $this = $(this),
				plugins = $this.data('init').split(' '),
				i = 0;

			for (i = 0; i < plugins.length; i++) {
				if (initPlugins.indexOf(plugins[i]) !== -1) {
					$.fn[plugins[i]].apply($this);
				}
			}
		});
	});

	/* Image caption */
	var imageCaption = $('.image-inline').attr('title');
	$('.image-inline').after('<span class="image_gallery__legend">' + imageCaption + '</span>');

	/* Removing empty p-Tags */
	$('p:empty').remove();

})(jQuery);
