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
				heroImage: '/assets/media/img/piano.png',
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
						}, {
							'url': '../university_for_applied_psychology/university_for_applied_psychology.html',
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
						link: '../university_for_applied_psychology/university_for_applied_psychology.html',
						isBack: true
					}
				]
			}),
			projectTeasers: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
				teasers: [
					{
						title: 'Mensch-Maschine-Interaktion im Betrieb SBB:',
						projectTime: '31.12.2018',
						variant: 'wide___third',
						text: 'Automatisierung in den Betriebszentralen der Zukunft',
						link: '#'
					},
					{
						title: 'Indirekte Steuerung und Selbstgefährdung',
						projectTime: '31.12.2018',
						variant: 'wide___third',
						text: 'Neue Herausforderungen für das betriebliche Gesundheitsmanagement: Umgang mit indirekter Steuerung und Selbstgefährdung in Betrieben',
						link: '#'
					},
					{
						title: 'Entrepreneur-Check',
						projectTime: '31.12.2018',
						variant: 'wide___third',
						text: 'Persönlichkeit & Gesundheit von Unternehmerinnen und Unternehmern',
						link: '#'
					}
				]
			})
		}
	});

module.exports = data;
