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

	/* Removing empty p-Tags */
	$('p:empty').remove();

	// $('.widg_calltoaction').delay(3000).animate({
	// 	display: 'none',
	// 	right: '20%'
	// }, 'swing');

	/* Call To Action */
	$('.widg_calltoaction .ch-info-back a').hover(function() {
		$('.ch-info-back .widg_teaser__arrow').css({
			'padding-left': 20
		});
	});

	$('.widg_calltoaction .ch-info-back a').mouseout(function() {
		$('.ch-info-back .widg_teaser__arrow').css({
			'padding-left': 0
		});
	});

	$(document).ready(function() {
		$('.noborder').each(function() {
			$(this).parent().parent().parent().addClass('error');
		});

		if ($('#form').length) {
			$('html, body').animate({
				scrollTop: $('.error:visible:first').offset.top
			}, 1000);
		}

		var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
		if (isMobile === null) {
			if ($('.widg_location_slider').length) {
				var resizeTimer;
				$(window).resize(function() {
					var windowSize = $(window).width();
					if (windowSize <= 1022) {
						clearTimeout(resizeTimer);
						resizeTimer = setTimeout(function() {
							$('.widg_location_slider').append('<div id="overlay"><div id="fhnw-spinner"></div></div>');
							$('#fhnw-spinner').spinner({
								radius: 30,
								strokeWidth: 6,
								color: '#fff'
							});
							this.location.reload(false); /* false to get page from cache */
						}, 1000);
					}
				});
			}
		}
	});

	/* Engl. Logo size */
	var windowWidth = $(window).width();
	var currentLanguage = $('html')[0].lang;

	if (windowWidth >= 1022 && currentLanguage === 'en') {
		console.log('language englisch -> window size greater than 1022');
		$('.widg_logo img').css('width', '220px');
	} else {
		$('.widg_logo img').css('width', 'unset');
	}

})(jQuery);
