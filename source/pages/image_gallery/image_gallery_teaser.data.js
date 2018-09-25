'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Image Gallery - Teaser Slider'
		},
		title: 'Teaser Slider',
		leadText: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			},
			requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			image_gallery: {
				slides: [
					{
						img: {
							src: '/assets/media/img/about_us_hero.png',
							alt: 'Beispielbield'
						},
						legend: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et'
					},
					{
						img: {
							src: '/assets/media/img/applied_psychology.png',
							alt: 'Beispielbield'
						},
						legend: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et'
					},
					{
						img: {
							src: '/assets/media/img/piano.png',
							alt: 'Beispielbield'
						},
						legend: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et'
					}
				]
			},
			hero: _.assign({
				heroImage: '/assets/media/img/cas_eingl_mgmt_hero.png',
				heroAlt: 'Symbolbild',
				breadcrumb: {
					entries: [
						{
							'url': '../startpage_prototype/startpage_prototype.html',
							'title': '',
							'extraClasses': 'is_home'
						}, {
							'url': '#',
							'title': 'Weiterbildung',
							'extraClasses': ''
						}, {
							'url': '.#',
							'title': 'Fachbereiche',
							'extraClasses': ''
						}
					]
				}
			},
			requireNew('../../widgets/hero/hero.data.js')),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Image Gallery Widget',
				subtitle: 'Example Integration',
				titleUrl: '#',
				entries: [
					{
						title: 'Image Gallery Numbers',
						url: './image_gallery_numbers.html'
					},
					{
						title: 'Image Gallery Thumbnails',
						url: './image_gallery_thumbnail.html'
					},
					{
						title: 'Image Gallery Standard',
						url: './image_gallery.html'
					},
					{
						title: 'Zur Übersicht',
						url: 'https://webteam.pages.fhnw.ch/web16theme-frontend/',
						isBack: true
					}
				]
			})
		}
	});

module.exports = data;
