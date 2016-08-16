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
			updateFilterURL = '/mocks/widgets/searchpage/searchpage.updateFilter.json',
			events = {
				dataLoaded: 'dataLoaded.estatico.search',
				updateFilterLoaded: 'updateFilterLoaded.estatico.search'
			},

			listEntryTemplates = {
				normal: '<li class="search__result-normal"><a href="{{link}}"><span class="title">{{title}}</span>{{#each additionalInformation}} <span class="{{type}} visible-in-page">{{text}}</span>{{/each}} </a></li>',
				event: '<li class="search__result-event"><a href="{{link}}"><span class="title">{{title}}</span><span class="event-info">{{eventDetail}}</span></a></li>',
				doc: '<li class="search__result-doc"><a href="{{link}}"><span class="title">{{title}}<span class="visible-in-bar">({{fileType}})</span></span><span class="file-type visible-in-page">{{fileType}}</span></a></li>',
				showAll: '<li class="search__result-normal search__result-show-all"><a href="{{categoryLink}}">{{categoryLinkText}}</a></li>'
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
				if (cell.type === 'url') {
					$tempRow.append('<td data-searchpage="' + cell.type + '"><a href="' + cell.text + '"></a></td>');
				} else {
					$tempRow.append('<td data-searchpage="' + cell.type + '">' + cell.text + '</td>');
				}
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
				$categoryTitle = $('<span class="search__cat-title">' + entry.categoryTitle + '</span>');

				entry.entries.forEach(function(listEntry) {
					$tempListDOM = generateSearchListItem(listEntry);

					$categoryList.append($tempListDOM);
				});

				if (entry.categoryLink) {
					var template = Handlebars.compile(listEntryTemplates.showAll);

					$categoryList.append(template(entry));
				}

				$searchCategory.append($categoryTitle).append($categoryList);

				$responseHTML.append($searchCategory);
			});
		}

		$(window).trigger(events.dataLoaded, [$responseHTML, responseData.foundNumber, responseData.limitedResults]);
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

	/**
	 * Handles the update filter data (basically just triggers a new event)
	 */
	function handleUpdateFilterData(data) {
		$(window).trigger(events.updateFilterLoaded, data);
	}

	/**
	 * Sending the ajax request for update the filter
 	 * @param query
	 */
	function updateFilter(query) {
		if (query) {
			$.ajax({
				data: query,
				dataType: 'json',
				success: handleUpdateFilterData,
				url: updateFilterURL
			});
		} else {
			console.error('no update filter query defined');
		}
	}

	/**
	 * Transforms the search parameters from the url to an associative array
	 * @param searchprmtrs
	 * @returns {{}}
   */
	function transformToAssocArray(searchprmtrs) {
		var params = {},
				pmarr = searchprmtrs.split('&');

		for (var i = 0; i < pmarr.length; i++) {
			var tmparr = pmarr[i].split('=');

			params[tmparr[0]] = tmparr[1];
		}

		return params;
	}

	/**
	 * Gets the searchparameters from the windows bar and sends back an assoc array
	 * @returns {{}}
   */
	function getSearchParameters() {
		var searchprmtrs = window.location.search.substr(1);

		return searchprmtrs !== null && searchprmtrs !== '' ? transformToAssocArray(searchprmtrs) : {};
	}

	// Save to global namespace
	$.extend(true, estatico, {
		search: {
			search: search,
			getSearchParameters: getSearchParameters,
			updateFilter: updateFilter
		}
	});
})(jQuery);
