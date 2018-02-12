'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'FHNW Stellenangebote'
		},
		title: 'FHNW Stellenangebote',
		leadText: 'Als führende Fachhochschule bezüglich Innovationskraft und Praxisorientierung bietet die FHNW zukunftsorientierte Arbeitsplätze in der Nordwestschweiz mit attraktiven Anstellungsbedingungen und vielfältigen Laufbahnperspektiven.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign(requireNew('../../widgets/hero/hero.data.js'), {
				heroImage: '/assets/media/img/fhnw-stellenangebote.jpeg',
				heroAlt: 'Stellenangebote',
				breadcrumb: {
					entries: [
					]
				}
			}),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Stellenangebote der FHNW',
				subtitle: null,
				titleurl: '#',
				entries: [
					{
						title: 'Ansprechstellen Personal FHNW',
						url: 'https://www.fhnw.ch/de/karriere/offene-stellen/se-pe-ansprechstellen-personal-fhnw.pdf'
					},
					{
						title: 'Zurück zu Erste Wahl - FHNW',
						url: 'https://www.fhnw.ch/de/karriere/',
						isBack: true
					}
				]
			}),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),
			soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js')
		}
	});

module.exports = data;
