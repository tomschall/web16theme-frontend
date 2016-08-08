'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'CAS Eingliederungsmanagement'
		},
		title: 'CAS Eingliederungsmanagement',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
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
				title: 'Weiterbildung Soziale Arbeit',
				subtitle: 'Certificate of Advanced Studies Eingliederungsmanagement «Fallberatung»',
				titleUrl: '#',
				entries: [
					{
						title: 'Fachbereich Soziale Arbeit',
						url: '#',
						isBack: true
					}
				]
			}),
			informationAccordeon: _.assign(requireNew('../../widgets/accordeon/accordeon.data.js'), {
				entries: [
					{
						title: 'Struktur und Methodik / Programm',
						accordeonContent: '<p>Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding seines Lebens gedreht hatte und mit der Beute verschwinden wollte!\nHatte einer seiner zahllosen Kollegen dieselbe Idee gehabt, ihn beobachtet und abgewartet, um ihn nun um die Früchte seiner Arbeit zu erleichtern? Oder gehörten die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter dieser Stadt, und die stählerne Acht um seine Handgelenke würde gleich zuschnappen? Er konnte die Aufforderung stehen zu bleiben schon</p>'
					},
					{
						title: 'Detaillierte Inhaltsbeschreibung',
						accordeonContent: '<p>Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding seines Lebens gedreht hatte und mit der Beute verschwinden wollte!\nHatte einer seiner zahllosen Kollegen dieselbe Idee gehabt, ihn beobachtet und abgewartet, um ihn nun um die Früchte seiner Arbeit zu erleichtern? Oder gehörten die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter dieser Stadt, und die stählerne Acht um seine Handgelenke würde gleich zuschnappen? Er konnte die Aufforderung stehen zu bleiben schon</p>'
					},
					{
						title: 'Modulbeschreibung',
						accordeonContent: '<p>Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding seines Lebens gedreht hatte und mit der Beute verschwinden wollte!\nHatte einer seiner zahllosen Kollegen dieselbe Idee gehabt, ihn beobachtet und abgewartet, um ihn nun um die Früchte seiner Arbeit zu erleichtern? Oder gehörten die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter dieser Stadt, und die stählerne Acht um seine Handgelenke würde gleich zuschnappen? Er konnte die Aufforderung stehen zu bleiben schon</p>'
					},
					{
						title: 'Gehört zu',
						accordeonContent: '<p>Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding seines Lebens gedreht hatte und mit der Beute verschwinden wollte!\nHatte einer seiner zahllosen Kollegen dieselbe Idee gehabt, ihn beobachtet und abgewartet, um ihn nun um die Früchte seiner Arbeit zu erleichtern? Oder gehörten die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter dieser Stadt, und die stählerne Acht um seine Handgelenke würde gleich zuschnappen? Er konnte die Aufforderung stehen zu bleiben schon</p>'
					}
				]
			}),
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
			eventTeasers: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
				teasers: [
					{
						title: 'Informationsanslass Weiterbildung 2016',
						category: 'Hochschule für Soziale Arbeit',
						variant: 'wide___third',
						text: '27.06.2016 um 18:15 Uhr, Windisch',
						url: '#'
					}
				]
			}),
			sidebarAccordeon: _.assign(requireNew('../../widgets/accordeon/accordeon.data.js'), {
				multiple: true,
				entries: [
					{
						title: 'Eckdaten',
						accordeonContent: '<dl><dt>Abschluss:</dt><dd>CAS Eingliederungsmanagement MAS XYZ (University of Shanghai)</dd><dt>ECTS Punkte:</dt><dd>15 Credits</dd><dt>Zeitraum & Dauer:</dt><dd>1.4.2016 - 24.12.2016, 2 Semester</dd><dt>Unterrichtssprache:</dt><dd>Deutsch</dd></dl>',
						inititalOpen: true
					},
					{
						title: 'Downloads',
						accordeonContent: '<p>to be defined</p>'
					},
					{
						title: 'Ansprechpersonen',
						contactData: _.assign(requireNew('../../widgets/contact/contact.data.js'), {
							persons: [
								{
									fullname: 'Prof. Dr. Hans Muster',
									jobDescription: 'Institutsleitung',
									phone: '+41 62 957 24 26',
									email: 'hans.muster@fhnw.ch',
									img: {
										src: '/assets/media/img/hans_muster.png',
										alt: 'Prof. Dr. Hans Muster'
									}
								},
								{
									fullname: 'Esther Muster',
									jobDescription: 'Kursleitung',
									phone: '+41 62 957 24 26',
									email: 'esther.muster@fhnw.ch',
									img: {
										src: '/assets/media/img/esther_muster.png',
										alt: 'Esther Muster'
									}
								}
							]
						})
					}

				]
			}),
			nextCoursesAccordeon: _.assign(requireNew('../../widgets/accordeon/accordeon.data.js'), {
				onlineApplication: true,
				entries: [
					{
						uid: '1',
						eventStart: '19.09.2016',
						eventLocation: 'Basel',
						availableSeats: 3,
						informationEntries: [
							{
								label: 'Start- und Endtermin',
								text: '01.01.2016 - 15.05.2016'
							},
							{
								label: 'Dauer',
								text: '6 Monate'
							},
							{
								label: 'ECTS-Punkte',
								text: '15 Credits'
							},
							{
								label: 'Durchführungsort(e)',
								text: 'HS Soziale Arbeit FHNW, Von Roll Str 10, 4600 Olten'
							},
							{
								label: 'Freie Plätze',
								text: '12'
							},
							{
								label: 'Anzahl Teilnehmer',
								text: '6 - 18'
							},
							{
								label: 'Nummer',
								text: 'X0.12345'
							}
						],
						additionalInformation: 'Wichtige Informationen zur Anmeldung Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
						btnUrl: '#'
					},
					{
						uid: '2',
						eventStart: '13.05.2017',
						eventLocation: 'Basel',
						availableSeats: 12,
						informationEntries: [
							{
								label: 'Start- und Endtermin',
								text: '01.01.2016 - 15.05.2016'
							},
							{
								label: 'Dauer',
								text: '6 Monate'
							},
							{
								label: 'ECTS-Punkte',
								text: '15 Credits'
							},
							{
								label: 'Durchführungsort(e)',
								text: 'HS Soziale Arbeit FHNW, Von Roll Str 10, 4600 Olten'
							},
							{
								label: 'Freie Plätze',
								text: '12'
							},
							{
								label: 'Anzahl Teilnehmer',
								text: '6 - 18'
							},
							{
								label: 'Nummer',
								text: 'X0.12345'
							}
						],
						additionalInformation: 'Wichtige Informationen zur Anmeldung Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
						btnUrl: '#'
					},
					{
						uid: '3',
						eventStart: '17.09.2017',
						eventLocation: 'Basel',
						availableSeats: 12,
						informationEntries: [
							{
								label: 'Start- und Endtermin',
								text: '01.01.2016 - 15.05.2016'
							},
							{
								label: 'Dauer',
								text: '6 Monate'
							},
							{
								label: 'ECTS-Punkte',
								text: '15 Credits'
							},
							{
								label: 'Durchführungsort(e)',
								text: 'HS Soziale Arbeit FHNW, Von Roll Str 10, 4600 Olten'
							},
							{
								label: 'Freie Plätze',
								text: '12'
							},
							{
								label: 'Anzahl Teilnehmer',
								text: '6 - 18'
							},
							{
								label: 'Nummer',
								text: 'X0.12345'
							}
						],
						additionalInformation: 'Wichtige Informationen zur Anmeldung Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
						btnUrl: '#'
					}
				]
			})
		}
	});

module.exports = data;
