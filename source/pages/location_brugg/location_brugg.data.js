'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Standort Brugg-Windisch'
		},
		title: 'Standort Brugg-Windisch',
		leadText: 'Drei Hochschulen, ein Campus',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: 'building_brugg.png',
				breadcrumbItems: {
					items: [
						{
							'url': '../startpage_prototype/startpage_prototype.html',
							'title': '',
							'extraClasses': 'is_home'
						}, {
							'url': '#',
							'title': 'Die FHNW',
							'extraClasses': ''
						}, {
							'url': '#',
							'title': 'Standorte',
							'extraClasses': ''
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Standorte',
				subtitle: 'Standort Brugg-Windisch',
				titleLink: '#',
				entries: [
					{
						title: 'Sonderöffnungszeiten',
						link: '#'
					},
					{
						title: 'Gastronomie',
						link: '#'
					},
					{
						title: 'Weitere Angebote rund um den Standort',
						link: '#'
					},
					{
						title: 'Zu allen Standorten',
						link: '../locations/locations.html',
						isBack: true
					}
				]
			})
		}
	});

module.exports = data;
