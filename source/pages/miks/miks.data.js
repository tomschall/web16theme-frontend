'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Institut Mensch in komplexen Systemen (MikS)'
		},
		title: 'Institut Mensch in komplexen Systemen (MikS)',
		leadText: 'Automatisierung und technische Vernetzung erhöhen die Komplexität unserer Arbeit. Uns beschäftigen die Menschen im Zentrum solcher Komplexität.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: 'piano.png',
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
						}, {
							'url': '#',
							'title': 'Hochschulen',
							'extraClasses': ''
						}, {
							'url': '#',
							'title': 'Hochschule für Angewandte Psychologie',
							'extraClasses': ''
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Hochschule für Angewandte Psychologie',
				subtitle: 'Institut Mensch in komplexen Systemen (MikS)',
				titleLink: '#',
				entries: [
					{
						title: 'Organisation',
						link: '#'
					},
					{
						title: 'Kooperationspartner',
						link: '#'
					},
					{
						title: 'Kernkompetenzen',
						link: '#'
					},
					{
						title: 'Dienstleitungs- und Beratungsangebot',
						link: '#'
					},
					{
						title: 'Zur Hochschule',
						link: '#',
						isBack: true
					}
				]
			})
		}
	});

module.exports = data;
