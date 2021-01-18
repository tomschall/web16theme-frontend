/*!
 * Event Search
 */

;(function($, undefined) {
	'use strict';

	var name = 'news_search',
		news = {
			// newsname: 'newsname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				event_search: '[data-init="' + name + '"]',
			},
			stateClasses: {
				// isActive: 'is_active'
			}
		},
		data = {
			// items: ["Item 1", "Item 2"]
		};

	/**
	 * Create an instance of the widget
	 * @constructor
	 * @param {object} element - The DOM element to bind the widget
	 * @param {object} options - Options overwriting the defaults
	 */
	function Widget(element, options) {
		this._helper = estatico.helpers.SuperClass;

		this._helper({
			name: name,
			element: element,
			defaults: defaults,
			options: options,
			news: news,
			data: data
		});
	}

	Widget.prototype = $.extend(true, {}, estatico.helpers.SuperClass.prototype, Widget.prototype);

	/**
	 * Initialize Widget, bind news.
	 * @method
	 * @public
	 */
	Widget.prototype.init = function() {
		// Add class if select is selected
		$('select').each(function() {
			$('select').find(':selected').parent().next().addClass('has-selection');
    });
  };

	/**
	 * Unbind news, remove data, custom teardown
	 * @method
	 * @public
	 */
	Widget.prototype.destroy = function() {
		// Unbind news, remove data
		estatico.helpers.SuperClass.prototype.destroy.apply(this);
		// Custom teardown (removing added DOM elements etc.)
		// If there is no need for a custom teardown, this method can be removed
	};
	// Make the plugin available through jQuery (and the global project namespace)
	estatico.helpers.SuperClass.register(Widget, name, {
		initNews: ['ready', 'ajaxload'],
		news: news
  });

})(jQuery);
