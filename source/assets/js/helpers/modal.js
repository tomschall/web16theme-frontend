/**
 * Handles the functions to get search results from ajax and put them into proper html-structure
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	/**
	 * Adds the modal to the html
	 */
	function showModal() {
		var $modal = $('<div class="modal"></div>');

		if ($('.modal').length === 0) {
			$('.page_wrapper').append($modal);
		}
	}

	/**
	 * Removes the modal from dom tree
	 */
	function hideModal() {
		$('.modal').remove();
	}

	/**
	 * Adds the prevent scroll class to prevent scrolling
	 */
	function addPreventScroll() {
		$('body').addClass('prevent-scroll');
	}

	/**
	 * Removes the prevent scroll class
	 */

	function removePreventScroll() {
		$('body').removeClass('prevent-scroll');
	}

	// Save to global namespace
	$.extend(true, estatico, {
		modal: {
			showModal: showModal,
			hideModal: hideModal,
			addPreventScroll: addPreventScroll,
			removePreventScroll: removePreventScroll
		}
	});
})(jQuery);
