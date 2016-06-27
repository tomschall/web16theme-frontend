'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Standorte'
	},
	title: 'Die vier Hauptstandorte / Campusareale',
	leadText: 'Die Fachhochschule Nordwestschweiz FHNW umfasst neun Hochschulen, die auf die Hauptstandorte Aarau, Basel, Brugg/Windisch, Muttenz und Olten konzentriert sind.',
	widgets: {
		header: _.assign({
			hasPromoTeaser: false,
			isCollapsible: true
		}, requireNew('../../widgets/header/header.data.js')),
		navigation: requireNew('../../widgets/navigation/navigation.data.js'),
		footer: requireNew('../../widgets/footer/footer.data.js'),
		hero: _.assign({
			heroImage: 'locations.png',
			breadcrumbItems: {
				items: [
					{
						'url': '#',
						'title': '',
						'extraClasses': 'is_home'
					}, {
						'url': '#',
						'title': 'Die FHNW',
						'extraClasses': ''
					}
				]
			}
		}, requireNew('../../widgets/hero/hero.data.js')),
		subnav: _.merge(requireNew('../../widgets/subnav/subnav.data.js'), {
			title: 'Standorte',
			logo: null,
			subtitle: null,
			entries: null
		})
	}
});

module.exports = data;
