'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Über uns'
		},
		title: 'Über uns',
		leadText: 'Vielfältig, praxisnah und marktorientiert. Die Fachhochschule Nordwestschweiz FHNW hat sich als eine der führenden und innovationsstärksten Fachhochschulen der Schweiz etabliert.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: '/assets/media/img/about_us_hero.png',
				heroAlt: 'über uns symbolbild',
				breadcrumb: {
					entries: [
						{
							'url': '../startpage_prototype/startpage_prototype.html',
							'title': '',
							'extraClasses': 'is_home'
						}, {
							'url': '',
							'title': 'Die FHNW',
							'extraClasses': ''
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			subnav: requireNew('../../widgets/subnav/subnav.data.js'),
			extendedlinks: requireNew('../../widgets/extendedlinks/extendedlinks.data.js'),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),
			soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js'),
			locationSlider: _.assign(requireNew('../../widgets/location_slider/location_slider.data.js'), {
				locationTitle: 'Unsere Standorte',
				locationDescription: 'Die Fachhochschule Nordwestschweiz ist in verschiedenen Ortschaften angesiedelt. Hier finden Sie eine Übersicht nach Standorten.',
				oneMapOnly: true,
				entries: [
					{
						type: 'location',
						title: 'Campus Olten',
						navTitle: 'Standort Olten',
						address: {
							name: 'Fachhochschule Nordwestschweiz FHNW',
							department: 'Campus-Bibliothek Olten 6.1C',
							street: 'Bahnhofstrasse 6',
							zipCity: '5200 Olten'
						},
						contactData: {
							telephone: '+41 56 202 77 70',
							email: 'bibliothek.windisch@fhnw.ch'
						},
						locationPageURL: '/pages/location_brugg/location_brugg.html',
						routeURL: 'https://maps.google.ch',
						coordinates: {
							x: '7.907837',
							y: '47.347906'
						}
					},
					{
						type: 'location',
						title: 'Campus Brugg-Windisch',
						navTitle: 'Standort Brugg',
						address: {
							name: 'Fachhochschule Nordwestschweiz FHNW',
							department: 'Campus-Bibliothek Brugg-Windisch 6.1C',
							street: 'Bahnhofstrasse 6',
							zipCity: '5210 Windisch'
						},
						contactData: {
							telephone: '+41 56 202 77 70',
							email: 'bibliothek.windisch@fhnw.ch'
						},
						locationPageURL: '/pages/location_brugg/location_brugg.html',
						routeURL: 'https://maps.google.ch',
						coordinates: {
							x: '8.211470',
							y: '47.482021'
						}
					},
					{
						type: 'location',
						title: 'Campus Dreispitz (Basel)',
						navTitle: 'Standort Basel',
						address: {
							name: 'Fachhochschule Nordwestschweiz FHNW',
							department: 'Hochschule für Gestaltung und Kunst',
							street: 'Freilager-Platz 1',
							zipCity: '4023 Basel'
						},
						contactData: {
							telephone: '+41 61 228 44 44',
							email: 'basel@fhnw.ch'
						},
						locationPageURL: '#',
						routeURL: 'https://maps.google.ch',
						coordinates: {
							y: '47.533197',
							x: '7.610981'
						}
					},
					{
						type: 'location',
						title: 'Campus Muttenz',
						navTitle: 'Standort Muttenz',
						address: {
							name: 'Fachhochschule Nordwestschweiz FHNW',
							department: 'Campus Muttenz',
							street: 'Gründenstrasse 41',
							zipCity: '4132 Muttenz'
						},
						contactData: {
							telephone: '+41 467 42 42',
							email: 'ccc.muttenz@fhnw.ch'
						},
						locationPageURL: '#',
						routeURL: 'https://maps.google.ch',
						coordinates: {
							y: '47.533954',
							x: '7.638347'
						}
					},
					{
						type: 'location',
						title: 'Standort Liestal',
						navTitle: 'Standort Liestal',
						address: {
							name: 'Fachhochschule Nordwestschweiz FHNW',
							department: 'Padägogische Hochschule Bibliothek',
							street: 'Benzburweg 30',
							zipCity: '4410 Liestal'
						},
						contactData: {
							telephone: '+41 61 925 77 78',
							email: 'ph@fhnw.ch'
						},
						locationPageURL: '#',
						routeURL: 'https://maps.google.ch',
						coordinates: {
							y: '47.475493',
							x: '7.740356'
						}
					},
					{
						type: 'location',
						title: 'Standort Solothurn',
						navTitle: 'Standort Solothurn',
						address: {
							name: 'Fachhochschule Nordwestschweiz FHNW',
							department: 'Pädagogische Hochschule',
							street: 'Obere Sternengasse 7',
							zipCity: '4502 Solothurn'
						},
						contactData: {
							telephone: '+41 848 012 210',
							email: 'info.ph@fhnw.ch'
						},
						locationPageURL: '#',
						routeURL: '#',
						coordinates: {
							y: '47.212722',
							x: '7.543690'
						}
					}
				]
			}),
			locationAccordeon: _.assign(requireNew('../../widgets/accordeon/accordeon.data.js'), {
				entries: [
					{
						title: 'Standort Olten',
						accordeonContent: '<div class="accordeon__location"><img class="location__map-image" src="/assets/media/img/location_accordeon_olten.png" alt="Standort Olten auf Karte"/><div class="location__upper"><h3>Campus Olten</h3><div class="location__address"><span>Fachhochschule Nordwestschweiz FHNW</span><span>Campus-Bibliothek Olten 6.1C</span><span>Bahnhofstrasse 6</span><span>5200 Olten</span></div><div class="location__contact"><dl><dt>Telefon:</dt><dd><a href="tel:+41 56 202 77 70" tabindex="0">+41 56 202 77 70</a></dd><dt>E-Mail:</dt><dd><a href="mailto:bibliothek.windisch@fhnw.ch">bibliothek.windisch@fhnw.ch</a></dd></dl></div><a class="button small_button" href="/pages/location_brugg/location_brugg.html" tabindex="0">Mehr Infos zum Standort</a></div><div class="location__inferior"> <a href="https://maps.google.ch" target="_blank" tabindex="0"><span>Route berechnen</span></a> </div></div>'
					},
					{
						title: 'Standort Brugg',
						accordeonContent: '<div class="accordeon__location"><img class="location__map-image" src="/assets/media/img/location_accordeon_olten.png" alt="Standort Olten auf Karte"/><div class="location__upper"><h3>Campus Olten</h3><div class="location__address"><span>Fachhochschule Nordwestschweiz FHNW</span><span>Campus-Bibliothek Olten 6.1C</span><span>Bahnhofstrasse 6</span><span>5200 Olten</span></div><div class="location__contact"><dl><dt>Telefon:</dt><dd><a href="tel:+41 56 202 77 70" tabindex="0">+41 56 202 77 70</a></dd><dt>E-Mail:</dt><dd><a href="mailto:bibliothek.windisch@fhnw.ch">bibliothek.windisch@fhnw.ch</a></dd></dl></div><a class="button small_button" href="/pages/location_brugg/location_brugg.html" tabindex="0">Mehr Infos zum Standort</a></div><div class="location__inferior"> <a href="https://maps.google.ch" target="_blank" tabindex="0"><span>Route berechnen</span></a> </div></div>'
					}
				]
			}),
			fullBleedTeaser: requireNew('../../widgets/full_bleed_teaser/full_bleed_teaser.data.js')
		}
	});

module.exports = data;
