'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Recherche und Ausleihe'
		},
		title: 'Recherche und Ausleihe',
		leadText: 'Den Studierenden der Fachhochschule Nordwestschweiz stehen verschiedene Kataloge für eine umfassende Recherche zur Verfügung',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: '/assets/media/img/libraries_overview.png',
				heroAlt: 'Bilbiotheken',
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
							'title': 'Bibliotheken der FHNW',
							'extraClasses': ''
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Bibliotheken der FHNW',
				subtitle: null,
				logo: null,
				titleLink: '#',
				entries: [
					{
						title: 'Zu Bibliotheken',
						link: '../library_overview/library_overview.html',
						isBack: true
					}
				]
			})
		}
	});

module.exports = data;
