'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Hochschule für Angewandte Psychologie'
		},
		title: 'Hochschule für Angewandte Psychologie',
		leadText: 'Willkommen an der Hochschule für angewandte Psychologie FHNW. Wir machen professionelle und wissenschaftliche Psychologie für Gesellschaft und Wirtschaft nutzbar.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: 'applied_psychology.png',
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
							'url': '../universities_overview/universities_overview.html',
							'title': 'Hochschulen',
							'extraClasses': ''
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Hochschule für Angewandte Psychologie',
				entries: [
					{
						title: 'Leitung',
						link: '#'
					},
					{
						title: 'Unsere Intitute',
						link: '#'
					},
					{
						title: 'Gremien',
						link: '#'
					},
					{
						title: 'Alumni',
						link: '#'
					},
					{
						title: 'Usability-Labor',
						link: '#'
					},
					{
						title: 'Zu allen Hochschulen',
						link: '../universities_overview/universities_overview.html',
						isBack: true
					}
				]
			})
		}
	});

module.exports = data;
