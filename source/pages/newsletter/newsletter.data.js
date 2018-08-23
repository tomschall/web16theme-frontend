'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Newsletter'
		},
		title: 'Newsletter Anmeldung Beispielseite',
		leadText: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: '/assets/media/img/panorama.jpg',
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
							'title': 'Newsletter',
							'extraClasses': ''
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Weiterbildung',
				subtitle: 'Fachbereich Soziale Arbeit',
				titleUrl: '#',
				entries: [
					{
						title: 'Inhouse-Schulungen',
						url: '#'
					},
					{
						title: 'Beirat Weiterbildung',
						url: '#'
					},
					{
						title: 'Weiterbildungs-Award',
						url: '#'
					},
					{
						title: 'Zur Weiterbildungsübersicht',
						url: '#',
						isBack: true
					}
				]
			})
		}
	});

module.exports = data;
