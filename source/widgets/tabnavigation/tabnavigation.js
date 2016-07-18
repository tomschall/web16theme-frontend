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
				entry: '[data-tabnavigation="entry"]',
				nav: '[data-tabnavigation="nav"]',
				navEntry: '[data-tabnavigation="nav-entry"]'
			},
			stateClasses: {
				isActive: 'is_active'
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
		this.addNavigation();

		this.addEventHandlers();
	};

	/**
	 * Generate the navigation
	 */
	Widget.prototype.addNavigation = function() {
		var navigations = [],
				tempObject = {};

		$(this.options.domSelectors.entry).each(function() {
			tempObject = {};

			tempObject.name = $(this).data('name');
			tempObject.title = $(this).data('title');

			navigations.push(tempObject);
		});

		navigations.forEach(function(navigation) {
			$(this.options.domSelectors.nav).find('ul').append('<li><a href="#" data-tabnavigation="nav-entry" data-target="' + navigation.name + '">' + navigation.title + '</a></li>');
		}.bind(this));

		if (window.estatico.mq.query({from: 'medium'})) {
			$(this.options.domSelectors.navEntry).first().addClass(this.options.stateClasses.isActive);
			$(this.options.domSelectors.entry).first().addClass(this.options.stateClasses.isActive);
		}
	};

	/**
	 * Adding the necessary event listeners
	 */
	Widget.prototype.addEventHandlers = function() {
		$(this.options.domSelectors.navEntry).click(function(event) {
			event.preventDefault();

			if ($(event.currentTarget).hasClass(this.options.stateClasses.isActive) && window.estatico.mq.query({to: 'medium'})) {
				$('li ' + this.options.domSelectors.entry).remove();

				$(this.options.domSelectors.navEntry).removeClass(this.options.stateClasses.isActive);
			} else {
				this.setActiveContent($(event.currentTarget));
				$(this.options.domSelectors.navEntry).removeClass(this.options.stateClasses.isActive);
				$(event.currentTarget).addClass(this.options.stateClasses.isActive);
			}
		}.bind(this));
	};

	Widget.prototype.setActiveContent = function(target) {
		var $targetEntry = $('[data-name="' + target.data('target') + '"]');

		$(this.options.domSelectors.entry).removeClass(this.options.stateClasses.isActive);
		$targetEntry.addClass(this.options.stateClasses.isActive);

		if (window.estatico.mq.query({to: 'medium'})) {
			$('li ' + this.options.domSelectors.entry).remove();
			$targetEntry.clone(true).appendTo(target.closest('li'));
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
