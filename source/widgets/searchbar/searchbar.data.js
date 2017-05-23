'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		dataHelper = require('../../../helpers/data.js'),
		defaultData = requireNew('../../data/default.data.js');

var templateData = {
		langStrings: {
			allResults: 'Alle Suchergebnisse'
		},
		jsonURL: '/mocks/widgets/searchbar/searchbar.json',
		searchPageURL: '/pages/search_all/search_all.html',
		introText: '<span class="bold">Geben Sie einen Suchbegriff ein</span> und suchen Sie nach Weiterbildungen Studienangeboten, Veranstaltungen, Dokumenten und anderen Inhalten.',
		introLinks: [
			{
				url: '#',
				linkText: 'Weiterbildungen und Kurse suchen'
			},
			{
				url: '#',
				linkText: 'Ausbildungen suchen'
			},
			{
				url: '#',
				linkText: 'Veranstaltungen suchen'
			}
		],
		searchPlaceholder: 'Suche'
	},
	data = _.assign(defaultData, {
		meta: {
			title: 'Globales Suchfeld | WI_005',
			description: '',
			code: dataHelper.getTemplateCode('searchbar.hbs'),
			documentation: dataHelper.getDocumentation('searchbar.md'),
			mocks: [
				{
					data: dataHelper.getFormattedJSON(templateData),
					description: null
				}
			]
		}
	}, templateData);

module.exports = data;
