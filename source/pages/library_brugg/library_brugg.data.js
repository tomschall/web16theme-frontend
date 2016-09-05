'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Campusbibliothek Brugg-Windisch'
		},
		title: 'Campusbibliothek Brugg-Windisch',
		leadText: 'Die Campusbibliothek Brugg-Windisch bietet rund 200 Arbeitsplätze. Sie finden sowohl Lese- und Arbeitsplätze als auch 13 Computerarbeitsplätze sowie Netzanschluss und WIFI für portable Computer.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: '/assets/media/img/libraries_overview.png',
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
							'url': '../library_overview/library_overview.html',
							'title': 'Die Bibliotheken der FHNW',
							'extraClasses': ''
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Bibliotheken der FHNW',
				subtitle: 'Campusbibliothek Brugg-Windisch',
				titleurl: '#',
				entries: [
					{
						title: 'Infrastruktur',
						url: '#'
					},
					{
						title: 'Organisation',
						url: '#'
					},
					{
						title: 'Medienangebot',
						url: '#'
					},
					{
						title: 'Zu allen Bibliotheken',
						url: '../library_overview/library_overview.html',
						isBack: true
					}
				]
			}),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),
			soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js'),
			locationSlider: _.assign(requireNew('../../widgets/location_slider/location_slider.data.js')),
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
			})
		}
	});

module.exports = data;
