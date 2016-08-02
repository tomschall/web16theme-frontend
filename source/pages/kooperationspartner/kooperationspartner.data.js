'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Kooperationspartner (MikS)'
		},
		title: 'Kooperationspartner',
		leadText: '',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
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
							'url': '../universities_overview/universities_overview.html',
							'title': 'Hochschulen',
							'extraClasses': ''
						}, {
							'url': '../university_for_applied_psychology/university_for_applied_psychology.html',
							'title': 'Hochschule für Angewandte Psychologie',
							'extraClasses': ''
						}, {
							'url': '#',
							'title': 'Institut Mensch in komplexen Systemen (MikS)',
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
						title: 'Zum Institut',
						link: '../miks/miks.html',
						isBack: true
					}
				]
			}),
			contact: requireNew('../../widgets/contact/contact.data.js')
		}
	});

module.exports = data;
