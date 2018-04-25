'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Bachelor of Arts in Sozialer Arbeit'
	},
	title: 'Bachelor of Arts in Sozialer Arbeit (B.A)',
	text: 'Die Hochschule für Soziale Arbeit der Fachhochschule Nordwestschweiz FHNW bietet ein Bachelor-Studium in Sozialer Arbeit an, das in einer wissenschaftlich fundierten, praxisnahen Ausbildung zu einer generalistischen Berufsbefähigung führt.',
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
					}, {
						'url': '#',
						'title': 'Fachbereich für Soziale Arbeit',
						'extraClasses': ''
					}
				]
			}
		}, requireNew('../../widgets/hero/hero.data.js')),
		subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
			title: 'Studium',
			subtitle: 'Bachelor of Arts in Sozialer Arbeit',
			titleUrl: '#',
			entries: [
				{
					title: 'BSc Medizininformatik',
					url: '#',
					isBack: false
				},
				{
					title: 'BSc Medizintechnik',
					url: '#',
					isBack: false
				},
				{
					title: 'BSc Pharmatechnologie',
					url: '#',
					isBack: false
				},
				{
					title: 'BSc Pharmatechnologie',
					url: '#',
					isBack: false
				},
				{
					title: 'BSc Pharmatechnologie',
					url: '#',
					isBack: false
				},
				{
					title: 'BSc Pharmatechnologie',
					url: '#',
					isBack: false
				},
				{
					title: 'Fachbereich Soziale Arbeit',
					url: '#',
					isBack: true
				}
			]
		}),
		informationAccordeon: _.assign(requireNew('../../widgets/accordeon/accordeon.data.js'), {}),
		organisationAccordeon: _.assign(requireNew('../../widgets/accordeon/accordeon.data.js'), {
			entries: [
				{
					title: 'Zulassungsbedingungen',
					accordeonContent: '<p>Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding seines Lebens gedreht hatte und mit der Beute verschwinden wollte!\nHatte einer seiner zahllosen Kollegen dieselbe Idee gehabt, ihn beobachtet und abgewartet, um ihn nun um die Früchte seiner Arbeit zu erleichtern? Oder gehörten die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter dieser Stadt, und die stählerne Acht um seine Handgelenke würde gleich zuschnappen? Er konnte die Aufforderung stehen zu bleiben schon</p>'
				},
				{
					title: 'Abschluss und Leistungsnachweis',
					accordeonContent: '<p>Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding seines Lebens gedreht hatte und mit der Beute verschwinden wollte!\nHatte einer seiner zahllosen Kollegen dieselbe Idee gehabt, ihn beobachtet und abgewartet, um ihn nun um die Früchte seiner Arbeit zu erleichtern? Oder gehörten die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter dieser Stadt, und die stählerne Acht um seine Handgelenke würde gleich zuschnappen? Er konnte die Aufforderung stehen zu bleiben schon</p>'
				},
				{
					title: 'Zeitplan',
					accordeonContent: '<p>Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding seines Lebens gedreht hatte und mit der Beute verschwinden wollte!\nHatte einer seiner zahllosen Kollegen dieselbe Idee gehabt, ihn beobachtet und abgewartet, um ihn nun um die Früchte seiner Arbeit zu erleichtern? Oder gehörten die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter dieser Stadt, und die stählerne Acht um seine Handgelenke würde gleich zuschnappen? Er konnte die Aufforderung stehen zu bleiben schon</p>'
				},
				{
					title: 'Kostenstruktur',
					accordeonContent: '<p>Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding seines Lebens gedreht hatte und mit der Beute verschwinden wollte!\nHatte einer seiner zahllosen Kollegen dieselbe Idee gehabt, ihn beobachtet und abgewartet, um ihn nun um die Früchte seiner Arbeit zu erleichtern? Oder gehörten die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter dieser Stadt, und die stählerne Acht um seine Handgelenke würde gleich zuschnappen? Er konnte die Aufforderung stehen zu bleiben schon</p>'
				},
				{
					title: 'Durchgeführt von',
					accordeonContent: '<p>Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding seines Lebens gedreht hatte und mit der Beute verschwinden wollte!\nHatte einer seiner zahllosen Kollegen dieselbe Idee gehabt, ihn beobachtet und abgewartet, um ihn nun um die Früchte seiner Arbeit zu erleichtern? Oder gehörten die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter dieser Stadt, und die stählerne Acht um seine Handgelenke würde gleich zuschnappen? Er konnte die Aufforderung stehen zu bleiben schon</p>'
				}
			]
		}),
		infoEvents: requireNew('../../widgets/info_teaser/info_teaser.data.js'),
		nextCoursesAccordeon: _.assign(requireNew('../../widgets/application_accordeon/application_accordeon.data.js'), {}),
		sidebar: _.merge(requireNew('../../widgets/sidebar/sidebar.data.js'), {
			widgets: {
				application: _.assign(requireNew('../../widgets/sidebar_application/sidebar_application.data.js'), {
					button: {
						text: 'Zur Anmeldung'
					}
				}),
				keydata: _.assign(requireNew('../../widgets/sidebar_key_data/sidebar_key_data.data.js'), {
					entries: [
						{
							title: 'Semesterstart',
							text: 'Herbst/Frühjahr'
						},
						{
							title: 'Abschluss',
							text: 'Bachelor Soziale Arbeit'
						},
						{
							title: 'Nächster Starttermin',
							text: '21.9.2016'
						},
						{
							title: 'Vollzeit / Teilzeit',
							text: 'Ja'
						},
						{
							title: 'Berufsbegleitend',
							text: 'Nein'
						},
						{
							title: 'Dauer',
							text: '6 Semester'
						},
						{
							title: 'Anmeldegebühr',
							text: '600 CHF'
						},
						{
							title: 'Semestergebühr',
							text: '700 CHF'
						},
						{
							title: 'Unterrichtssprache',
							text: 'Deutsch'
						},
						{
							title: 'Auslandsaufenthalt',
							text: 'Ja'
						},
						{
							title: 'Studienmodell',
							text: 'Facherweiterung, Quereinstieg'
						},
						{
							title: 'Durchführungsort(e)',
							text: 'Brugg, Olten'
						},
						{
							title: 'Anmeldeschluss',
							text: '1.8.2016'
						}
					]
				})
			}
		}),
		locationSlider: _.assign(requireNew('../../widgets/location_slider/location_slider.data.js')),
		querlinks: _.assign(requireNew('../../widgets/extendedlinks/extendedlinks.data.js')),
		tabnavigation: requireNew('../../widgets/tabnavigation/tabnavigation.data.js'),
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
		soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js'),
		mobileContentNavigation: requireNew('../../widgets/mobile_content_navigation/mobile_content_navigation.data.js'),
		actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js')
	}
});

module.exports = data;
