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
			}),
			accordeon: requireNew('../../widgets/accordeon/accordeon.data.js'),
			teaser: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
				teasers: [
					{
						title: 'Pädagogische Hochschule',
						link: '#',
						category: 'Hochschule',
						variant: 'wide___third',
						img: {
							src: 'university_teacher.png',
							alt: 'Pädagogische Hochschule'
						}
					},
					{
						title: 'Hochschule für Technik',
						link: '#',
						category: 'Hochschule',
						variant: 'wide___third',
						img: {
							src: 'university_technic.png',
							alt: 'Hochschule für Technik'
						}
					},
					{
						title: 'Hochschule für Wirtschaft',
						link: '#',
						category: 'Hochschule',
						variant: 'wide___third',
						img: {
							src: 'university_economy.png',
							alt: 'Hochschule für Wirtschaft'
						}
					},
					{
						title: 'Campusbibliothek Brugg-Windisch',
						link: '/pages/library_brugg/library_brugg.html',
						category: 'Bibliothek',
						variant: 'wide___third',
						img: {
							src: 'library_brugg.png',
							alt: 'Campusbibliothek Brugg-Windisch'
						}
					}
				]
			})
		}
	});

module.exports = data;
