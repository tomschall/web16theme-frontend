/*!
 * Image Gallery
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

		// Thumbnail navigation control - Relevant for slider with less than 5 images
		function countThumbs() {
			var setSlideToShow = 0;
			var totalImages = $('.image_gallery__thumbs img').size();

			if (totalImages <= 5) {
				setSlideToShow = totalImages;
			} else {
				setSlideToShow = 5 + 1;
			}

			return setSlideToShow;
		}

		// Thumbnail settings
		var galleryThumbnailSettings = {
			asNavFor: '.slider-remote',
			arrows: false, // must always be false
			slidesToShow: countThumbs() - 1, // must always be one digit below
			slidesToScroll: countThumbs(),
			centerMode: false,
			focusOnSelect: true,
			centerPadding: '250px',
		};

		// Responsive settings
		var galleryMobileSettings = {
			asNavFor: '.slider-remote',
			arrows: false,
			autoplay: false,
			responsive: [{
				breakpoint: 359,
				settings: {
					arrows: true,
				}
			}]
		};

		// Image caption settings
		var galleryWithLegends = {
			adaptiveHeight: true,
			arrows: false,
			asNavFor: '.slider-remote',
		};

		// Gallery default settings
		var galleryDefaults = {
			arrows: false,
			adaptiveHeight: true,
			infinite: true,
			dots: false,
			accessibility: false,
			mobileFirst: true,
			dotsClass: 'image_gallery__dots not-default',
			nextArrow: '<button type="button" class="not-default image_gallery__arrow image_gallery__next">Next</button>',
			prevArrow: '<button type="button" class="not-default image_gallery__arrow image_gallery__prev">Previous</button>',
		};

		// Loading plain gallery w/o thumbnails
		if (this.options.domSelectors.slider.length) {
			if ($('.slider-remote').length) {
				var galleryThumbSettings = mergeSettings(galleryMobileSettings, galleryDefaults);
				// console.log('GALLERY OPTIONS with THUMBNAILS -> SELECTOR SLIDER');
				// console.log(galleryThumbSettings);

				$(this.options.domSelectors.slider).slick(
					galleryThumbSettings
				);
			} else {
				// console.log('GALLERY STANDARD OPTIONS -> SELECTOR SLIDER');
				// console.log(galleryDefaults);

				$(this.options.domSelectors.slider).slick(
					galleryDefaults
				);
			}
		}

		// Image caption slider
		if (this.options.domSelectors.legend.length) {
			// console.log('GALLERY IMAGE CAPTION SETTINGS -> SELECTOR LEGEND');
			// console.log(galleryWithLegends);

			$(this.options.domSelectors.legend).slick(
				galleryWithLegends
			);
		}

		// Thumbnail slider
		if (this.options.domSelectors.thumbnails.length) {
			// console.log('THUMBNAILS CONFIGURATION -> SELECTOR THUMBNAILS');
			// console.log(galleryThumbnailSettings);

			$(this.options.domSelectors.thumbnails).slick(
				galleryThumbnailSettings
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
