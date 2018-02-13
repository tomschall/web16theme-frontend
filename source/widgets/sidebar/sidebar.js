(function($) {
	'use strict';

	/**
	 * Design names correspond to this DOM structure:
	 * 	.widg_sidebar
	 * 		.widg_sidebar__accordion
	 * 		.widg_sidebar__content
	 * 			.widg_sidebar__object
	 * 				.object__title
	 * 				.object__content
	 *
	 * On page load:
	 * 1. The content objects are copied to a floating (fixed, elevated) accordion, and set to display: none.
	 *
	 * On click of an accordion title:
	 * 2. All unfolded accordion objects are folded
	 * 3. If the clicked accordion object (parent of the title) was folded, it is unfolded
	 *
	 * On scroll and on fold/unfold of an accordion object:
	 * 4. The sidebar is sticky iif the scroll is bigger than the sidebar's distance to the document's top
	 * 5. The sidebar content's position is scrolled as if the sidebar was not sticky
	 * 6. Each accordion object is visible iif
	 * 		a) if the accordion object is not visible, the original copy surpasses the bottom of the accordion
	 * 		b) if the accordion object is visible, the original copy surpasses the last object in the accordion
	 *
	 * Pros: Conceptually simple, easy to reason about.
	 * Cons: Because of the twin show-hide transitions, a dozen lines of code will be required to avoid flashes of duplicated content
	 *
	 */


	var ANIMATION_DURATION = 250; // in ms
	var SIDEBAR_STICKY_MARGIN_TOP = 30; // in px

	// A bunch of in-memory caches to spare DOM and jQuery calls later on, specially when attending the scroll event
	var $window = $(window);
	var window_scroll_top;
	var $widg_sidebar_content = $('.widg_sidebar__content');
	var content_height;
	var $widg_sidebar_content_objects = $('.widg_sidebar__object', $widg_sidebar_content);
	var $widg_sidebar = $('.widg_sidebar');
	var widg_sidebar_margin_top;
	var $widg_sidebar_accordion;
	var $widg_sidebar_accordion_objects;
	var $widg_sidebar_accordion_titles;
	var accordion_height = 0;
	var page_content_offset_top;
	var sticky_scroll_threshold;
	var is_window_wide_enough;
	var widg_subnav_height;
	var widg_sidebar_sticky_top;

	/* Transparent place holder for when the main content is shorter than the sidebar */
	function insertMinHeightLock() {
		$widg_sidebar.clone().addClass('min_height_lock').insertAfter($widg_sidebar);
	}

	function unstickSidebar() {
		$widg_sidebar.toggleClass('sticky', false);
		$widg_sidebar.css('top', 0);
		$widg_sidebar_content.css('margin-top', 0);
	}

	function initCurrentSize() {
		window_scroll_top = $window.scrollTop();
		content_height = $widg_sidebar_content.innerHeight();
		widg_subnav_height = $('.widg_subnav').outerHeight(true);
		widg_sidebar_margin_top = widg_subnav_height - 53;
		widg_sidebar_sticky_top = -1 * widg_sidebar_margin_top + SIDEBAR_STICKY_MARGIN_TOP;
		page_content_offset_top = $('.page_content').offset().top;
		sticky_scroll_threshold = page_content_offset_top - widg_sidebar_sticky_top;
		is_window_wide_enough = window.estatico.mq.query({from: 'subnav'});

		$widg_sidebar.css('margin-top', widg_sidebar_margin_top);
		if (!is_window_wide_enough) {
			unstickSidebar();
		}
	}

	/**
	 * @post 4. The sidebar is sticky iif the scroll is bigger than the sidebar's distance to the document's top
	 * @post 5. The sidebar content's position is scrolled as if the sidebar was not sticky
	 */
	function updateSidebarContent() {
		if (window_scroll_top > sticky_scroll_threshold) {
			$widg_sidebar.css('top', widg_sidebar_sticky_top);
			$widg_sidebar.toggleClass('sticky', true);
			$widg_sidebar_content.css('margin-top', -1 *
				Math.min(
					((window_scroll_top - sticky_scroll_threshold)),
					(content_height)
				));
		} else {
			unstickSidebar();
		}
	}

	/**
	 * @post 6. Each accordion object is visible iif
	 * 		a) if the accordion object is not visible, the original copy surpasses the bottom of the accordion
	 * 		b) if the accordion object is visible, the original copy surpasses the last object in the accordion
	 */
	function updateSidebarAccordion() {
		var height_of_last_accordion_object_visible =
				$widg_sidebar_accordion_objects.filter('.displayed').last().outerHeight(true);
		$widg_sidebar_content_objects.each(function(index, element) {
			var element_offset_top = $(element).offset().top;
			var $accordion_object = $($widg_sidebar_accordion_objects.get(index));
			var element_scroll_show_threshold = element_offset_top - accordion_height - SIDEBAR_STICKY_MARGIN_TOP;
			var element_scroll_hide_threshold = element_scroll_show_threshold + height_of_last_accordion_object_visible;
			if (
					(!$accordion_object.hasClass('displayed') && (window_scroll_top > element_scroll_show_threshold)) ||
					($accordion_object.hasClass('displayed') && (window_scroll_top > element_scroll_hide_threshold))
			) {
				$accordion_object.toggleClass('displayed', true);
				window.setTimeout(function() {
					$(element).toggleClass('look-unfoldable', true);
					$accordion_object.toggleClass('look-unfoldable', true);
				}, 0);
			} else {
				$accordion_object.toggleClass('displayed', false);
				$accordion_object.toggleClass('unfolded', false);
				$accordion_object.toggleClass('look-unfoldable', false);
				$(element).toggleClass('look-unfoldable', false);
			}
		});
		accordion_height = $widg_sidebar_accordion.outerHeight(true);
	}

	/**
	 * On page load
	 */

	if (!$widg_sidebar.length) {
		return;
	}

	insertMinHeightLock();

	initCurrentSize();

	window.addEventListener('load', function() {
		// Distance to treppenhaus navigation depends on its height, which depends on its content, which is sometimes not fully known until the load event
		initCurrentSize();
	});

	// 1. The content objects are copied to a floating (fixed, elevated) accordion, and set to display: none.
	$widg_sidebar[0].insertAdjacentHTML('afterbegin', '<div class="widg_sidebar__accordion"></div>');
	$widg_sidebar_accordion = $('.widg_sidebar__accordion');
	$widg_sidebar_accordion.html($widg_sidebar_content.html());
	$widg_sidebar_accordion_objects = $('.widg_sidebar__object', $widg_sidebar_accordion);
	$widg_sidebar_accordion_titles = $('.object__title', $widg_sidebar_accordion_objects);

	/**
	 * On click of an accordion title
	 */

	$widg_sidebar_accordion_titles.on('click', function(event) {
		var $widg_sidebar_accordion_object = $(event.target).closest('.widg_sidebar__object');
		var currentIsUnfolded = $widg_sidebar_accordion_object.hasClass('unfolded');

		// 2. All unfolded accordion objects are folded
		$widg_sidebar_accordion_objects.each(function() {
			$(this).toggleClass('unfolded', false);
		});

		window.setTimeout(function() { // as in sidebar v1.0, we wait ANIMATION_DURATION ms to start unfolding
			// 3. If the clicked accordion object (parent of the title) was folded, it is unfolded
			$widg_sidebar_accordion_object.toggleClass('unfolded', !currentIsUnfolded);

			window.setTimeout(function() {
				accordion_height = $widg_sidebar_accordion.outerHeight(true);
				updateSidebarAccordion();
			}, ANIMATION_DURATION);
		}, ANIMATION_DURATION + 20);
	});

	/**
	 * On scroll
	 */

	window.addEventListener('scroll', function(e) {
		if (!is_window_wide_enough) {
			return;
		}

		window_scroll_top = $window.scrollTop();

		updateSidebarContent();
		updateSidebarAccordion();
	});

	/**
	 * On window resize
	 */

	 window.addEventListener('resize', function() {
		// setTimeout because no 'afterresize' event exists
		window.setTimeout(function afterResize() {
			initCurrentSize();
		}, 150);
	 });

})(jQuery);
