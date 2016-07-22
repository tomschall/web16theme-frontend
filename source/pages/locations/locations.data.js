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
						'url': '../startpage_prototype/startpage_prototype.html',
						'title': '',
						'extraClasses': 'is_home'
					}, {
						'url': '../about_us/about_us.html',
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
		}),
		teaserLocations: requireNew('../../widgets/teaser/teaser.data.js'),
		teaserAdditionalLocations: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
			teasers: [
				{
					title: 'Standort Liestal',
					link: '#',
					img: {
						src: '/assets/media/img/standort_liestal.png',
						alt: 'Standort Liestal'
					}
				},
				{
					title: 'Standort Solothurn',
					link: '#',
					img: {
						src: '/assets/media/img/standort_solothurn.png',
						alt: 'Standort Solothurn'
					}
				}
			]
		}),
		extendedlinks: requireNew('../../widgets/extendedlinks/extendedlinks.data.js')
	}
});

module.exports = data;
