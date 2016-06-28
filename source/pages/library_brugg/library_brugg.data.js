'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Campusbibliothek Brugg-Windisch'
		},
		title: 'Campusbibliothek Brugg-Windisch',
		leadText: 'Die Campusbibliothek Brugg-Windisch bietet rund 200 Arbeitsplätze. Sie finden sowohl Lese- und Arbeitsplätze als auch 13 Computerarbeitsplätze sowie Netzanschluss und WIFI für portable Computer.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: 'libraries_overview.png',
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
						}, {
							'url': '../library_overview/library_overview.html',
							'title': 'Die Bibliotheken der FHNW',
							'extraClasses': ''
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Bibliotheken der FHNW',
				subtitle: 'Campusbibliothek Brugg-Windisch',
				titleLink: '#',
				entries: [
					{
						title: 'Infrastruktur',
						link: '#'
					},
					{
						title: 'Organisation',
						link: '#'
					},
					{
						title: 'Medienangebot',
						link: '#'
					},
					{
						title: 'Zu allen Bibliotheken',
						link: '../library_overview/library_overview.html',
						isBack: true
					}
				]
			})
		}
	});

module.exports = data;
