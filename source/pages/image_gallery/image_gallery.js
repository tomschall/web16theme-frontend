'use strict';
;(function($, undefined) {

  console.log('Image Gallery');

	var $document = $(document);

	$($document).ready(function() {

	$('.slider').slick({
	 slidesToShow: 1,
	 slidesToScroll: 1,
	 arrows: false,
	 fade: false,
	 asNavFor: '.slider-nav-thumbnails'
	});

	$('.slider-nav-thumbnails').slick({
	 slidesToShow: 3,
	 slidesToScroll: 1,
	 asNavFor: '.slider',
	 dots: false,
	 arrows: true,
	 focusOnSelect: true,
	 nextArrow: '<button type="button" class="not-default image_gallery__arrow image_gallery__next">Next</button>',
	 prevArrow: '<button type="button" class="not-default image_gallery__arrow image_gallery__prev">Previous</button>'
	});

	//remove active class from all thumbnail slides
	$('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');

	//set active class to first thumbnail slides
	$('.slider-nav-thumbnails .slick-slide').eq(0).addClass('slick-active');

	// On before slide change match active thumbnail to current slide
	$('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		var mySlideNumber = nextSlide;
		$('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');
		$('.slider-nav-thumbnails .slick-slide').eq(mySlideNumber).addClass('slick-active');
	});

	//UPDATED

	$('.slider').on('afterChange', function(event, slick, currentSlide){
	$('.content').hide();
	$('.content[data-id=' + (currentSlide + 1) + ']').show();

	});
});
})(jQuery);
