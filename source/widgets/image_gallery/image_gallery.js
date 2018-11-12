/*!
 * Image Gallery
 *
 * @author Unic AG
 * @copyright Unic AG
 *
 * //@requires ../../../node_modules/some/dependency.js
 */

;(function($, undefined) {
	'use strict';

	var name = 'image_gallery',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				slider: '[data-' + name + '="slider"]',
				thumbnails: '[data-' + name + '="thumbs"]',
				legend: '[data-' + name + '="legend"]'
			},
			stateClasses: {
				// isActive: 'is_active'
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

		// Merge gallery settings -> see options below
		function mergeSettings(obj, src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					obj[key] = src[key];
				}
			}
			return obj;
		}

		// Settings for thumbnails
		var galleryConfigThumbnails = {
			asNavFor: '.slider-remote',
			arrows: false, // must always be false
			slidesToShow: 5,
			slidesToScroll: 5,
			centerMode: false,
			focusOnSelect: true,
			centerPadding: '100px',
		};

		var galleryWithLegends = {
			adaptiveHeight: true,
			arrows: false,
			asNavFor: '.slider-remote',
		};

		// Settings for standard gallery with thumbnails
		var galleryConfigStandard = {
			adaptiveHeight: false,
			arrows: true,
		};

		// Settings for standard gallery with thumbnails
		var galleryConfigStandardWithThumbnails = {
			arrows: true,
			asNavFor: '.slider-remote',
		};

		// Gallery default settings
		var galleryDefaults = {
			//appendArrows: $('.image_gallery__slider'),
			adaptiveHeight: true,
			infinite: true,
			dots: false,
			mobileFirst: true,
			dotsClass: 'image_gallery__dots not-default',
			nextArrow: '<button type="button" class="not-default image_gallery__arrow image_gallery__next">Next</button>',
			prevArrow: '<button type="button" class="not-default image_gallery__arrow image_gallery__prev">Previous</button>',
		};

		// Standard Gallery
		if (this.options.domSelectors.slider.length) {
			if ($('.slider-remote').length) {
				var galleryWithThumbnials = mergeSettings(galleryConfigStandardWithThumbnails, galleryDefaults);
				//console.log('GALLERY OPTIONS with THUMBNAILS');
				//console.log(galleryWithThumbnials);

				$(this.options.domSelectors.slider).slick(
					galleryWithThumbnials
				);
			} else {
				var galleryStandardOptions = mergeSettings(galleryConfigStandard, galleryDefaults);
				//console.log('GALLERY STANDARD OPTIONS');
				//console.log(galleryStandardOptions);

				$(this.options.domSelectors.slider).slick(
					galleryStandardOptions
				);
			}
		}

		// Legends as remote for main slider
		if (this.options.domSelectors.legend.length) {
			$(this.options.domSelectors.legend).slick(
				galleryWithLegends
			);
		}

		// Add thumbnails to gallery
		if (this.options.domSelectors.thumbnails.length) {
			var galleryThumbnailOptions = mergeSettings(galleryConfigThumbnails, galleryDefaults);
			//console.log('THUMBNAILS CONFIGURATION');
			//console.log(galleryThumbnailOptions);

			$(this.options.domSelectors.thumbnails).slick(
				galleryThumbnailOptions
			);
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
