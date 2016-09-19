'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Suchesuche mit Filter - Alle Kernkompetenzen'
		},
		title: 'Alle Kernkompetenzen',
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
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js')
		}
	});

module.exports = data;
