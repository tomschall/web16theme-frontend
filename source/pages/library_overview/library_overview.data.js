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
			hero: _.assign(requireNew('../../widgets/hero/hero.data.js'), {
				heroImage: '/assets/media/img/libraries_overview.png',
				heroAlt: 'Bibliotheken',
				breadcrumb: {
					entries: [
					]
				}
			}),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Bibliotheken der FHNW',
				subtitle: null,
				titleurl: '#',
				entries: [
					{
						title: 'Recherche und Ausleihe',
						url: '#'
					},
					{
						title: 'Anmeldung und Benutzerkonto',
						url: '#'
					},
					{
						title: 'Gebühren',
						url: '#'
					},
					{
						title: 'Zur FHNW',
						url: '../about_us/about_us.html',
						isBack: true
					}
				]
			}),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),
			soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js')
		}
	});

module.exports = data;
