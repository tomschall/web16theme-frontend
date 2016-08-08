'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	entries: [
		{
			title: 'Angebot',
			subentries: [
				{
					url: '#',
					title: 'Studieren'
				}, {
					url: '#',
					title: 'Weiterbilden'
				}, {
					url: '#',
					title: 'Forschung & Praxis'
				}, {
					url: '#',
					title: 'Angebote von A-Z'
				}
			]
		},
		{
			title: 'Direkteinstieg',
			subentries: [
				{
					url: '/pages/locations/locations.html',
					title: 'Standorte'
				}, {
					url: '/pages/library_overview/library_overview.html',
					title: 'Bibliotheken'
				}, {
					url: '#',
					title: 'Raumvermietung'
				}, {
					url: '#',
					title: 'Barrierefreiheit'
				}, {
					url: '#',
					title: 'Kinderbetreuung'
				}
			]
		},
		{
			title: 'Die FHNW',
			subentries: [
				{
					url: '#',
					title: 'Leitung'
				}, {
					url: '#',
					title: 'Organisation'
				}, {
					url: '#',
					title: 'Unsere Hochschulen'
				}, {
					url: '#',
					title: 'Jobs & Karriere'
				}, {
					url: '#',
					title: 'Corporate IT'
				}
			]
		},
		{
			title: 'Kontakt',
			subentries: [
				{
					url: '#',
					title: 'Medien und Öffentlichkeit'
				}, {
					url: '#',
					title: 'Kontaktformular'
				}
			]
		}
	]
},
		data = _.merge(defaultData, {
			meta: {
				title: 'Footer Navigation | WI_040',
				description: '',
				code: dataHelper.getTemplateCode('footernavigation.hbs'),
				documentation: dataHelper.getDocumentation('footernavigation.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
