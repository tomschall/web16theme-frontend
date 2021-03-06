/*!
 * Sidebar KeyData
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'keydata',
	events = {
		// eventname: 'eventname.estatico.' + name
	},
	defaults = {
		domSelectors: {},
		stateClasses: {
			maxItems: 1,
		},
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
		if (window.estatico.mq.query({ to: 'small' })) {
			var showMore = $('.object__title').attr('data-lang-show-more');
			var showLess = $('.object__title').attr('data-lang-show-less');
			var visibleDatas = '.widg_edu_contents .edu__key_data div.datas';
			$('.toggler .show-more').text(showMore);
			if ($(visibleDatas).length > 3) {
				$('.edu__key_data div:gt(2)').hide();
				$('.edu__key_data div:nth-child(3)').addClass('remove__line');
			} else if ($(visibleDatas).length <= 3) {
				$('.toggler').css('display', 'none');
			}

			$('.show-more').on('click', function() {
				$('.edu__key_data div.datas:gt(2)').toggle();
				$('.edu__key_data div:nth-child(3)').toggleClass('bottom__line');
				// eslint-disable-next-line no-unused-expressions
				$(this).text() === showMore ? $(this).text(showLess) : $(this).text(showMore);
			});
		}
		this.calculateLines();
};

	Widget.prototype.calculateLines = function() {
		if (window.estatico.mq.query({ from: 'medium' })) {
			$('.edu__key_data div').each(function(index) {
				if (
					index === 2 ||
					index === 5 ||
					index === 8 ||
					index === 11 ||
					index === 14
				) {
					$(this).after('<div class="ruler"></div>');
				}
			});
		}
		if (window.estatico.mq.query({ from: 'small', to: 'medium' })) {
			$('.edu__key_data div').each(function(index) {
				if (
					index === 1 ||
					index === 3 ||
					index === 5 ||
					index === 7 ||
					index === 9 ||
					index === 11 ||
					index === 13 ||
					index === 15
				) {
					$(this).after('<div class="ruler"></div>');
				}
			});
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
