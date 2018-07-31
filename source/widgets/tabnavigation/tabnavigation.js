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
				bar: '[data-' + name + '="bar"]',
				accordeonButton: '[data-' + name + '="accordeonButton"]'
			},
			stateClasses: {
				isActive: 'is_active'
			}
		},
		data = {
			content: [],
			buttons: [],
			accordeonButtons: []
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
	 * Initialize Widget, bind events adding the objects to data, mapping the indices, and set the first element active.
	 * @method
	 * @public
	 */
	Widget.prototype.init = function() {
		this.$element.find(this.options.domSelectors.button).map(function(index, element) {
			$(element).data('tabnavigation-index', index);
		}.bind(this));

		this.$element.find(this.options.domSelectors.accordeonButton).map(function(index, element) {
			$(element).data('tabnavigation-index', index);
		}.bind(this));

		this.$element.find(this.options.domSelectors.content).attr('data-widget', this.uuid);

		data.content = this.$element.find(this.options.domSelectors.content).toArray();
		data.buttons = this.$element.find(this.options.domSelectors.button).toArray();
		data.accordeonButtons = this.$element.find(this.options.domSelectors.accordeonButton).toArray();

		this.addEventHandlers();
		this.setElementActive(this.$element.find(this.options.domSelectors.button).first());

		if (window.location.hash) {
			this.checkAndOpenHash(window.location.hash);
		}

	};

	// Checks if hash can be found and opens it if necessary
	Widget.prototype.checkAndOpenHash = function(hash) {
		var hasChildWithHash = this.$element.find(hash).length > 0;

		if (hasChildWithHash) {
			this.setElementActive(this.$element.find(hash));
		}
	};

	/**
	 * Adding the event handlers
	 */
	Widget.prototype.addEventHandlers = function() {
		this.$element.find(this.options.domSelectors.button).on('click.' + this.uuid, function(event) {
			this.setElementActive($(event.target));
			event.preventDefault(); // avoid submitting forms!
		}.bind(this));

		this.$element.find(this.options.domSelectors.accordeonButton).on('click.' + this.uuid, function(event) {
			if ($(event.target).hasClass(this.options.stateClasses.isActive)) {
				this.closeSpecific($(event.target));
			} else {
				this.setElementActive($(event.target));
			}
			event.preventDefault(); // avoid submitting forms!
		}.bind(this));
	};

	/**
	 * Setting the element active, according to the button (or accordeon content) for mobile devices)
	 * @param $button normal button or accordeon button
	 */
	Widget.prototype.setElementActive = function($button) {
		var $accButton = null;

		if ($button.hasClass('content__accordeon-button')) {
			$accButton = $button;
			$button = $(data.buttons[$accButton.data('tabnavigation-index')]);
		} else {
			$accButton = $(data.accordeonButtons[$button.data('tabnavigation-index')]);
		}

		var index = $button.data('tabnavigation-index'),
				$contents = this.$element.find(this.options.domSelectors.content + '[data-widget="' + this.uuid + '"]'),
				$content = $contents.map(function(mapIndex, element) {
					if (index === mapIndex) {
						return $(element);
					}
					return undefined;
				});

		this.closeOther();

		if (window.estatico.mq.query({to: 'medium'})) {
			$content[0].slideDown(250);
		}

		$button.addClass(this.options.stateClasses.isActive).attr('aria-expanded', 'true');
		$accButton.addClass(this.options.stateClasses.isActive).attr('aria-expanded', 'true');
		$content[0].addClass(this.options.stateClasses.isActive).attr('aria-hidden', 'false');

		this.moveNavBar($button);
	};

	/**
	 * Moving the nav bar below the navigation
	 * @param $button the button on which the bar should be attached
	 */
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

	/**
	 * Closing all other tabs
	 */
	Widget.prototype.closeOther = function() {
		if (window.estatico.mq.query({to: 'medium'})) {
			this.$element.find(this.options.domSelectors.content + '.' + this.options.stateClasses.isActive).slideUp(250);
		}

		this.$element.find(this.options.domSelectors.button).removeClass(this.options.stateClasses.isActive).attr('aria-expanded', 'false');
		this.$element.find(this.options.domSelectors.accordeonButton).removeClass(this.options.stateClasses.isActive).attr('aria-expanded', 'false');
		this.$element.find(this.options.domSelectors.content).removeClass(this.options.stateClasses.isActive).attr('aria-hidden', 'true');
	};

	/**
	 * Close specific accordeon
	 * @param $accButton
	 */
	Widget.prototype.closeSpecific = function($accButton) {
		var $button = $(data.buttons[$accButton.data('tabnavigation-index')]),
				$content = $(data.content[$accButton.data('tabnavigation-index')]);

		$content.slideUp(250);

		$button.removeClass(this.options.stateClasses.isActive).attr('aria-expanded', 'false');
		$accButton.removeClass(this.options.stateClasses.isActive).attr('aria-expanded', 'false');
		$content.removeClass(this.options.stateClasses.isActive).attr('aria-hidden', 'true');

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
