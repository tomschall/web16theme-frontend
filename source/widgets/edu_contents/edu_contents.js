/*!
 * Sidebar KeyData
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

(function($, undefined) {
	'use strict';

	var name = 'edu_key_data',
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
			data: data,
		});
	}

	Widget.prototype = $.extend(
		true,
		{},
		estatico.helpers.SuperClass.prototype,
		Widget.prototype
	);

	/**
	 * Initialize Widget, bind events.
	 * @method
	 * @public
	 */
	Widget.prototype.init = function() {
		if (estatico.mq.query({ to: 'small' })) {
			if ($('.widg_edu_contents .edu__key_data div.datas').length > 3) {
				$('.edu__key_data div:gt(2)').hide();
			}
			$('.show-more').on('click', function() {
				$('.edu__key_data div.datas:gt(2)').toggle();
				// eslint-disable-next-line no-unused-expressions
				$(this).text() === 'Mehr anzeigen' ? $(this).text('Weniger anzeigen') : $(this).text('Mehr anzeigen');
				// eslint-disable-next-line no-unused-expressions
				$(this).text() === 'Weniger anzeigen' ? $(this).addClass('open') : $(this).removeClass('open');
			});
			this.mobileNavigation();
		}
	};

	Widget.prototype.mobileNavigation = function() {
		if (estatico.mq.query({ to: 'small' })) {
			var e = $('<div><div class="icon icon__contact"></div><div class="icon icon__info"></div><div class="icon icon__application"></div></div>');
			$('body').append(e);
			e.attr('id', 'edu__product_nav');
		}
		// ANCHOR CONTACT
		if ($('#edu__contact').length) {
			$('.icon.icon__contact').on('click', function() {
				$('html, body').animate({
						scrollTop: $('.widg_sidebar__content').offset().top - 0
				}, 1000);
			});
		}
		// ANCHOR EVENTS
		if ($('#edu__events').length) {
			$('.icon.icon__info').on('click', function() {
				$('html, body').animate({
						scrollTop: $('.widg_edu_events.widg_sidebar__object').offset().top - 10
				}, 1000);
			});
		}
		// ANCHOR APPLICATION
		if ($('#edu__application').length) {
			$('.icon.icon__application').on('click', function() {
				$('html, body').animate({
						scrollTop: $('#edu__application').offset().top - 25
				}, 1000);
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
		events: events,
	});
})(jQuery);
