'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Suche: Alle Suchergebnisse'
		},
		title: 'Suchergebnisse',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: false
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			searchpage: _.assign(requireNew('../../widgets/searchpage/searchpage.data.js'), {
				jsonURL: '/mocks/widgets/searchpage/searchpage.json'
			}),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),

			label_search: 'Suchbegrif',
			label_btn_search: 'Suchen',
			label_reset_fields: 'Reset'
		}
	});

module.exports = data;
