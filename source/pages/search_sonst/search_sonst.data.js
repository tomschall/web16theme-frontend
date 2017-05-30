'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Suche: Sonstiges web angebot der FHNW'
	},
	title: 'Sonstiges web angebot der FHNW',
	langStrings: {
		labels: {
			term: 'Suchbegriff',
			search: 'Suchen'
		},
		resetFields: 'Alle Felder zurücksetzen',
		resultsFound: 'Veranstaltungen gefunden'
	},
	widgets: {
		header: _.assign({
			hasPromoTeaser: false,
			isCollapsible: false
		}, requireNew('../../widgets/header/header.data.js')),
		navigation: requireNew('../../widgets/navigation/navigation.data.js'),
		footer: requireNew('../../widgets/footer/footer.data.js'),
		searchpage: _.assign(requireNew('../../widgets/searchpage/searchpage.data.js'), {
			jsonURL: '/mocks/widgets/searchpage/searchpage.documents.json',
			filterURL: '/mocks/widgets/searchpage/searchpage.updateFilter.json'
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
