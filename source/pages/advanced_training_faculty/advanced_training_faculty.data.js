'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Weiterbildung Fachbereich Soziale Arbeit'
		},
		title: 'Soziale Arbeit',
		leadText: 'Die Hochschule für Soziale Arbeit FHNW ist lokal und regional verankert, international vernetzt und in ihren Leistungen in Aus- und Weiterbildung, Forschung und Dienstleistung breit anerkannt.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
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
			}),
			locationSlider: _.assign(requireNew('../../widgets/location_slider/location_slider.data.js')),
			soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js'),
			inContentSearch: requireNew('../../widgets/in_content_search/in_content_search.data.js')
		}
	});

module.exports = data;
