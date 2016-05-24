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

	var name = 'carousel',
		events = {
			// eventname: 'eventname.estatico.' + name
		},
		defaults = {
			domSelectors: {
				// item: '[data-' + name + '="item"]'
				title: '[data-' + name + '="title"]',
				category: '[data-' + name + '="category"]',
				link: '[data-' + name + '="link"]',
				button: '[data-' + name + '="button"]',
				slider: '[data-' + name + '="slider"]',
				progressbar: '[data-' + name + '="progressbar"]'
			},
			stateClasses: {
				progressIsRunningUp: 'is_running-up',
				slideIsComing: 'is_coming',
				slideIsImportant: 'is_important',
				slideIs2ndImportant: 'is_second-important'
			},
			autoplayDuration: 10000,
			transitionSpeed: 3000,
			defaultSlideZIndex: 1000
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
		this.addEventListener();

		$('.widg_carousel__slide img').imageScale({
			rescaleOnResize: true,
			scale: 'fill'
		});

		var durationTime = this.options.autoplayDuration,
				speed = this.options.transitionSpeed;

		this.$element.find(this.options.domSelectors.slider).slick({
			appendArrows: '.widg_carousel__text',
			prevArrow: '<button data-carousel="button" class="widg_carousel__prev">Vorherige</button>',
			nextArrow: '<button data-carousel="button" class="widg_carousel__next">Nächste</button>',
			autoplay: false,
			autoplaySpeed: durationTime,
			fade: true,
			speed: speed,
			zIndex: 1000,
			useCSS: false
		});
	};

	/**
	 * Add the event listeners
	 *
	 */
	Widget.prototype.addEventListener = function() {
		var $currentSlide = null;

		this.$element.find(this.options.domSelectors.slider).on('init', function(event, slick) {
			$currentSlide = slick.$slides[slick.currentSlide];

			this.startProgressBar();
			this.setMetaInfo($($currentSlide));
		}.bind(this));

		this.$element.find(this.options.domSelectors.slider).on('afterChange', function(event, slick, currentSlide) {
			$currentSlide = slick.$slides[currentSlide];

			this.startProgressBar();
			this.setMetaInfo($($currentSlide));
		}.bind(this));

		this.$element.find(this.options.domSelectors.slider).on('beforeChange', function(event, slick, currentSlide, nextSlide, target) {
			this.doCustomTransition(slick, currentSlide, nextSlide, target);
			this.resetProgressBar();
		}.bind(this));

	};

	/**
	 * Sets the meta info (category, title, link)
	 */
	Widget.prototype.setMetaInfo = function($slide) {
		var category = $slide.data(name + '-cat'),
				title = $slide.data(name + '-title'),
				link = $slide.data(name + 'link');

		$(this.options.domSelectors.title).text(title);
		$(this.options.domSelectors.category).text(category);
		$(this.options.domSelectors.link).text(link);
	};

	/**
	 * start progressbar for the carousel
	 */
	Widget.prototype.startProgressBar = function() {
		$(this.options.domSelectors.progressbar).addClass(this.options.stateClasses.progressIsRunningUp);
	};

	/**
	 * Resets the progressbar
	 */
	Widget.prototype.resetProgressBar = function() {
		$(this.options.domSelectors.progressbar).removeClass(this.options.stateClasses.progressIsRunningUp);
	};

	Widget.prototype.doCustomTransition = function(slick, currentSlide, nextSlide, slideTarget) {
		var $currentSlide = $(slick.$slides[currentSlide]),
				$nextSlide = $(slick.$slides[nextSlide]),
				slickWidth = slick.listWidth,
				animatedLeftValue = 0,
				slickLeftValue = '',
				$currentSlideImg = $currentSlide.find('img'),
				$nextSlideImg = $nextSlide.find('img'),
				directionModifier = 1; // 1 for next, -1 for previous

		if (slideTarget === 'previous' || slideTarget === 'right') {
			directionModifier = -1;
		}

		$nextSlide.css('visibility', 'visible').addClass(this.options.stateClasses.slideIs2ndImportant);

		$nextSlideImg.css({
			left: directionModifier * slickWidth / 10
		});

		slickLeftValue = $currentSlide.css('left');
		animatedLeftValue = parseInt($currentSlide.css('left')) - slickWidth;

		if (directionModifier === -1) {
			animatedLeftValue = parseInt($currentSlide.css('left')) + slickWidth;
		}

		$currentSlide.removeClass(this.options.stateClasses.slideIs2ndImportant);
		$currentSlide.addClass(this.options.stateClasses.slideIsImportant).animate({
			'left': animatedLeftValue
		}, this.options.transitionSpeed, function() {
			$(this).removeClass('is_important');
			$(this).css('visibility', 'hidden');
			$(this).css('left', slickLeftValue);
		});

		$currentSlideImg.animate({
			'left': directionModifier * slickWidth
		}, this.options.transitionSpeed, function() {
			$(this).css('left', '0px');
		});

		$nextSlideImg.animate({
			'left': 0
		}, this.options.transitionSpeed);
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
