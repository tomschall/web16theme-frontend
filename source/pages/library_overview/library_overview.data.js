'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Bibliotheken der FHNW'
		},
		title: 'Bibliotheken der FHNW',
		leadText: 'Die Fachhochschule Nordwestschweiz FHNW verfügt an ihren verschiedenen Standorten über zahlreiche Bibliotheken',
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
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Bibliotheken der FHNW',
				subtitle: null,
				titleLink: '#',
				entries: [
					{
						title: 'Recherche und Ausleihe',
						link: '#'
					},
					{
						title: 'Anmeldung und Benutzerkonto',
						link: '#'
					},
					{
						title: 'Gebühren',
						link: '#'
					},
					{
						title: 'Zur FHNW',
						link: '../about_us/about_us.html',
						isBack: true
					}
				]
			})
		}
	});

module.exports = data;
