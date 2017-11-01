'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Events Detail',
	},
	title: 'Wirtschaftsforum',
	event_detail: _.assign ({
		event_date: '1.11.2017',
		university: 'Hochschule für Wirtschaft'
	}),
	text__lead: 'TEXTLEAD - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
	widgets: {
		header: _.assign({
			hasPromoTeaser: false,
			isCollapsible: true
		},requireNew('../../widgets/header/header.data.js')),
		navigation: requireNew('../../widgets/navigation/navigation.data.js'),
		footer: requireNew('../../widgets/footer/footer.data.js'),
		hero: _.assign({
			heroImage: '/assets/media/img/building_brugg.png',
			heroAlt: 'Symbolbild',
			breadcrumb: requireNew('../../widgets/breadcrumb/breadcrumb.data.js'),
		},
		requireNew('../../widgets/hero/hero.data.js')),
		sidebar: _.assign(requireNew('../../widgets/sidebar/sidebar.data.js'), {
			widgets: {
				application: _.assign(requireNew('../../widgets/sidebar_application/sidebar_application.data.js'), {
					text: 'Melden Sie sich direkt auf der Webseite des Wirtschaftsforums für diesen Anlass an.',
					note: '',
					button: {
						text: 'Zur Anmeldung'
					}
				}),
				contact: _.assign(requireNew('../../widgets/sidebar_contact/sidebar_contact.data.js'), {
					contacts: [
						{
							img: {
								src: '/assets/media/img/img_contact_woman.png',
								alt: 'Prof. Dr. Maria Muster'
							},
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
		mobileContentNavigation: requireNew('../../widgets/mobile_content_navigation/mobile_content_navigation.data.js'),
	}
});

module.exports = data;
