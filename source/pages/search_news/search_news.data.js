'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Suche: News',
	},
	title: 'News',
	description: 'Lorem ipsum dolor sit amet ...',
	langStrings: {
		labels: {
			term: 'Suchbegriff',
      school: 'Hochschule',
      dateFrom: 'Datum von',
      dateTo: 'Datum bis',
		},
		resetFields: 'Alle Felder zurücksetzen',
    resultsFound: 'Veranstaltungen gefunden',
    labelSortDateAsc: 'Sortierung aufsteigend',
    labelSortDateDesc: 'Sortierung absteigend',
	},
	widgets: {
		header: _.assign({
			hasPromoTeaser: false,
			isCollapsible: false
		}, requireNew('../../widgets/header/header.data.js')),
		navigation: requireNew('../../widgets/navigation/navigation.data.js'),
		footer: requireNew('../../widgets/footer/footer.data.js'),
		searchpage: _.assign(requireNew('../../widgets/searchpage/searchpage.data.js'), {
			jsonURL: '/mocks/widgets/searchpage/searchpage.news.json',
			filterURL: '/mocks/widgets/searchpage/searchpage.updateFilter.json'
		}),
		hero: _.assign(requireNew('../../widgets/hero/hero.data.js'), {
			heroImage: '/assets/media/img/cas_eingl_mgmt_hero.png',
			heroAlt: 'Symbolbild',
			breadcrumb: null
		}),
		actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),
		schoolOptions: [
      {
        'optionLabel': 'Brugg/Windisch',
        'optionValue': '1000'
      },
      {
        'optionLabel': 'Basel',
        'optionValue': '1003'
      },
      {
        'optionLabel': 'Aarau',
        'optionValue': '1004'
      },
    ],
	}
});

module.exports = data;
