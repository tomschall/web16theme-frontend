'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Weiterbildung an der FHNW'
		},
		title: 'Weiterbildung an der FHNW',
		leadText: 'Nutzen Sie das fachlich fundierte, vielfältige und persönliche  Weiterbildungsangebot der FHNW',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
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
			soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js'),
			inContentSearch: requireNew('../../widgets/in_content_search/in_content_search.data.js'),
			ourFaculties: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
				teasers: [
					{
						title: 'Psychologie',
						url: '#',
						img: {
							src: '/assets/media/img/university_applied_psychology.png',
							alt: 'Hochschule für Angewandte Psychologie'
						},
						variant: 'wide___third'
					}, {
						title: 'Architektur, Bau und Geomatik',
						url: '#',
						img: {
							src: '/assets/media/img/university_architecture.png',
							alt: 'Hochschule für Architektur, Bau und Geomatik FHNW'
						},
						variant: 'wide___third'
					}, {
						title: 'Gestaltung und Kunst',
						url: '#',
						img: {
							src: '/assets/media/img/university_design_and_art.png',
							alt: 'Hochschule für Gesaltung und Kunst FHNW'
						},
						variant: 'wide___third'
					}, {
						title: 'Life Sciences',
						url: '#',
						img: {
							src: '/assets/media/img/university_life_sciences.png',
							alt: 'Hochschule für Life Sciences FHNW'
						},
						variant: 'wide___third'
					}, {
						title: 'Musik',
						url: '../../pages/music_school/music_school.html',
						img: {
							src: '/assets/media/img/university_music.png',
							alt: 'Musikhochschulen FHNW'
						},
						variant: 'wide___third'
					}, {
						title: 'Pädagogik',
						url: '#',
						img: {
							src: '/assets/media/img/university_teacher.png',
							alt: 'Pädagogische Hochschule FHNW'
						},
						variant: 'wide___third'
					}, {
						title: 'Soziale Arbeit',
						url: '#',
						img: {
							src: '/assets/media/img/university_social_work.png',
							alt: 'Hochschule für Soziale Arbeit FHNW'
						},
						variant: 'wide___third'
					}, {
						title: 'Technik',
						url: '#',
						img: {
							src: '/assets/media/img/university_technic.png',
							alt: 'Hochschule für Technik FHNW'
						},
						variant: 'wide___third'
					}, {
						title: 'Wirtschaft',
						url: '#',
						img: {
							src: '/assets/media/img/university_economy.png',
							alt: 'Hochschule für Wirtschaft FHNW'
						},
						variant: 'wide___third'
					}, {
						title: 'International Studies',
						url: '#',
						img: {
							src: '/assets/media/img/faculty_is.png',
							alt: 'International Studies'
						},
						variant: 'wide___third'
					}, {
						title: 'Informatik',
						url: '#',
						img: {
							src: '/assets/media/img/faculty_it.png',
							alt: 'Informatik'
						},
						variant: 'wide___third'
					}
				]
			}),
			events: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
				teasers: [
					{
						title: 'Beruf und Familie vereinbaren - so gehts auch für Väter!',
						category: 'Väterorientierte Massnahmen',
						url: '#',
						img: {
							src: '/assets/media/img/event_as_1.png',
							alt: 'Veranstaltungen 1'
						},
						variant: 'wide___third'
					},
					{
						title: 'Chancen und Risiken flexibilisierter Arbeit',
						category: 'Privatleben und Beruf verschmelzen',
						url: '#',
						img: {
							src: '/assets/media/img/event_as_2.png',
							alt: 'Veranstaltungen 2'
						},
						variant: 'wide___third'
					},
					{
						title: 'Info-Veranstaltung M.Sc. Angewandte Psychologie',
						category: 'Masterstudiengang',
						url: '#',
						img: {
							src: '/assets/media/img/event_as_3.png',
							alt: 'Veranstaltungen 3'
						},
						variant: 'wide___third'
					}
				]
			})
		}
	});

module.exports = data;
