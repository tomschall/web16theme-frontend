'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Kontaktprofil fast leer'
		},
		title: 'Prof. Dr. Ańa-Verena von Niederhäusen',
		leadText: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign(requireNew('../../widgets/hero/hero.data.js'), {
				heroImage: '/assets/media/img/prof_verena_muster.png',
				heroAlt: 'Symbolbild',
				profileInfo: {
					name: 'Prof. Dr. Ańa-Verena von Niederhäusen'
				}
			}),
			soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js'),
			sidebar: _.assign(requireNew('../../widgets/sidebar/sidebar.data.js'), {
				widgets: {
					contact: _.assign(requireNew('../../widgets/sidebar_contact/sidebar_contact.data.js'), {
						contacts: [
							{
								name: 'Prof. Dr. Verena Muster',
								jobDescr: 'Leitung',
								email: 'hans.muster@fhnw.ch',
								telephone: '+41 62 957 24 26',
								location: 'Pädagogische Hochschule Brugg'
							}
						]
					})
				}
			}),
			accordeon: requireNew('../../widgets/accordeon/accordeon.data.js'),
			teaser: requireNew('../../widgets/teaser/teaser.data.js'),
			extendedlinks: requireNew('../../widgets/extendedlinks/extendedlinks.data.js'),
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
