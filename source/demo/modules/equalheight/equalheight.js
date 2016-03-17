/*!
 * equalheight
 *
 * @author Oriol Torrent Florensa, Unic AG
 * @copyright Unic AG
 *
 * @requires ../../../assets/.tmp/modernizr.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'equalheight',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				item: '[data-' + name + '="item"]'
			},
			stateClasses: {
				// isActive: 'is_active'
			}
		},
		data = {
			// items: ["Item 1", "Item 2"]
		};

	/**
	 * Create an instance of the module
	 * @constructor
	 * @param {object} element - The DOM element to bind the module
	 * @param {object} options - Options overwriting the defaults
	 */
	function Module(element, options) {
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

	Module.prototype = $.extend(true, {}, estatico.helpers.SuperClass.prototype, Module.prototype);

	/**
	 * Initialize module, bind events.
	 * @method
	 * @public
	 */
	Module.prototype.init = function() {
		var $document = $(document);

		this.setHeights();
		$document.on(estatico.events.resize + '.' + this.uuid, this.setHeights.bind(this));

		/* Keeping this lines for future implementations
		$document.on('picturefill.loaded', _.bind(this.setHeights, this));
		$document.on(estatico.modules.panels.events.AFTER_SECTIONS_TOGGLE, _.bind(this.setHeights, this)); */
	};

	/**
	 * Calculates the max. height and applies styles
	 * @method
	 */
	Module.prototype.setHeights = function() {
		var perRow,
			$row,
			i = 0,
			j;

		this.$items = this.$element.find(this.options.domSelectors.item);

		// OrT: IE9 floating point forces rounds down, so it makes to have 1 less element per column.
		perRow = Math.floor(this.$element.width() / this.$items.outerWidth(true));

		// reset height
		this.$items.css('height', 'auto');

		// exit if there aren't columns
		if (perRow && perRow > 1) {
			for (i = 0, j = this.$items.length; i < j; i += perRow) {
				$row = this.$items.slice(i, i + perRow);

				this._equalizeHeights($row);
			}
		}
	};

	/**
	 * Sets the highest height to each of the provided elements
	 * @param $elements
	 * @returns $elements with the applied height
	 */
	Module.prototype._equalizeHeights = function($elements) {
		var maxHeight = 0,
			itemHeight = 0;

		$elements.each(function(index, element) {
			var $element = $(element);

			itemHeight = parseInt($element.outerHeight());
			maxHeight = itemHeight > maxHeight ? itemHeight : maxHeight;
		});

		return $elements.css({
			'height': maxHeight
		});
	};

	/**
	 * Unbind events, remove data, custom teardown
	 * @method
	 * @public
	 */
	Module.prototype.destroy = function() {
		// Unbind events, remove data
		estatico.helpers.SuperClass.prototype.destroy.apply(this);

		// Custom teardown (removing added DOM elements etc.)
		// If there is no need for a custom teardown, this method can be removed
		if (typeof this.$items !== 'undefined') {
			this.$items.removeAttr('style');
		}
	};

	// only execute when browser does not support flexbox. Remember to provide fallback in css as well!
	if (!Modernizr.flexbox) {
		// Make the plugin available through jQuery (and the global project namespace)
		estatico.helpers.SuperClass.register(Module, name, {
			initEvents: ['ready', 'ajaxload'],
			events: events
		});
	}

})(jQuery);
