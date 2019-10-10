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
				isHero2: false,
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
			inContentSearch: requireNew('../../widgets/in_content_search/in_content_search.data.js'),
			masTeasers: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
				teasers: [
					{
						title: 'Change und Organisationsdynamik',
						category: 'MAS',
						text: 'Copy lorem ipsum dolor vanitas carpe diem memento mori alea iacta lorem ipsum dolor vanitas.',
						url: '#',
						variant: 'wide___third'
					},
					{
						title: 'FHNW in Coaching',
						category: 'MAS',
						text: 'Copy lorem ipsum dolor vanitas carpe diem memento mori alea iacta lorem ipsum dolor vanitas.',
						url: '#',
						variant: 'wide___third'
					},
					{
						title: 'Psychosoziales Management',
						category: 'MAS',
						text: 'Copy lorem ipsum dolor vanitas carpe diem memento mori alea iacta lorem ipsum dolor vanitas.',
						url: '#',
						variant: 'wide___third'
					}
				]
			}),
			dasTeasers: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
				teasers: [
					{
						title: 'Eingliederungsmanagement',
						category: 'DAS',
						text: 'Copy lorem ipsum dolor vanitas carpe diem memento mori alea iacta lorem ipsum dolor vanitas.',
						url: '#',
						variant: 'wide___third'
					},
					{
						title: 'Organisationsdynamische Prozessbegleitung',
						category: 'DAS',
						text: 'Copy lorem ipsum dolor vanitas carpe diem memento mori alea iacta lorem ipsum dolor vanitas.',
						url: '#',
						variant: 'wide___third'
					},
					{
						title: 'Lorem Ipsum dolor vanitas carpe diem memento',
						category: 'DAS',
						text: 'Copy lorem ipsum dolor vanitas carpe diem memento mori alea iacta lorem ipsum dolor vanitas.',
						url: '#',
						variant: 'wide___third'
					}
				]
			}),
			casLinks: _.assign(requireNew('../../widgets/extendedlinks/extendedlinks.data.js'), {
				links: [
					{
						title: 'CAS Angewandte Philosophie im beruflichen Kontext 2017',
						url: '#'
					},
					{
						title: 'CAS Changeprozess in Organisationen',
						url: '#'
					},
					{
						title: 'CAS Eingliederungsmanagement',
						url: '#'
					}
				]
			}),
			news: _.assign(requireNew('../../widgets/extendedlinks/extendedlinks.data.js'), {
				links: [
					{
						date: '23.07.2016',
						title: '5. Schweizer Symposium zu Unterstützer Kommunikation (UK)',
						description: 'Das Symposium findet am 9. September 2016 im Neubau auf dem FHNW-Campus Olten statt. Das Institut Integration und Partizipation IIP der Hochschule für Soziale Arbeit FHNW unterstützt den Anlass als Eventpartner.',
						url: '#'
					},
					{
						date: '12.07.2016',
						title: 'Info-Veranstaltung in Olten: Bachelor-Studium in Sozialer Arbeit',
						description: 'An der Hochschule für Soziale Arbeit der Fachhochschule Nordwestschweiz wird in Basel und Olten ein Bachelor-Studium in Sozialer Arbeit - für eine professionelle Tätigkeit in den Berufsfeldern Sozialarbeit und Sozialpädagogik...',
						url: '#'
					},
					{
						date: '08.04.2016',
						title: 'Informationsveranstaltung in Olten: Master-Studium in Sozialer Arbeit',
						description: 'Das Master-Studium der Hochschule für Soziale Arbeit FHNW ist anwendungsorientiert, forschungsbasiert und international. Absolventinnen und Absolventen verfügen über die Kompetenz zur Gestaltung und Optimierung ...',
						url: '#'
					}
				]
			}),
			testimonial: _.assign(requireNew('../../widgets/blockquote/blockquote.data.js'), {
				img: {
					src: '/assets/media/img/testimonial.png',
					alt: 'Herr X von Z'
				},
				quote: 'Dass wir im Rahmen unserer Projektarbeit im CAS Social Media einen Blog betreuen finde ich spannend, weil einem so richtig «am eigenen Leib», vor Augen geführt wird, dass einen Blog zu betreuen grundsätzlich Knochenarbeit bedeutet und einiges an Zeit verschlingt. In diesem Lehrgang wird man aktiv an die Aufgabe herangeführt und bei Problemen dennoch nicht «im Regen stehen gelassen». Für Fragen steht im Unterricht das Plenum oder daneben die Dozentenschaft bereit.',
				author: 'Peter Gschwend, höhenkurve.langsame mobilität erleben',
				testimonialTitle: 'Erfahrungsberichte',
				testimonialLink: '#'
			})
		}
	});

module.exports = data;
