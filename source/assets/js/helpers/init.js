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
       console.log('cta hover');
       $('.ch-info-back .widg_teaser__arrow').css({
               'padding-left': 20
       });
   });
   $('.widg_calltoaction .ch-info-back a').mouseout(function() {
       console.log('cta mouseout');
       $('.ch-info-back .widg_teaser__arrow').css({
           'padding-left': 0
       });
   });

	 // Reloading page if map exists and window is resized
	 if ($('.widg_location_slider').length) {

		 $(window).bind('resize', function() {
			 if (window.RT) {
				 clearTimeout(window.RT);
			 }
			 	 window.RT = setTimeout(function() {
				 $('.widg_location_slider').append('<div id="overlay"><div id="fhnw-spinner"></div></div>');
				 $('#fhnw-spinner').spinner({
					 radius: 30,
					 strokeWidth: 6,
					 color: '#fff'
				 });
				 this.location.reload(false); /* false to get page from cache */
			 }, 200);
		 });
	 }

})(jQuery);
