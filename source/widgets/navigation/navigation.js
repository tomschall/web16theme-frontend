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
				open: 'open.estatico.' + name,
				close: 'close.estatico.' + name
			},
			defaults = {
				domSelectors: {
					expandable: '[data-navigation-is-expandable="true"]',
					subWrappers: '[data-navigation="sub-wrapper"]',
					list: '[data-navigation="list"]',
					navItem: '[data-navigation="entry"]',
					back: '[data-navigation="back"]'
				},
				stateClasses: {
					isActive: 'is_active',
					isOpen: 'is_open',
					hasShadow: 'has_shadow',
					isVisible: 'is_visible'
				},
				maxAdditionalNavLevel: 5,
				openNavClass: 'open-nav',
				currentLevel: 0
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

			if (window.estatico.mq.query({from: 'medium'})) {
				$('.page_wrapper').append($wrapperDom);
			}
		}
	};

	/**
	 * Adds the navigation event listeners
	 */
	Widget.prototype.addEventListener = function() {
		$(this.options.domSelectors.expandable).on('click.' + this.uuid, function(event) {
			var $eventTarget = $(event.currentTarget),
					$subList = $eventTarget.next(this.options.domSelectors.list),
					currentLevel = $eventTarget.closest(this.options.domSelectors.list).data('navigation-level');

			if (!$eventTarget.hasClass(this.options.stateClasses.isActive)) {
				this.setNavActive($eventTarget, currentLevel);

				this.fillNavWrapper($subList);

				this.showNavigation($subList.data('navigation-level'));
			} else {
				if (parseInt(currentLevel) === 0) {
					this.closeNavigation();
				} else {
					this.closeNavigationLevel(currentLevel + 1);
				}
			}
		}.bind(this));

		$(this.options.domSelectors.back).on('click.' + this.uuid, function() {
			this.goBack();
		}.bind(this));

		$(document).on('closeMobileHeader.estatico.menubuttons.' + this.uuid, function() {
			this.resetMobileNavigation();
		}.bind(this));

		$(window).on('open.estatico.searchbar.' + this.uuid, function() {
			this.closeNavigation(false, false);
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

		if (window.estatico.mq.query({from: 'medium'})) {
			$subList.clone(true).appendTo($targetWrapper.find('.mCSB_container'));
		} else {
			$subList.clone(true).appendTo('.widg_navigation').addClass(this.options.stateClasses.isVisible);
		}
	};

	/**
	 * Shows the subnavigation (the specified, not anyone)
	 * @param targetLevel
   */
	Widget.prototype.showNavigation = function(targetLevel) {
		var $targetWrapper = this.data.wrappers[targetLevel],
				headerWidth = $('.widg_header').outerWidth(),
				pullLeft = headerWidth * targetLevel - (targetLevel * 1),
				mobilePullLeft = -1 * targetLevel * 100;

		if (headerWidth < 300 && targetLevel >= 2) {
			pullLeft = pullLeft + (40 * (targetLevel - 1));
		}

		this.options.currentLevel = targetLevel;

		window.estatico.modal.showModal();
		window.estatico.modal.addPreventScroll();

		if (window.estatico.mq.query({from: 'medium'})) {
			if (!$('html').hasClass(this.options.openNavClass)) {
				$('html').addClass(this.options.openNavClass);
			}

			$(this.options.domSelectors.subWrappers).removeClass(this.options.stateClasses.hasShadow);

			$targetWrapper.css({
				left: pullLeft,
				opacity: 1,
				zIndex: 1800 - parseInt(targetLevel)
			});

			$targetWrapper.addClass(this.options.stateClasses.hasShadow);

			this.addOpenNavigationEventListeners();
		} else {
			$(this.options.domSelectors.list).css({
				'margin-left': mobilePullLeft + 'vw'
			});
		}

		$(window).trigger(events.open);
	};

	/**
	 * Adds the event listeners when the navigation is open (only desktop)
	 */
	Widget.prototype.addOpenNavigationEventListeners = function() {
		$(document).one('keydown.' + this.uuid, function(event) {
			if (event.keyCode === 27) {
				this.closeNavigation();
			}
		}.bind(this));

		$('.modal').one('click.' + this.uuid, function() {
			this.closeNavigation();
		}.bind(this));

		$(document).one('shrink.estatico.header', function() {
			this.closeNavigation();
		}.bind(this));
	};

	/**
	 * Closes the navigation
	 */
	Widget.prototype.closeNavigation = function(removePreventScroll, controlModal) {
		if (typeof removePreventScroll === typeof undefined) {
			removePreventScroll = true;
		}

		if (typeof controlModal === typeof undefined) {
			controlModal = true;
		}

		var $wrappers = $(this.options.domSelectors.subWrappers),
				$expandableNavItems = $(this.options.domSelectors.expandable);

		$('html').removeClass(this.options.openNavClass);

		$expandableNavItems.removeClass(this.options.stateClasses.isActive);
		$wrappers.removeAttr('style');

		this.options.currentLevel = 0;

		$(window).trigger(events.close, [controlModal]);

		if (removePreventScroll) {
			window.estatico.modal.removePreventScroll();
		}

		window.estatico.modal.removePreventScroll();
	};

	/**
	 * Closes the navigation level
	 */
	Widget.prototype.closeNavigationLevel = function(levelToClose) {
		var $activeLevelWrapper = $('[data-navigation-level="' + levelToClose + '"]'),
				$levelWrapperToClose = $('[data-navigation-level="' + (levelToClose - 1) + '"]');

		$activeLevelWrapper.removeAttr('style');
		$levelWrapperToClose.find(this.options.domSelectors.expandable).removeClass(this.options.stateClasses.isActive);

		$('[data-navigation-level]').each(function() {
			if (parseInt($(this).data('navigation-level')) > levelToClose) {
				$(this).removeAttr('style');
			}
		});
	};

	/**
	 * Go Back one step (mobile only function)
	 */
	Widget.prototype.goBack = function() {
		var targetLevel = this.options.currentLevel - 1,
				pullLeft = targetLevel * -1 * 100;

		$(this.options.domSelectors.list).css({
			'margin-left': pullLeft + 'vw'
		});

		$('[data-navigation-level="' + targetLevel + '"]').find('.' + this.options.stateClasses.isActive).removeClass(this.options.stateClasses.isActive);

		this.options.currentLevel = targetLevel;
	};

	/**
	 * Resets the mobile Navigation
	 */
	Widget.prototype.resetMobileNavigation = function() {
		$(this.options.domSelectors.list).css({
			'margin-left': 0
		});

		$(this.options.domSelectors.list).find('.' + this.options.stateClasses.isActive).removeClass(this.options.stateClasses.isActive);

		this.options.currentLevel = 0;
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
