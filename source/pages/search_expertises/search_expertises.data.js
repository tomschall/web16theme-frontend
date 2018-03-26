'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Suche: Kernkompetenzen'
		},
		title: 'Kernkompetenzen',
		langStrings: {
			labels: {
				term: 'Suchbegriff',
				faculty: 'Fachbereich'
			},
			resetFields: 'Alle Felder zurücksetzen',
			resultsFound: 'Kernkompetenzen gefunden'
		},
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: false
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			searchpage: _.assign(requireNew('../../widgets/searchpage/searchpage.data.js'), {
				jsonURL: '/mocks/widgets/searchpage/searchpage.expertises.json'
			}),
			hero: _.assign({
				heroImage: '/assets/media/img/cas_eingl_mgmt_hero.png',
				heroAlt: 'Symbolbild'
			}, requireNew('../../widgets/hero/hero.data.js')),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),
			facultyOptions: [
				{
					'optionLabel': 'Architektur, Bau & Geomatik',
					'optionValue': '1000'
				},
				{
					'optionLabel': 'International Studies',
					'optionValue': '1003'
				},
				{
					'optionLabel': 'Life Sciences',
					'optionValue': '1004'
				},
				{
					'optionLabel': 'Musik',
					'optionValue': '1005'
				},
			],
		}
	});

module.exports = data;
