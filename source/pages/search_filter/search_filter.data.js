'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Suche mit Filter - Weiterbildungsangebot der FHNW'
		},
		title: 'Weiterbildungsangebot der FHNW',
		langStrings: {
			resetFields: 'Alle Felder zurücksetzen',
			resultsFound: 'Weiterbildungsangebote gefunden',
			extSearch: 'Erweiterte Suche'
		},
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: false
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			searchpage: requireNew('../../widgets/searchpage/searchpage.data.js'),
			hero: _.assign(requireNew('../../widgets/hero/hero.data.js'), {
				heroImage: '/assets/media/img/cas_eingl_mgmt_hero.png',
				heroAlt: 'Symbolbild',
				breadcrumb: null
			}),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js')
		}
	});

module.exports = data;
