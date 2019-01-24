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

	/**
	 * Slick Slider Option Collection
	 */
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
		autoplay: false,
		responsive: [{
			breakpoint: 0,
			settings: {
				arrows: true
			}
		}],
		slidesToShow: countThumbs() - 1, // must always be one digit below
		slidesToScroll: countThumbs(),
		centerMode: false,
		focusOnSelect: true,
		centerPadding: '0px',
		swipeToSlide: true
	};


	// Loading plain gallery w/o thumbnails
	// If image caption or image thumbs is activated
	if ($('.image_gallery__legend').length || $('.image_gallery__thumbs').length) {
		var setGalleryOptions = _.pick(galleryDefaults, ['adaptiveHeight','infinite', 'arrows','dots', 'accessibility', 'mobileFirst', 'dotsClass', 'nextArrow', 'prevArrow', 'autoplay', 'responsive']);
		var gallerDefaultOptions = _.assign(setGalleryOptions, { asNavFor: '.slider-remote'});

		$(this.options.domSelectors.slider).slick(gallerDefaultOptions);

	} else {
		// Default settings without legends and thumbnails
		// IMPORTANT -> works only without asNavFor -> .slider-remote !!!
		var setGalleryDefaults = _.pick(galleryDefaults, ['adaptiveHeight','infinite', 'dots', 'arrows', 'accessibility', 'mobileFirst', 'dotsClass', 'nextArrow', 'prevArrow', 'autoplay', 'responsive']);

		$(this.options.domSelectors.slider).slick(setGalleryDefaults);
	}

	// Image legend slider settings
	if ($('.image_gallery__legend').length) {
		var setLegendOptions = _.pick(galleryDefaults, ['adaptiveHeight']);
		var galleryLegendOptions = _.assign(setLegendOptions, { asNavFor: '.slider-remote'}, { arrows: false });

		$(this.options.domSelectors.legend).slick(galleryLegendOptions);
	}

	// Thumbnail slider settings
	if ($('.image_gallery__thumbs').length) {
		var setThumbsOptions = _.pick(galleryDefaults, ['centerPadding', 'focusOnSelect', 'centerMode', 'arrows', 'swipeToSlide', 'adaptiveHeight','infinite', 'dots', 'accessibility', 'dotsClass', 'nextArrow', 'prevArrow', 'autoplay', 'responsive']);
		var galleryThumbsOptions = _.assign(setThumbsOptions, { asNavFor: '.slider-remote'}, { slidesToScroll: countThumbs() }, {slidesToShow: countThumbs() -1 }, { arrows: false });

		$(this.options.domSelectors.thumbnails).slick(galleryThumbsOptions);
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
