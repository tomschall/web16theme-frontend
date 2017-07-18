'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Widget-Übersichtsseite'
		},
		title: 'Widget-Overview',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
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
			infoEvents: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
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
					}, {
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
			extendedLinksWithDate: _.assign(requireNew('../../widgets/extendedlinks/extendedlinks.data.js'), {
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
			teaser: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
				teasers: [
					{
						title: 'Hochschule für Angewandte Psychologie',
						url: '#',
						text: 'Die Hochschule für Angewandte Psychologie FHNW ist ein Kompetenzzentrum für Fragen der Arbeits-und Wirtschaftspsychologie.',
						img: {
							src: '/assets/media/img/university_applied_psychology.png',
							alt: 'Hochschule für Angewandte Psychologie'
						}
					}, {
						title: 'Hochschule für Architektur, Bau und Geomatik FHNW',
						url: '#',
						text: 'Die Hochschule für Architektur, Bau und Geomatik befindet sich am Sitz Muttenz der Fachhochschule Nordwestschweiz FHNW.',
						img: {
							src: '/assets/media/img/university_architecture.png',
							alt: 'Hochschule für Architektur, Bau und Geomatik FHNW'
						}
					}, {
						title: 'Hochschule für Gestaltung und Kunst FHNW',
						url: '#',
						text: 'Die HGK FHNW ist ein Ort des Dialoges. Zwischen Studierenden und Lehrenden, Disziplinen und Kulturen, Wissenschaft und Öffentlichkeit.',
						img: {
							src: '/assets/media/img/university_design_and_art.png',
							alt: 'Hochschule für Gesaltung und Kunst FHNW'
						}
					}, {
						title: 'Hochschule für Life Sciences FHNW',
						url: '#',
						text: 'Bei uns werden Fachleute im Schnittpunkt von Natur, Technik, Medizin und Umwelt, inmitten Europas grösster Life Science Region, ausgebildet. ',
						img: {
							src: '/assets/media/img/university_life_sciences.png',
							alt: 'Hochschule für Life Sciences FHNW'
						}
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
						url: '#'
					},
					{
						title: 'Indirekte Steuerung und Selbstgefährdung',
						projectTime: '31.12.2018',
						variant: 'wide___third',
						text: 'Neue Herausforderungen für das betriebliche Gesundheitsmanagement: Umgang mit indirekter Steuerung und Selbstgefährdung in Betrieben',
						url: '#'
					},
					{
						title: 'Entrepreneur-Check',
						projectTime: '31.12.2018',
						variant: 'wide___third',
						text: 'Persönlichkeit & Gesundheit von Unternehmerinnen und Unternehmern',
						url: '#'
					}
				]
			}),
			extendedlinks: requireNew('../../widgets/extendedlinks/extendedlinks.data.js'),
			contact: requireNew('../../widgets/contact/contact.data.js'),
			accordeon: requireNew('../../widgets/accordeon/accordeon.data.js'),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),
			soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js'),
			gallery: requireNew('../../widgets/image_gallery/image_gallery.data.js')
		}
	});

module.exports = data;
