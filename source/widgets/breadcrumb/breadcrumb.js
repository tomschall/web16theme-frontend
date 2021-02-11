/*!
 * Carousel
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
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
		this.getListElements();
		this.getLangString();
		if (this.data.listElements.length === 0) {
			$('.widg_subnav').addClass('has-no-breadcrumb');
		}

		if (this.data.listElements.length >= 4) {
			this.addExtendBtn();
		} else if (this.data.listElements.length === 0) {
			$('.widg_subnav').addClass('has-no-breadcrumb');
		}

		this.toolTip();
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
		var totalListElements = this.data.listElements.length;

		this.data.linkText = this.$element.find('ul li a, ul li p');
		var breadCrumbWidth = $('.widg_breadcrumb ul').width();
		var subNavWidth = $('.widg_subnav').width();
		// console.log('subNavWidth', subNavWidth);
		var pageContentWidth = $('.page_content').width();
		// console.log(breadCrumbWidth, pageContentWidth, 'calc', Math.floor(Math.floor(breadCrumbWidth / totalListElements, 10) / totalListElements));
		var firstCalc = Math.floor(Math.floor(breadCrumbWidth / totalListElements, 10) / totalListElements);
		// console.log('firstCalc', firstCalc);

		var secondCalc;
		var calcDifference;
		if (window.estatico.mq.query({to: 'medium'})) {
			secondCalc = firstCalc; //- Math.floor((subNavWidth / totalListElements) / 10);
			// console.log('secondCalc, TO MEDIUM', Math.floor((subNavWidth / totalListElements) / 10), secondCalc);
		}

		if (window.estatico.mq.query({from: 'medium'})) {
			calcDifference = firstCalc - Math.floor((subNavWidth / totalListElements) / 10);
			
			if (calcDifference > 10) {
				secondCalc = firstCalc;
			} else if (calcDifference < 10 ) {
				secondCalc = Math.floor(firstCalc - calcDifference);
			} else if (calcDifference > 14) {
				secondCalc = Math.floor(firstCalc + calcDifference);
			}
			// console.log('secondCalc, FROM MEDIUM', calcDifference, secondCalc);
		}

		// Shorten link text
		if (window.estatico.mq.query({from: 'small'})) {
			if (breadCrumbWidth > pageContentWidth || breadCrumbWidth === pageContentWidth) {
				this.data.linkText.each(function() {
					var maxTitleLength = secondCalc;
					if (this.innerText.length >= maxTitleLength) {
						var shortText = $.trim(this.innerText).substring(0, maxTitleLength) + '...';
						this.classList.add('protip');
						this.innerText = shortText;
					}
				});
			}
		}
	};

	/**
	 * Add The Extend Button
	 */
	Widget.prototype.addExtendBtn = function() {
		var $lastElementToRemove = null;
		var breadCrumbWidth = $('.widg_breadcrumb ul').width();
		var pageContentWidth = $('.page_content').width();

		if (window.estatico.mq.query({from: 'small'})) {
			if (breadCrumbWidth > pageContentWidth) {
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