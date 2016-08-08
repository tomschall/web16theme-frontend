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
				heroImage: '/assets/media/img/building_brugg.png',
				heroAlt: 'Gebäude Brugg-Windisch',
				breadcrumb: {
					entries: [
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
				titleUrl: '#',
				entries: [
					{
						title: 'Sonderöffnungszeiten',
						url: '#'
					},
					{
						title: 'Gastronomie',
						url: '#'
					},
					{
						title: 'Weitere Angebote rund um den Standort',
						url: '#'
					},
					{
						title: 'Zu allen Standorten',
						url: '../locations/locations.html',
						isBack: true
					}
				]
			}),
			accordeon: requireNew('../../widgets/accordeon/accordeon.data.js'),
			teaser: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
				teasers: [
					{
						title: 'Pädagogische Hochschule',
						url: '#',
						category: 'Hochschule',
						variant: 'wide___third',
						img: {
							src: '/assets/media/img/university_teacher.png',
							alt: 'Pädagogische Hochschule'
						}
					},
					{
						title: 'Hochschule für Technik',
						url: '#',
						category: 'Hochschule',
						variant: 'wide___third',
						img: {
							src: '/assets/media/img/university_technic.png',
							alt: 'Hochschule für Technik'
						}
					},
					{
						title: 'Hochschule für Wirtschaft',
						url: '#',
						category: 'Hochschule',
						variant: 'wide___third',
						img: {
							src: '/assets/media/img/university_economy.png',
							alt: 'Hochschule für Wirtschaft'
						}
					},
					{
						title: 'Campusbibliothek Brugg-Windisch',
						url: '/pages/library_brugg/library_brugg.html',
						category: 'Bibliothek',
						variant: 'wide___third',
						img: {
							src: '/assets/media/img/library_brugg.png',
							alt: 'Campusbibliothek Brugg-Windisch'
						}
					}
				]
			})
		}
	});

module.exports = data;
