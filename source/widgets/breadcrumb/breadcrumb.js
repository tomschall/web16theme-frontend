/*!
 *
 * Breadcrumb
 *
 */

;(function($, undefined) {
	'use strict';

	var name = 'breadcrumb',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				extendString: '[data-' + name + '="extendstring"]',
				extender: '[data-' + name + '="extender"]',
			},
			stateClasses: {
				isHidden: 'is_hidden',
			}
		},
		data = {
			listElements: null,
			extendString: null
		},
		trimmed = false;

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
		this.getListElements();
		this.getLangString();
    this.addExtendBtn();

		if (this.data.listElements.length === 0) {
			$('.widg_subnav').addClass('has-no-breadcrumb');
		}

		this.toolTip();
		this.addScrollListener();
	};

	Widget.prototype.toolTip = function() {
		$.protip();

		var el = $('.protip');
		el.protipSet({
			scheme: 'black',
			position: 'bottom',
			skin: 'default',
			arrow: true,
			size: 'small',
      width: '300'
		});
	};

	/**
	 * Get the language string from the span
	 */
	Widget.prototype.getLangString = function() {
		this.data.extendString = $(this.options.domSelectors.extendString).text();
	};

	/**
	 * Caches the list elements in the data variable
	 */
	Widget.prototype.getListElements = function() {
		this.data.listElements = this.$element.find('ul li');
		this.data.linkText = this.$element.find('ul li a, ul li p');
		this.totalListElements = this.data.listElements.length - 2;

		var contentElementWidth = $('.content__element').width();
		var maxTitleLength = null;
		var factor = 5;
		var trimFactor = 5;

		if (contentElementWidth > 550 && this.totalListElements <= 5) {
			maxTitleLength = parseInt(contentElementWidth / this.totalListElements / factor, 10) - trimFactor;

		} else if (contentElementWidth > 550 && this.totalListElements >= 5) {
			maxTitleLength = parseInt(contentElementWidth / this.totalListElements / factor, 10) - 10;
		} else {
			maxTitleLength = 50;
		}

		// Shorten link text
		if (window.estatico.mq.query({from: 'small'})) {
				this.data.linkText.each(function() {

					if (this.innerText.length >= maxTitleLength) {
						var shortText = $.trim(this.innerText).substring(0, maxTitleLength) + '...';
						this.classList.add('protip');
						this.innerText = shortText;
						trimmed = true;
					}
				}).bind(this);
		}

		// Mobile devices - gradients
		if (window.estatico.mq.query({to: 'small'})) {
			$('.widg_breadcrumb ul').addClass('gradient_next');
		}

	};

	/**
	 * Add The Extend Button
	 */
	Widget.prototype.addExtendBtn = function() {
		var $lastElementToRemove = null;

		if (window.estatico.mq.query({from: 'small'}) && trimmed === true) {
				this.getListElements();
				this.data.listElements.each(function(index) {
					if (index === 1) {
						$lastElementToRemove = $(this.data.listElements[index]);
						$lastElementToRemove.addClass(this.options.stateClasses.isHidden);
					}
				}.bind(this));

				$lastElementToRemove.after('<li class="widg_breadcrumb__extender" data-breadcrumb="extender"><button class="not-default">' +
				this.data.extendString + '</button></li>');
				$(this.options.domSelectors.extender).focus();
				this.addExtenderEvent();
		}
	};

	/**
	 * Add Extender Event
	 */
	Widget.prototype.addExtenderEvent = function() {
		$(this.options.domSelectors.extender).one('click.' + this.uuid, function() {
			$('.' + this.options.stateClasses.isHidden).removeClass(this.options.stateClasses.isHidden).attr('aria-hidden', 'false');

			$(this.options.domSelectors.extender).addClass(this.options.stateClasses.isHidden).attr('aria-hidden', 'true');
		}.bind(this));
	};

	/**
	 * Mobile - Add/remove gradient on scroll
	 */
	Widget.prototype.addScrollListener = function() {
		$('.widg_breadcrumb ul').on('scroll', function() {
			var isHomeXPos = $('.is_home').position();
			var gradientPrev = 'gradient_prev';
			var gradientNext = 'gradient_next';

			if (isHomeXPos.left >= 8.5) {
				$('.widg_breadcrumb ul').removeClass(gradientPrev);
			} else {
				$('.widg_breadcrumb ul').addClass(gradientPrev);

				if ($('.widg_breadcrumb ul li:last-child').visible()) {
					$('.widg_breadcrumb ul').removeClass(gradientNext);
				} else {
					$('.widg_breadcrumb ul').addClass(gradientNext);
				}
			}
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
