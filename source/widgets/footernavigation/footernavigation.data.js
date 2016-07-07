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
					link: '#',
					title: 'Studieren'
				}, {
					link: '#',
					title: 'Weiterbilden'
				}, {
					link: '#',
					title: 'Forschung & Praxis'
				}, {
					link: '#',
					title: 'Angebote von A-Z'
				}
			]
		},
		{
			title: 'Direkteinstieg',
			subentries: [
				{
					link: '/pages/locations/locations.html',
					title: 'Standorte'
				}, {
					link: '/pages/library_overview/library_overview.html',
					title: 'Bibliotheken'
				}, {
					link: '#',
					title: 'Raumvermietung'
				}, {
					link: '#',
					title: 'Barrierefreiheit'
				}, {
					link: '#',
					title: 'Kinderbetreuung'
				}
			]
		},
		{
			title: 'Die FHNW',
			subentries: [
				{
					link: '#',
					title: 'Leitung'
				}, {
					link: '#',
					title: 'Organisation'
				}, {
					link: '#',
					title: 'Unsere Hochschulen'
				}, {
					link: '#',
					title: 'Jobs & Karriere'
				}, {
					link: '#',
					title: 'Corporate IT'
				}
			]
		},
		{
			title: 'Kontakt',
			subentries: [
				{
					link: '#',
					title: 'Medien und Öffentlichkeit'
				}, {
					link: '#',
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
