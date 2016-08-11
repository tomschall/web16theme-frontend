/**
 * Handles the functions to get search results from ajax and put them into proper html-structure
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	var searchbarURL = '/mocks/widgets/searchbar/searchbar.json',
			searchpageURL = '/mocks/widgets/searchpage/searchpage.json',
			events = {
				dataLoaded: 'dataLoaded.estatico.search'
			},

			listEntryTemplates = {
				normal: '<li class="search__result-normal"><a href="{{link}}"><span class="title">{{title}}</span>{{#each additionalInformation}} <span class="{{type}} visible-in-page">{{text}}</span>{{/each}} </a></li>',
				event: '<li class="search__result-event"><a href="{{link}}"><span class="title">{{title}}</span><span class="event-info">{{eventDetail}}</span></a></li>',
				doc: '<li class="search__result-doc"><a href="{{link}}"><span class="title">{{title}}<span class="visible-in-bar">({{fileType}})</span></span><span class="file-type">{{fileType}}</span></a></li>'
			};

	function generateSearchListItem(listEntry) {
		var template = null,
				generatedHTML = null;

		switch (listEntry.type) {
			case 'normal':
				template = Handlebars.compile(listEntryTemplates.normal);
				break;
			case 'event':
				template = Handlebars.compile(listEntryTemplates.event);
				break;
			case 'doc':
				template = Handlebars.compile(listEntryTemplates.doc);
				break;
		}

		generatedHTML = template(listEntry);

		return generatedHTML;
	}

	/**
	 * Handles the returned data and puts it in the html Templates
	 * @param data
   */
	function handleReturnData(data) {
		var responseData = data.response,
				$searchCategory = null,
				$categoryList = null,
				$categoryTitle = null,
				$tempListDOM = null,
				$responseHTML = $('<div class="search__results"></div>');

		responseData.forEach(function(entry) {
			$searchCategory = $('<div class="search__cat"></div>');
			$categoryList = $('<ul></ul>');

			if (entry.categoryLink) {
				$categoryTitle = $('<a class="search__cat-title" href="' + entry.categoryLink + '">' + entry.categoryTitle + '</a>');
			} else {
				$categoryTitle = $('<span class="search__cat-title">' + entry.categoryTitle + '</span>');
			}

			entry.entries.forEach(function(listEntry) {
				$tempListDOM = generateSearchListItem(listEntry);

				$categoryList.append($tempListDOM);
			});

			$searchCategory.append($categoryTitle).append($categoryList);
			$responseHTML.append($searchCategory);
		});

		$(window).trigger(events.dataLoaded, $responseHTML);
	}

	/**
	 * Execs the search
	 * @param query the single word search query
	 * @param isSearchbar if the search is triggered in the searchbar (different ajax target)
   */
	function search(query, isSearchbar) {
		if (typeof isSearchbar === typeof undefined) {
			isSearchbar = false;
		}

		var targetUrl = searchpageURL;

		if (isSearchbar) {
			targetUrl = searchbarURL;
		}

		if (query) {
			$.ajax({
				data: query,
				dataType: 'json',
				success: handleReturnData,
				url: targetUrl
			});
		} else {
			console.error('No search query defined');
		}
	}

	function transformToAssocArray(searchprmtrs) {
		var params = {},
				pmarr = searchprmtrs.split('&');

		for (var i = 0; i < pmarr.length; i++) {
			var tmparr = pmarr[i].split('=');

			params[tmparr[0]] = tmparr[1];
		}

		return params;
	}

	function getSearchParameters() {
		var searchprmtrs = window.location.search.substr(1);

		return searchprmtrs !== null && searchprmtrs !== '' ? transformToAssocArray(searchprmtrs) : {};
	}

	// Save to global namespace
	$.extend(true, estatico, {
		search: {
			search: search,
			getSearchParameters: getSearchParameters
		}
	});
})(jQuery);
