/*!
 * Accordeon
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/qunitjs/qunit/qunit.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'accordeon',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				entry: '[data-accordeon="entry"]',
				button: '[data-accordeon="button"]',
				content: '[data-accordeon="content"]'
			},
			stateClasses: {
				isOpen: 'is_open'
			},
			allowsMultiple: true // always open
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
		this.addEventHandlers();

		if (this.$element.data('multiple')) {
			this.options.allowsMultiple = true;
		}

		if (window.location.hash) {
			this.checkAndOpenHash(window.location.hash);
		}

		this.checkAndReplaceUmlaute();
	};

	// Checks if hash can be found and opens it if necessary
	Widget.prototype.checkAndOpenHash = function(hash) {
		if (hash.indexOf('=') >= 0 || hash === '#') {
			// do nothing if search string is present, or if hash is empty
			return;
		}

		var hasChildWithHash = this.$element.find(hash).length > 0;

		if (hasChildWithHash) {
			this.addActiveClass(this.$element.find(hash).find(this.options.domSelectors.button));
		}
	};

	/**
	 * Adding the event handlers
	 * @method
	 * @public
	 */
	Widget.prototype.addEventHandlers = function() {
		this.$element.find('a' + this.options.domSelectors.button).on('click', function() {
			return false;
		});

		this.$element.find(this.options.domSelectors.button).on('click.' + this.uuid, function(event) {
			if ($(event.currentTarget).closest(this.options.domSelectors.entry).hasClass(this.options.stateClasses.isOpen)) {
				if (!this.options.allowsMultiple) {
					this.closeOpenEntries();

				} else {
					this.closeThisEntry($(event.currentTarget));
				}

			} else {
				this.addActiveClass($(event.currentTarget));
				var hasTable = this.$element.find('table');

				$(hasTable).each(function() {
					if ($(this).is(':visible')) {
						var tableWidth = $(this).find('tbody').width();
						var contentElem = $(this).parent().width();
						// console.log('table', tableWidth, 'contentElem', contentElem);

						if (tableWidth > contentElem) {
							$(this).removeClass('scroll');
						}
					}
				});
			}
		}.bind(this));

		$(window).on('hashchange', function() {
			this.checkAndOpenHash(window.location.hash);
		}.bind(this));
	};

	Widget.prototype.scrollToOpenButton = function($button) {
		// calculate eventual scroll
		var $openEntry = this.$element.find(this.options.domSelectors.entry + '.' + this.options.stateClasses.isOpen);
		if ($button.parent().prevAll($openEntry).length !== 0) {
			// if currently open entry is before and it closes, scroll might be necessary
			var top = $button.offset().top - parseInt($button.css('marginTop'), 10) - parseInt($button.css('paddingTop'), 10),
				openHeight = $openEntry.find(this.options.domSelectors.content).outerHeight(true),
				scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

			if (top - openHeight < scrollTop) {
				$('html, body').animate({
					scrollTop: top - openHeight
				}, 500);
			}
			this.$element.find(this.options.domSelectors.button);
		}
	};

	/**
	 * Adds the active classes for button
	 * @param $button
    */
	Widget.prototype.addActiveClass = function($button) {
		if (!this.options.allowsMultiple) {
			this.scrollToOpenButton($button);
			this.closeOpenEntries();
		}

		$button.closest(this.options.domSelectors.entry).addClass(this.options.stateClasses.isOpen);
		$button.closest(this.options.domSelectors.entry).find(this.options.domSelectors.content).attr('aria-hidden', 'false');
		$button.closest(this.options.domSelectors.entry).find(this.options.domSelectors.content).slideDown(500);
		$button.attr('aria-expanded', 'true');
	};

	/**
	 * Closes all open entries
	 */
	Widget.prototype.closeOpenEntries = function() {
		this.$element.find(this.options.domSelectors.entry + '.' + this.options.stateClasses.isOpen).find(this.options.domSelectors.content).slideUp(500);
		this.$element.find(this.options.domSelectors.entry + '.' + this.options.stateClasses.isOpen).removeClass(this.options.stateClasses.isOpen);
		this.$element.find(this.options.domSelectors.entry + '.' + this.options.stateClasses.isOpen).find(this.options.domSelectors.content).attr('aria-hidden', 'true');
		this.$element.find(this.options.domSelectors.entry + '.' + this.options.stateClasses.isOpen).find(this.options.domSelectors.button).attr('aria-expanded', 'false');
	};

	/**
	 * Closes this specific entry
	 */
	Widget.prototype.closeThisEntry = function($target) {
		$target.closest(this.options.domSelectors.entry).find(this.options.domSelectors.content).slideUp(500);
		$target.closest(this.options.domSelectors.entry).removeClass(this.options.stateClasses.isOpen);
		$target.closest(this.options.domSelectors.entry).find(this.options.domSelectors.content).attr('aria-hidden', 'true');
		$target.attr('aria-expanded', 'false');
	};

	Widget.prototype.checkAndReplaceUmlaute = function() {
		var umlautMap = {
			'\u00dc': 'UE',
			'\u00c4': 'AE',
			'\u00d6': 'OE',
			'\u00fc': 'ue',
			'\u00e4': 'ae',
			'\u00f6': 'oe',
			'\u00df': 'ss',
		};

		function replaceUmlaute(str) {
			return str
				.replace(/[\u00dc|\u00c4|\u00d6][a-z]/g, function(a) {
					var big = umlautMap[a.slice(0, 1)];
					return big.charAt(0) + big.charAt(1).toLowerCase() + a.slice(1);
				})
				.replace(new RegExp('[' + Object.keys(umlautMap).join('|') + ']', 'g'),
					function(a) {
						return umlautMap[a];
					}
				);
		}

		$('.widg_accordeon__entry').each(function() {
				var str = $(this).attr('id');
				$(this).attr('id', replaceUmlaute(str));
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
