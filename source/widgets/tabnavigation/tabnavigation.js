/*!
 * Tab-Navigation
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'tabnavigation',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				button: '[data-' + name + '="button"]',
				content: '[data-' + name + '="content"]',
				bar: '[data-' + name + '="bar"]'
			},
			stateClasses: {
				isActive: 'is_active'
			}
		},
		data = {
			content: []
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
		this.$element.find(this.options.domSelectors.button).map(function(index, element) {
			$(element).data('tabnavigation-index', index);
		}.bind(this));

		data.content = $(this.options.domSelectors.content).toArray();

		this.addEventHandlers();
		this.setElementActive(this.$element.find(this.options.domSelectors.button).first());
	};

	Widget.prototype.addEventHandlers = function() {
		this.$element.find(this.options.domSelectors.button).on('click.' + this.uuid, function(event) {
			this.setElementActive($(event.target));
		}.bind(this));
	};

	Widget.prototype.setElementActive = function($button) {
		var index = $button.data('tabnavigation-index'),
				$content = $(data.content[index]);

		this.closeOther();

		$button.addClass(this.options.stateClasses.isActive).attr('aria-expanded', 'true');
		$content.addClass(this.options.stateClasses.isActive).attr('aria-hidden', 'false');

		this.moveNavBar($button);
	};

	Widget.prototype.moveNavBar = function($button) {
		var buttonLeft = $button.offset().left,
				$nav = $button.closest('nav'),
				navLeft = $nav.offset().left,
				leftPosition = buttonLeft - navLeft,
				width = $button.width();

		this.$element.find(this.options.domSelectors.bar).css({
			'left': leftPosition,
			'width': width
		});
	};

	Widget.prototype.closeOther = function() {
		this.$element.find(this.options.domSelectors.button).removeClass(this.options.stateClasses.isActive).attr('aria-expanded', 'false');
		this.$element.find(this.options.domSelectors.content).removeClass(this.options.stateClasses.isActive).attr('aria-hidden', 'true');
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
