'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Suche mit Filter - Kontaktpersonsensuche'
		},
		title: 'Kontaktpersonensuche',
	    langStrings: {
			resetFields: 'Alle Felder zurücksetzen',
			resultsFound: 'Kontaktpersonen gefunden'
		},
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: false
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			searchpage: _.assign(requireNew('../../widgets/searchpage/searchpage.data.js'), {
				jsonURL: '/mocks/widgets/searchpage/searchpage.profiles.json'
			}),
			hero: _.assign(requireNew('../../widgets/hero/hero.data.js'), {
				heroImage: '/assets/media/img/cas_eingl_mgmt_hero.png',
				heroAlt: 'Symbolbild',
				breadcrumb: null
			}),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js')
		}
	});

module.exports = data;
