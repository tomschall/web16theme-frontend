'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Die neun Hochschulen der FHNW'
		},
		title: 'Die neun Hochschulen der FHNW',
		leadText: 'Die Fachhochschule Nordwestschweiz FHNW umfasst neun Hochschulen, die auf die Hauptstandorte Aarau, Basel, Brugg/Windisch, Muttenz und Olten konzentriert sind.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: false
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: '/assets/media/img/locations.png',
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
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
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
					}, {
						title: 'Musikhochschulen FHNW',
						url: '../../pages/music_school/music_school.html',
						text: 'Die Hochschule für Musik und die Schola Cantorum Basiliensis bilden die Musikhochschulen der Fachhochschule Nordwestschweiz.',
						img: {
							src: '/assets/media/img/university_music.png',
							alt: 'Musikhochschulen FHNW'
						}
					}, {
						title: 'Pädagogische Hochschule FHNW',
						url: '#',
						text: 'Die Studiengänge der Pädagogischen Hochschule FHNW decken die gesamte Lehrerbildung ab, von der Vorschulstufe bis zur Gymnasialstufe sowie der Erwachsenen- und Weiterbildung.',
						img: {
							src: '/assets/media/img/university_teacher.png',
							alt: 'Pädagogische Hochschule FHNW'
						}
					}, {
						title: 'Hochschule für Soziale Arbeit FHNW',
						url: '#',
						text: 'Die Hochschule für Soziale Arbeit FHNW ist führend in ihrem Angebot für Studierende, Kundinnen und Kunden und Praxisorganisationen.',
						img: {
							src: '/assets/media/img/university_social_work.png',
							alt: 'Hochschule für Soziale Arbeit FHNW'
						}
					}, {
						title: 'Hochschule für Technik FHNW',
						url: '#',
						text: 'Die Hochschule für Technik FHNW mit ihren 14 Instituten ist ein wichtiger Partner in angewandter Forschung und Entwicklung für Industrie und Wirtschaft.',
						img: {
							src: '/assets/media/img/university_technic.png',
							alt: 'Hochschule für Technik FHNW'
						}
					}, {
						title: 'Hochschule für Wirtschaft FHNW',
						url: '#',
						text: 'Die Hochschule für Wirtschaft FHNW deckt das gesamte Spektrum von Themen in Betriebswirtschaft und Wirtschafts-informatik ab.',
						img: {
							src: '/assets/media/img/university_economy.png',
							alt: 'Hochschule für Wirtschaft FHNW'
						}
					}
				]
			}),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),
			soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js')
		}
	});

module.exports = data;
