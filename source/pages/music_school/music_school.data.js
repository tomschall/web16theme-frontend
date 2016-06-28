'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Musikhochschulen'
	},
	title: 'Musikhochschulen FHNW',
	leadText: 'Wir sind eine Ausbildungs-, Forschungs- und Veranstaltungsstätte mit internationalem Flair und befinden uns im Zentrum eines sehr reichhaltigen kulturellen Angebots in der Stadt Basel.',
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
					}
				]
			}
		}, requireNew('../../widgets/hero/hero.data.js')),
		subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
			title: 'Musikhochschulen FHNW',
			logo: 'music_school_logo.png',
			subtitle: 'Hochschule für Musik',
			entries: [
				{
					title: 'Leitung',
					link: '#'
				},
				{
					title: 'Kammermusik & Ensembles',
					link: '#'
				},
				{
					title: 'Konzerte & Events',
					link: '#'
				},
				{
					title: 'Preise & Auszeichnungen',
					link: '#'
				}
			]
		})
	}
});

module.exports = data;
