/*!
 * Ich Mochte
 *
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'i_want',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				// item: '[data-' + name + '="item"]'
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
			events: events,
			data: data
		});
	}

	Widget.prototype = $.extend(true, {}, estatico.helpers.SuperClass.prototype, Widget.prototype);

	/**
	 * Initialize Widget, bind events.
	 * @method
	 * @public
	 */
	Widget.prototype.init = function() {
		var $btn = this.$element.find('.in_content_search__button'),
			targetURL = '';

		this.$element.find('select').val('').change();
		this.$element.find('select').on('change', function(evt) {
			targetURL = $(evt.target).val();
			$btn.prop('disabled', !targetURL.length);
		});

		$btn.click(function() {
			window.location.href = targetURL;
		});

		window.addEventListener('resize', (function() {
			// setTimeout because no 'afterresize' event exists
			window.setTimeout((function afterResize() {
				this.initCurrentSize();
			}).bind(this), 150);
		}).bind(this));
		this.initCurrentSize();
	};

	Widget.prototype.initCurrentSize = function() {
		var is_small = window.estatico.mq.query({to: 'small'});
		if (is_small) {
			this.$element.css('background-image', 'url("' + this.$element.data('background-image') + '/@@images/image/f_home_middle")');
		} else {
			this.$element.css('background-image', 'url("' + this.$element.data('background-image') + '")');
		}
	};

	/**
	 * Unbind events, remove data, custom teardown
	 * @method
	 * @public
	 */
	Widget.prototype.destroy = function() {
		// Unbind events, remove data
		estatico.helpers.SuperClass.prototype.destroy.apply(this);

		// Custom teardown (removing added DOM elements etc.)
		// If there is no need for a custom teardown, this method can be removed
	};

	// Make the plugin available through jQuery (and the global project namespace)
	estatico.helpers.SuperClass.register(Widget, name, {
		initEvents: ['ready', 'ajaxload'],
		events: events
	});

})(jQuery);
