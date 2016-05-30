/*!
 * Navigation
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'navigation',
			events = {
				// eventname: 'eventname.estatico.' + name
			},
			defaults = {
				domSelectors: {
					expandable: '[data-navigation-is-expandable="true"]',
					subWrappers: '[data-navigation="sub-wrapper"]',
					list: '[data-navigation="list"]',
					navItem: '[data-navigation="item"]'
				},
				stateClasses: {
					isActive: 'is_active'
				},
				maxAdditionalNavLevel: 3
			},
			data = {
				wrappers: []
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
		this.initWrappers();

		this.addEventListener();
	};

	/**
	 * Initializing the wrappers for the subwrappers
	 */
	Widget.prototype.initWrappers = function() {
		var $wrapperDom = '';

		for (var i = 1; i <= this.options.maxAdditionalNavLevel; i++) {
			$wrapperDom = $('<div class="widg_navigation__sub-wrapper" data-navigation="sub-wrapper" data-navigation-level="' + i + '"></div>');

			this.data.wrappers[i] = $wrapperDom;

			$('.page_wrapper').append($wrapperDom);
		}
	};

	/**
	 * Adds the navigation event listeners
	 */
	Widget.prototype.addEventListener = function() {
		$(this.options.domSelectors.expandable).on('click.' + this.uuid, function(event) {
			var $eventTarget = $(event.currentTarget),
					$subList = $eventTarget.next(this.options.domSelectors.list),
					targetLevel = $eventTarget.closest(this.options.domSelectors.list).data('navigation-level');

			if (!$eventTarget.hasClass(this.options.stateClasses.isActive)) {
				this.setNavActive($eventTarget, targetLevel);
				this.fillNavWrapper($subList);
				this.showNavigation($subList.data('navigation-level'));
			}
		}.bind(this));
	};

	/**
	 * sets the clicked nav item active, and removes all active states on the same level
	 * @param $navItem
	 * @param targetLevel
   */
	Widget.prototype.setNavActive = function($navItem, targetLevel) {
		var $currentList = $(this.options.domSelectors.list + '[data-navigation-level="' + targetLevel + '"]');

		$currentList.find('.' + this.options.stateClasses.isActive).removeClass(this.options.stateClasses.isActive);

		$navItem.addClass(this.options.stateClasses.isActive);
	};

	/**
	 * Fills the nav wrapper
	 * @param $subList the list which has to be copied to the wrapper, which can be positioned
   */
	Widget.prototype.fillNavWrapper = function($subList) {
		var subListLevel = parseInt($subList.data('navigation-level')),
				$targetWrapper = this.data.wrappers[subListLevel];

		$targetWrapper.find(this.options.domSelectors.list).remove();

		$subList.clone(true).appendTo($targetWrapper);
	};

	Widget.prototype.showNavigation = function(targetLevel) {
		var $targetWrapper = this.data.wrappers[targetLevel],
				headerWidth = $('.widg_header').outerWidth(),
				pullLeft = headerWidth * targetLevel;

		$targetWrapper.css({
			left: pullLeft,
			opacity: 1
		});
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
