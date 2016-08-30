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
				heroImage: '/assets/media/img/libraries_overview.png',
				heroAlt: 'Symbolbild',
				breadcrumb: {
					entries: [
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
				titleurl: '#',
				entries: [
					{
						title: 'Infrastruktur',
						url: '#'
					},
					{
						title: 'Organisation',
						url: '#'
					},
					{
						title: 'Medienangebot',
						url: '#'
					},
					{
						title: 'Zu allen Bibliotheken',
						url: '../library_overview/library_overview.html',
						isBack: true
					}
				]
			}),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),
			soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js')
		}
	});

module.exports = data;
