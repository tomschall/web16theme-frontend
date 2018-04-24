'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Institut Mensch in komplexen Systemen (MikS)'
		},
		title: 'Institut Mensch in komplexen Systemen (MikS)',
		leadText: 'Automatisierung und technische Vernetzung erhöhen die Komplexität unserer Arbeit. Uns beschäftigen die Menschen im Zentrum solcher Komplexität.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: '/assets/media/img/piano.png',
				heroAlt: 'Klavier an den Musikhochschulen',
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
						}, {
							'url': '../university_for_applied_psychology/university_for_applied_psychology.html',
							'title': 'Hochschule für Angewandte Psychologie',
							'extraClasses': ''
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: 'Hochschule für Angewandte Psychologie',
				subtitle: 'Institut Mensch in komplexen Systemen (MikS)',
				titleUrl: '#',
				entries: [
					{
						title: 'Organisation',
						url: '#'
					},
					{
						title: 'Kooperationspartner',
						url: '#'
					},
					{
						title: 'Kernkompetenzen',
						url: '#'
					},
					{
						title: 'Dienstleitungs- und Beratungsangebot',
						url: '#'
					},
					{
						title: 'Zur Hochschule',
						url: '../university_for_applied_psychology/university_for_applied_psychology.html',
						isBack: true
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
				]
			}),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),
			soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js'),
			locationSlider: _.assign(requireNew('../../widgets/location_slider/location_slider.data.js')),
			locationAccordeon: _.assign(requireNew('../../widgets/accordeon/accordeon.data.js'), {
				entries: [
					{
						title: 'Standort Olten',
						accordeonContent: '<div class="accordeon__location"><img class="location__map-image" src="/assets/media/img/location_accordeon_olten.png" alt="Standort Olten auf Karte"/><div class="location__upper"><h3>Campus Olten</h3><div class="location__address"><span>Fachhochschule Nordwestschweiz FHNW</span><span>Campus-Bibliothek Olten 6.1C</span><span>Bahnhofstrasse 6</span><span>5200 Olten</span></div><div class="location__contact"><dl><dt>Telefon:</dt><dd><a href="tel:+41 56 202 77 70" tabindex="0">+41 56 202 77 70</a></dd><dt>E-Mail:</dt><dd><a href="mailto:YmlibGlvdGhlay53aW5kaXNjaEBmaG53LmNo"><span class="geomailaddress">YmlibGlvdGhlay53aW5kaXNjaEBmaG53LmNo</span></a></dd></dl></div><a class="button small_button" href="/pages/location_brugg/location_brugg.html" tabindex="0">Mehr Infos zum Standort</a></div><div class="location__inferior"> <a href="https://maps.google.ch" target="_blank" tabindex="0"><span>Route berechnen</span></a> </div></div>'
					},
					{
						title: 'Standort Brugg',
						accordeonContent: '<div class="accordeon__location"><img class="location__map-image" src="/assets/media/img/location_accordeon_olten.png" alt="Standort Olten auf Karte"/><div class="location__upper"><h3>Campus Olten</h3><div class="location__address"><span>Fachhochschule Nordwestschweiz FHNW</span><span>Campus-Bibliothek Olten 6.1C</span><span>Bahnhofstrasse 6</span><span>5200 Olten</span></div><div class="location__contact"><dl><dt>Telefon:</dt><dd><a href="tel:+41 56 202 77 70" tabindex="0">+41 56 202 77 70</a></dd><dt>E-Mail:</dt><dd><a href="mailto:YmlibGlvdGhlay53aW5kaXNjaEBmaG53LmNo"><span class="geomailaddress">YmlibGlvdGhlay53aW5kaXNjaEBmaG53LmNo</span></a></dd></dl></div><a class="button small_button" href="/pages/location_brugg/location_brugg.html" tabindex="0">Mehr Infos zum Standort</a></div><div class="location__inferior"> <a href="https://maps.google.ch" target="_blank" tabindex="0"><span>Route berechnen</span></a> </div></div>'
					}
				]
			})
		}
	});

module.exports = data;
