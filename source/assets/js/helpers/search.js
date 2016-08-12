/**
 * Handles the functions to get search results from ajax and put them into proper html-structure
 *
 * @license APLv2
 */

;(function($, undefined) {
	'use strict';

	var searchbarURL = '/mocks/widgets/searchbar/searchbar.json',
			searchpageURL = '/mocks/widgets/searchpage/searchpage.json',
			searchpageCategoryURL = '/mocks/widgets/searchpage/searchpage.category.json',
			events = {
				dataLoaded: 'dataLoaded.estatico.search'
			},

			listEntryTemplates = {
				normal: '<li class="search__result-normal"><a href="{{link}}"><span class="title">{{title}}</span>{{#each additionalInformation}} <span class="{{type}} visible-in-page">{{text}}</span>{{/each}} </a></li>',
				event: '<li class="search__result-event"><a href="{{link}}"><span class="title">{{title}}</span><span class="event-info">{{eventDetail}}</span></a></li>',
				doc: '<li class="search__result-doc"><a href="{{link}}"><span class="title">{{title}}<span class="visible-in-bar">({{fileType}})</span></span><span class="file-type">{{fileType}}</span></a></li>'
			},
			activeCategorySearch = false;

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
	 * Generates the result table for the category search
	 * @param data
   */
	function generateResultTable(data) {
		var results = data.response.results,
				headers = data.response.headers,
				$responseHTML = $('<table></table>'),
				$headersRow = $('<tr></tr>'),
				$tempRow = $('<tr></tr>');

		headers.forEach(function(header) {
			if (header === 'URL') {
				$headersRow.append('<th class="url">' + header + '</th>');
			} else {
				$headersRow.append('<th>' + header + '</th>');
			}
		});

		$responseHTML.append($headersRow);

		results.forEach(function(row) {
			$tempRow = $('<tr></tr>');

			row.forEach(function(cell) {
				$tempRow.append('<td data-searchpage="' + cell.type + '">' + cell.text + '</td>');
			});

			$responseHTML.append($tempRow);
		});

		return $responseHTML;
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

		if (activeCategorySearch) {
			$responseHTML.addClass('search__table').append(generateResultTable(data));
		} else {
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
		}

		$(window).trigger(events.dataLoaded, $responseHTML);
	}

	/**
	 * Execs the search
	 * @param query the single word search query
	 * @param isSearchbar if the search is triggered in the searchbar (different ajax target)
	 * @param isCategorySearch if the search should be a category search (different ajax target and different templates)
   */
	function search(query, isSearchbar, isCategorySearch) {
		if (typeof isSearchbar === typeof undefined) {
			isSearchbar = false;
		}

		if (typeof isCategorySearch === typeof undefined) {
			isCategorySearch = false;
		}

		activeCategorySearch = isCategorySearch;

		var targetUrl = searchpageURL;

		if (isSearchbar) {
			targetUrl = searchbarURL;
		} else if (isCategorySearch) {
			targetUrl = searchpageCategoryURL;
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
