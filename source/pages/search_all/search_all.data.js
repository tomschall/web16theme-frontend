'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Suche: Alle Suchergebnisse'
		},
		title: 'Suchergebnisse',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: false
			}, requireNew('../../widgets/header/header.data.js')),
			hero: _.assign(
				{
					heroImage: '/assets/media/img/panorama.jpg',
					heroAlt: 'Symbolbild',
					breadcrumb: {
						entries: [
							{
								url: '../startpage_prototype/startpage_prototype.html',
								title: '',
								extraClasses: 'is_home',
							},
							{
								url: '#',
								title: 'Die FHNW',
								extraClasses: '',
							},
							{
								url: '#',
								title: 'Suche',
								extraClasses: '',
							},
						],
					},
				},
				requireNew('../../widgets/hero/hero.data.js')
			),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Die FHNW',
				subtitle: 'Suchen',
				titleUrl: '#',
				entries: [
					{
						title: 'Studium suchen',
						url: '#',
						isBack: false,
					},
					{
						title: 'Weiterbildungen und Kurse suchen',
						url: '#',
						isBack: false,
					},
					{
						title: 'Personen suchen',
						url: '#',
						isBack: false,
					},
					{
						title: 'Veranstaltungen suchen',
						url: '#',
						isBack: false,
					},
					{
						title: 'News suchen',
						url: '#',
						isBack: false,
					},
					{
						title: 'Startseite',
						url: '#',
						isBack: true,
					},
				],
			}),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),

			label_search: 'Suchbegrif',
			label_btn_search: 'Suchen',
			label_reset_fields: 'Reset'
		}
	});

module.exports = data;
