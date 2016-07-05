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
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: 'locations.png',
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
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			teaser: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
				teasers: [
					{
						title: 'Hochschule für Angewandte Psychologie',
						link: '#',
						text: 'Die Hochschule für Angewandte Psychologie FHNW ist ein Kompetenzzentrum für Fragen der Arbeits-und Wirtschaftspsychologie.',
						img: {
							src: 'university_applied_psychology.png',
							alt: 'Hochschule für Angewandte Psychologie'
						}
					}, {
						title: 'Hochschule für Architektur, Bau und Geomatik FHNW',
						link: '#',
						text: 'Die Hochschule für Architektur, Bau und Geomatik befindet sich am Sitz Muttenz der Fachhochschule Nordwestschweiz FHNW.',
						img: {
							src: 'university_architecture.png',
							alt: 'Hochschule für Architektur, Bau und Geomatik FHNW'
						}
					}, {
						title: 'Hochschule für Gestaltung und Kunst FHNW',
						link: '#',
						text: 'Die HGK FHNW ist ein Ort des Dialoges. Zwischen Studierenden und Lehrenden, Disziplinen und Kulturen, Wissenschaft und Öffentlichkeit.',
						img: {
							src: 'university_design_and_art.png',
							alt: 'Hochschule für Gesaltung und Kunst FHNW'
						}
					}, {
						title: 'Hochschule für Life Sciences FHNW',
						link: '#',
						text: 'Bei uns werden Fachleute im Schnittpunkt von Natur, Technik, Medizin und Umwelt, inmitten Europas grösster Life Science Region, ausgebildet. ',
						img: {
							src: 'university_life_sciences.png',
							alt: 'Hochschule für Life Sciences FHNW'
						}
					}, {
						title: 'Musikhochschulen FHNW',
						link: '../../pages/music_school/music_school.html',
						text: 'Die Hochschule für Musik und die Schola Cantorum Basiliensis bilden die Musikhochschulen der Fachhochschule Nordwestschweiz.',
						img: {
							src: 'university_music.png',
							alt: 'Musikhochschulen FHNW'
						}
					}, {
						title: 'Pädagogische Hochschule FHNW',
						link: '#',
						text: 'Die Studiengänge der Pädagogischen Hochschule FHNW decken die gesamte Lehrerbildung ab, von der Vorschulstufe bis zur Gymnasialstufe sowie der Erwachsenen- und Weiterbildung.',
						img: {
							src: 'university_teacher.png',
							alt: 'Pädagogische Hochschule FHNW'
						}
					}, {
						title: 'Hochschule für Soziale Arbeit FHNW',
						link: '#',
						text: 'Die Hochschule für Soziale Arbeit FHNW ist führend in ihrem Angebot für Studierende, Kundinnen und Kunden und Praxisorganisationen.',
						img: {
							src: 'university_social_work.png',
							alt: 'Hochschule für Soziale Arbeit FHNW'
						}
					}, {
						title: 'Hochschule für Technik FHNW',
						link: '#',
						text: 'Die Hochschule für Technik FHNW mit ihren 14 Instituten ist ein wichtiger Partner in angewandter Forschung und Entwicklung für Industrie und Wirtschaft.',
						img: {
							src: 'university_technic.png',
							alt: 'Hochschule für Technik FHNW'
						}
					}, {
						title: 'Hochschule für Wirtschaft FHNW',
						link: '#',
						text: 'Die Hochschule für Wirtschaft FHNW deckt das gesamte Spektrum von Themen in Betriebswirtschaft und Wirtschafts-informatik ab.',
						img: {
							src: 'university_economy.png',
							alt: 'Hochschule für Wirtschaft FHNW'
						}
					}
				]
			})
		}
	});

module.exports = data;
