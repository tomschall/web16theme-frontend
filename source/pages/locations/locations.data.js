'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Standorte'
	},
	title: 'Die vier Hauptstandorte / Campusareale',
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
		subnav: _.merge(requireNew('../../widgets/subnav/subnav.data.js'), {
			title: 'Standorte',
			logo: null,
			subtitle: null,
			entries: null
		}),
		teaserLocations: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
			moreButton: false
		}),
		teaserAdditionalLocations: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
			teasers: [
				{
					title: 'Standort Liestal',
					url: '#',
					img: {
						src: '/assets/media/img/standort_liestal.png',
						alt: 'Standort Liestal'
					}
				},
				{
					title: 'Standort Solothurn',
					url: '#',
					img: {
						src: '/assets/media/img/standort_solothurn.png',
						alt: 'Standort Solothurn'
					},
					text: 'ppppp ppppppp pppppppp pppp pppppppppp pppppppp pppppppppp pppppppppppppppp ppppppppp ppppp pppp pppppp pp pp ppppp pppppp pp ppp ppp ppp ppppp pd pdp dpdpdpd pdp dpd pdp dp'
				}
			],
			moreButton: false
		}),
		extendedlinks: requireNew('../../widgets/extendedlinks/extendedlinks.data.js'),
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
