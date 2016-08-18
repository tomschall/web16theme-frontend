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
			heroImage: '/assets/media/img/piano.png',
			heroAlt: 'Klavier an den Musikhochschulen',
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
			title: 'Musikhochschulen FHNW',
			logo: '/assets/media/img/music_school_logo.png',
			subtitle: 'Hochschule für Musik',
			entries: [
				{
					title: 'Leitung',
					url: '#'
				},
				{
					title: 'Kammermusik & Ensembles',
					url: '#'
				},
				{
					title: 'Konzerte & Events',
					url: '#'
				},
				{
					title: 'Preise & Auszeichnungen',
					url: '#'
				}
			]
		}),
		extendedlinks: _.assign(requireNew('../../widgets/extendedlinks/extendedlinks.data.js'), {
			links: [
				{
					title: 'Kulturpreis der Bürgi-Willert-Stiftung Bern',
					description: 'Der Kulturpreis der Bürgi-Willert-Stiftung wird seit 2016 an Kulturschaffende zwischen 40 und 65 Jahren verliehen, welche das Berner Kulturleben bereichern. Bänz Oester, Kontrabassist der Jazzabteilung der Hochschule für Musik gewinnt den diesjährigen…',
					url: '#',
					date: '23.07.16'
				},
				{
					title: 'György Kurtàg - Konzerte und Gespräche zum 90. Geburtstag',
					description: 'Der ungarische Komponist, Pianist und Musikpädagoge György Kurtág (*1926 Lugoj) gehört zu den grossen europäischen Musikern unserer Zeit. Anlässlich seines 90. Geburtstags bietet die Hochschule für Musik die Möglichkeit, seine musikalische …',
					url: '#',
					date: '12.07.16'
				},
				{
					title: 'Neuer Leiter für die Schola Cantorum Basiliensis',
					description: 'Die Fachhochschule Nordwestschweiz hat Thomas Drescher zum neuen Leiter der Schola Cantorum Basiliensis gewählt. Thomas Drescher steht der weltweit einmaligen Institution für Alte Musik bereits heute interimistisch vor und wird sein neues Amt …',
					url: '#',
					date: '08.04.16'
				}
			]
		}),
		eventTeasers: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
			teasers: [
				{
					title: 'Viktor Gàl, Saxophone Klasse Marcus Weiss',
					date: 'Donnerstag 23. Juni 2016, 15h',
					url: '#',
					variant: 'wide___third',
					img: {
						src: '/assets/media/img/music_school_event_1.png',
						alt: 'Event 1'
					}
				},
				{
					title: 'Schlusskonzerte 2016 Hochschule für Musik',
					date: '17.-29. Juni 2016, 15h',
					url: '#',
					variant: 'wide___third',
					img: {
						src: '/assets/media/img/music_school_event_2.png',
						alt: 'Event 2'
					}
				},
				{
					title: 'Milena Martinez Alicino, Klavier Klasse Tobias Schabenberger',
					date: 'Dienstag 14. Juni, 15h',
					url: '#',
					variant: 'wide___third',
					img: {
						src: '/assets/media/img/music_school_event_3.png',
						alt: 'Event 3'
					}
				}
			]
		}),
		actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js')
	}
});

module.exports = data;
