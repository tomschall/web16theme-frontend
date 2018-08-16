/**
 * Init widgets modules on specified events
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	// Usage: $('#mySelectId option').sort(SelectOptionSorter).appendTo('#mySelectId');
	function SelectOptionSorter(a, b) {
          return (a.innerHTML > b.innerHTML) ? 1 : -1;
      };


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

	// /Plone/en/search_edu Sorting select option values alphabetically
	$('#taxonomy_subjectarea option').sort(SelectOptionSorter).appendTo('#taxonomy_subjectarea');
	$('#taxonomy_eduproducttype option').sort(SelectOptionSorter).appendTo('#taxonomy_eduproducttype');
	$('#city option').sort(SelectOptionSorter).appendTo('#city');
	$('#faculty option').sort(SelectOptionSorter).appendTo('#faculty');

})(jQuery);
