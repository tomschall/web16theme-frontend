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
				heroImage: '/assets/media/img/applied_psychology.png',
				heroAlt: 'Symbolbild',
				breadcrumb: {
					entries: [
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
						url: '#'
					},
					{
						title: 'Unsere Intitute',
						url: '#'
					},
					{
						title: 'Gremien',
						url: '#'
					},
					{
						title: 'Alumni',
						url: '#'
					},
					{
						title: 'Usability-Labor',
						url: '#'
					},
					{
						title: 'Zu allen Hochschulen',
						url: '../universities_overview/universities_overview.html',
						isBack: true
					}
				]
			}),
			eventTeasers: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
				teasers: [
					{
						title: 'Info-Veranstaltung Master of Science Angewandte Psychologie',
						date: '04.05.2016',
						url: '#',
						variant: 'wide___third',
						img: {
							src: '/assets/media/img/apevent1.png',
							alt: 'Event für Angewandte Psychologie 1'
						}
					},{
						title: 'Info-Veranstaltung Bachelor Angewandte Psychologie',
						date: '04.05.2016',
						url: '#',
						variant: 'wide___third',
						img: {
							src: '/assets/media/img/apevent2.png',
							alt: 'Event für Angewandte Psychologie 2'
						}
					}, {
						title: 'Forum Wirtschaftspsychologie',
						date: '04.05.2016',
						url: '#',
						variant: 'wide___third',
						img: {
							src: '/assets/media/img/apevent3.png',
							alt: 'Event für Angewandte Psychologie 3'
						}
					}
				]
			}),
			instituteTeasers: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
				teasers: [
					{
						title: 'Institut Mensch in komplexen Systemen (MikS)',
						url: '/pages/miks/miks.html',
						variant: 'wide___third',
						img: {
							src: '/assets/media/img/miks_teaser.png',
							alt: 'MikS'
						}
					}, {
						title: 'Institut für Kooperationsforschung und -entwicklung (ifk)',
						url: '#',
						variant: 'wide___third',
						img: {
							src: '/assets/media/img/ifk_teaser.png',
							alt: 'ifk'
						}
					}
				]
			}),
			extendedLinks: _.assign(requireNew('../../widgets/extendedlinks/extendedlinks.data.js'), {
				links: [
					{
						title: '10 Diplome überreicht',
						description: 'Zehn Absolventinnen des modularen Weiterbildungsprogramms MAS (Master of Advanced Studies) Angewandte Psychologie für die Arbeitswelt nahmen am 28. April 2016 im Rahmen einer Zertifizierungsfeier an der FHNW in Olten ihre Diplome entgegen.',
						url: '#',
						date: '23.07.2016'
					},
					{
						title: 'Psychologiestudium - und dann?',
						description: 'Wo finden Absolvierende der Hochschule für Angewandte Psychologie FHNW nach dem Studium eine Stelle? Wie lange dauert die Jobsuche und wie hoch ist das Einkommen? Eine Studie des Zentrums für Ausbildung der Hochschule liefert Antworten.',
						url: '#',
						date: '12.07.2016'
					},
					{
						title: 'Psychologiestudium - und dann?',
						description: 'Wo finden Absolvierende der Hochschule für Angewandte Psychologie FHNW nach dem Studium eine Stelle? Wie lange dauert die Jobsuche und wie hoch ist das Einkommen? Eine Studie des Zentrums für Ausbildung der Hochschule liefert Antworten.',
						url: '#',
						date: '08.04.2016'
					},
					{
						title: '10 Diplome überreicht',
						description: 'Zehn Absolventinnen des modularen Weiterbildungsprogramms MAS (Master of Advanced Studies) Angewandte Psychologie für die Arbeitswelt nahmen am 28. April 2016 im Rahmen einer Zertifizierungsfeier an der FHNW in Olten ihre Diplome entgegen.',
						url: '#',
						date: '14.01.2016'
					}
				]
			}),
			tabnavigation: requireNew('../../widgets/tabnavigation/tabnavigation.data.js'),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js')
		}
	});

module.exports = data;
