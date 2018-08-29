'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Events - Listings'
		},
		title: 'Events - Listings',
		leadText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: '/assets/media/img/building_brugg.png',
				heroAlt: 'Fachhochschule Nordwestschweiz',
				breadcrumb: {
					entries: [
						{
							'url': '../startpage_prototype/startpage_prototype.html',
							'title': '',
							'extraClasses': 'is_home'
						}, {
							'url': '#',
							'title': 'Forschungen und Dienstleistungen',
							'extraClasses': ''
						}, {
							'url': '.#',
							'title': 'Informatik',
							'extraClasses': ''
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Forschung und Dienstleistungen',
				subtitle: 'Informatik',
				titleUrl: '#',
				entries: [
					{
						title: 'zu Forschung und Dienstleistung',
						url: '#',
						isBack: true
					}
				]
			}),
			soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js'),
			linklist: _.assign(requireNew('../../widgets/linklist/linklist.data.js'),
			{
				title: 'Nächste Events in Listenform mit Bild',
				listEntries: [
					{
						title: 'LOREM, Bundesamt für Berufsbildung und Technologie',
						entryText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.',
						img: {
							src: '/assets/media/img/bund_logo.png',
							alt: 'Bundesamt für Berufsbildung und Technologie'
						},
						url: '#',
						isExternal: false
					},
					{
						title: 'Bundesministerium des Innern',
						entryText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.',
						img: {
							src: '/assets/media/img/bmi_logo.png',
							alt: 'Bundesministerium des Innern'
						},
						url: '#',
						isExternal: false
					}
				]
			}),
			linklistNoImg: _.assign(requireNew('../../widgets/linklist/linklist.data.js'),
			{
				title: 'Nächste Events in Listenform ohne Bilder',
				listEntries: [
					{
						title: 'LOREM, Bundesamt für Berufsbildung und Technologie',
						entryText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.',
						url: '#',
						isExternal: false
					},
					{
						title: 'Bundesministerium des Innern',
						entryText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.',
						url: '#',
						isExternal: false
					},
					{
						title: 'Kanton Aargau, Departement Gesundheit und Soziales',
						entryText: 'ist für die Luftfahrtentwicklung und die Aufsicht über die zivile Luftfahrt in der Schweiz zuständig. Das BAZL gehört zum Eidgenössischen Departement für Umwelt, Verkehr, Energie und Kommunikation (UVEK) und ist dafür verantwortlich, dass die Zivilluftfahrt in der Schweiz ein hohes Sicherheitsniveau.',
						url: '#',
						isExternal: false,
						news_detail: {
							news_date: '27.07.2017',
							university: 'Hochschule für Pädagogik'
						}
					}
				]
			}),
			expertiseAreas: requireNew('../../widgets/expertise_areas/expertise_areas.data.js'),
			projectTeasers: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
				title: 'Nächste Events in 3er-Teaser',
				teasers: [
					{
						title: 'Mensch-Maschine-Interaktion im Betrieb SBB:',
						projectTime: '31.12.2018',
						variant: 'wide___third',
						text: 'Automatisierung in den Betriebszentralen der Zukunft',
						url: '#',
						img: {
							src: '/assets/media/img/miks_project_1.png',
							alt: 'MiKS Projekt 1'
						}
					},
					{
						title: 'Indirekte Steuerung und Selbstgefährdung',
						projectTime: '31.12.2018',
						variant: 'wide___third',
						text: 'Neue Herausforderungen für das betriebliche Gesundheitsmanagement: Umgang mit indirekter Steuerung und Selbstgefährdung in Betrieben',
						url: '#',
						img: {
							src: '/assets/media/img/miks_project_2.png',
							alt: 'MiKS Projekt 2'
						}
					},
					{
						title: 'Entrepreneur-Check',
						projectTime: '31.12.2018',
						variant: 'wide___third',
						text: 'Persönlichkeit & Gesundheit von Unternehmerinnen und Unternehmern',
						url: '#',
						img: {
							src: '/assets/media/img/miks_project_3.png',
							alt: 'MiKS Projekt 3'
						}
					}
				],
				moreButton: false
			})
		}
	});

module.exports = data;
