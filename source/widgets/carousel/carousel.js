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
				progressbar: '[data-' + name + '="progressbar"]',
				images: '[data-' + name + '="slide-img"]',
				infoBox: '[data-' + name + '="info-box"]',
				video: '[data-' + name + '="slide-video"]'
			},
			stateClasses: {
				slideIsComing: 'is_coming',
				slideIsImportant: 'is_important',
				slideIs2ndImportant: 'is_second-important',
				slideIsZoomed: 'is_zoomed'
			},
			autoplayDuration: 7500,
			transitionSpeed: 1000,
			initTransitionSpeed: 1000,
			isAutoplay: true
		},
		data = {
			videos: null
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

		$(this.options.domSelectors.images).imageScale({
			rescaleOnResize: true
		});

		var durationTime = this.options.autoplayDuration,
				speed = this.options.transitionSpeed;

		this.$element.find(this.options.domSelectors.slider).slick({
			appendArrows: '.widg_carousel__info-box',
			prevArrow: '<button data-carousel="button" class="widg_carousel__prev not-default">Vorherige</button>',
			nextArrow: '<button data-carousel="button" class="widg_carousel__next not-default">Nächste</button>',
			autoplay: true,
			autoplaySpeed: durationTime,
			fade: true,
			speed: speed,
			useCSS: false,
			pauseOnHover: true
		});

		this.initVideoProperties();

		if (this.$element.find('video').length > 0) {
			this.resizeVideo();

			this.$element.find('video')[0].play();
		}
	};

	/**
	 * Add the event listeners
	 *
	 */
	Widget.prototype.addEventListener = function() {
		var $currentSlide = null;

		this.$element.find(this.options.domSelectors.slider).on('init.' + this.uuid, function(event, slick) {
			$currentSlide = slick.$slides[slick.currentSlide];

			this.$element.find(this.options.domSelectors.slider).animate({
				opacity: '1'
			}, this.options.initTransitionSpeed);

			this.$element.find(this.options.domSelectors.images).addClass(this.options.stateClasses.slideIsZoomed);

			this.startProgressBar();
			this.setMetaInfo($($currentSlide));
		}.bind(this));

		this.$element.find(this.options.domSelectors.slider).on('afterChange.' + this.uuid, function(event, slick, currentSlide) {
			$currentSlide = slick.$slides[currentSlide];

			this.startProgressBar();
			this.setMetaInfo($($currentSlide));
		}.bind(this));

		this.$element.find(this.options.domSelectors.slider).on('beforeChange.' + this.uuid, function(event, slick, currentSlide, nextSlide, target) {
			if (target !== 'no target') {
				this.$element.find(this.options.domSelectors.slider).slick('slickPause');
				this.hideProgressBar();
			}

			this.doCustomTransition(slick, currentSlide, nextSlide, target);
			this.resetProgressBar();
		}.bind(this));

		$(window).on('keydown.' + this.uuid, function(event) {
			switch (event.keyCode) {
				case 37:
					this.$element.find(this.options.domSelectors.slider).slick('slickPrev');
					break;
				case 39:
					this.$element.find(this.options.domSelectors.slider).slick('slickNext');
					break;
			}
		}.bind(this));

		$('.widg_carousel__scroll').on('click.' + this.uuid, function() {
			$('html, body').animate({
				scrollTop: $('.hero').outerHeight() - 100
			}, 300);
		});

		$(window).on('open.estatico.navigation', function() {
			this.hideProgressBar();
		}.bind(this));

		$(window).on('open.estatico.searchbar', function() {
			this.hideProgressBar();
		}.bind(this));
	};

	/**
	 * Sets the meta info (category, title, link)
	 */
	Widget.prototype.setMetaInfo = function($slide) {
		var category = $slide.data(name + '-cat'),
				title = $slide.data(name + '-title'),
				link = $slide.data(name + '-link');

		$(this.options.domSelectors.title).text(title).animate({
			'opacity': 1
		}, this.options.transitionSpeed / 2);
		$(this.options.domSelectors.category).text(category).animate({
			'opacity': 1
		}, this.options.transitionSpeed / 2);
		$(this.options.domSelectors.link).attr('href', link).animate({
			'opacity': 1
		}, this.options.transitionSpeed / 2);

		$('.widg_carousel__arrow').animate({
			opacity: 1
		}, this.options.transitionSpeed / 2);
	};

	/**
	 * start progressbar for the carousel
	 */
	Widget.prototype.startProgressBar = function() {
		$(this.options.domSelectors.progressbar).animate({
			'width': '100%'
		}, {
			duration: this.options.autoplayDuration,
			easing: 'linear'
		});
	};

	/**
	 * Resets the progressbar
	 */
	Widget.prototype.resetProgressBar = function() {
		$(this.options.domSelectors.progressbar).css({
			'width': '0'
		});
	};

	/**
	 * Hides the progressbar
	 */
	Widget.prototype.hideProgressBar = function() {
		this.options.isAutoplay = false;

		$(this.options.domSelectors.progressbar).clearQueue().slideUp(this.options.transitionSpeed / 3);
	};

	/**
	 * Animates the custom transition
	 * @param slick
	 * @param currentSlide the current visible slide
	 * @param nextSlide the slide which should be shown negt
	 * @param slideTarget next or previous slide?
   */
	Widget.prototype.doCustomTransition = function(slick, currentSlide, nextSlide, slideTarget) {
		var $currentSlide = $(slick.$slides[currentSlide]),
				$nextSlide = $(slick.$slides[nextSlide]),
				slickWidth = slick.listWidth,
				animatedLeftValue = 0,
				slickLeftValue = '',
				$currentSlideMedia = $currentSlide.find('img, video'),
				$nextSlideMedia = $nextSlide.find('img, video'),
				directionModifier = 1, // 1 for next, -1 for previous
				$infoBox = $(this.options.domSelectors.infoBox);

		if (slideTarget === 'previous' || slideTarget === 'right') {
			directionModifier = -1;
		}

		$nextSlide.css('visibility', 'visible').addClass(this.options.stateClasses.slideIs2ndImportant);

		$nextSlideMedia.css({
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

		$infoBox.find('.widg_carousel__arrow, .widg_carousel__category, .widg_carousel__title').animate({
			'opacity': 0
		}, this.options.transitionSpeed / 2);

		$currentSlideMedia.animate({
			'left': directionModifier * (slickWidth * 0.9)
		}, this.options.transitionSpeed, function() {
			$(this).css('left', '0px');
		});

		$nextSlideMedia.animate({
			'left': 0
		}, this.options.transitionSpeed);

		// check if video can be played
		if ($nextSlideMedia.is('video')) {
			$nextSlideMedia[0].play();
		}
	};

	/**
	 * Initializes the video properties
	 */
	Widget.prototype.initVideoProperties = function() {
		// Initializes the data videos
		this.data.videos = this.$element.find(this.options.domSelectors.video).toArray();

		$.each(this.data.videos, function(name, video) {
			video.loop = true;
		});
	};

	/**
	 * Resizes the video properly
	 */
	Widget.prototype.resizeVideo = function() {
		var $videos = this.data.videos,
				videoWidth = 0,
				videoHeight = 0,
				ratio = 0,
				carouselWidth = this.$element.width(),
				carouselHeight = this.$element.height(),
				carouselRatio = carouselWidth / carouselHeight,
				transformValue = 0;

		$.each($videos, function(name, value) {
			$(value).removeAttr('style');

			videoWidth = $(value).width();
			videoHeight = $(value).height();
			ratio = videoWidth / videoHeight;

			if (ratio >= carouselRatio) {
				$(value).height(carouselHeight);

				transformValue = -1 * (($(value).width() - carouselWidth) / 2);

				$(value).css({
					transform: 'translateX(' + transformValue + 'px)'
				});
			} else {
				$(value).width(carouselWidth);

				transformValue = -1 * (($(value).height() - carouselHeight) / 2);

				$(value).css({
					transform: 'translateY(' + transformValue + 'px)'
				});
			}
		});

		$(window).one('resize.' + this.uuid, function() {
			this.resizeVideo();
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
