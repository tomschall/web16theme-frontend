'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Suche: Veranstaltungen'
	},
	title: 'Veranstaltungen',
	langStrings: {
		labels: {
			term: 'Suchbegriff',
			faculty: 'Fachbereich',
			location: 'Standort'
		},
		resetFields: 'Alle Felder zurücksetzen',
		resultsFound: 'Veranstaltungen gefunden'
	},
	widgets: {
		header: _.assign({
			hasPromoTeaser: false,
			isCollapsible: false
		}, requireNew('../../widgets/header/header.data.js')),
		navigation: requireNew('../../widgets/navigation/navigation.data.js'),
		footer: requireNew('../../widgets/footer/footer.data.js'),
		searchpage: _.assign(requireNew('../../widgets/searchpage/searchpage.data.js'), {
			jsonURL: '/mocks/widgets/searchpage/searchpage.events.json',
			filterURL: '/mocks/widgets/searchpage/searchpage.updateFilter.json'
		}),
		hero: _.assign(requireNew('../../widgets/hero/hero.data.js'), {
			heroImage: '/assets/media/img/cas_eingl_mgmt_hero.png',
			heroAlt: 'Symbolbild',
			breadcrumb: null
		}),
		actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),
		facultyOptions: [
			{
				'optionLabel': 'Architektur, Bau & Geomatik',
				'optionValue': '1000'
			},
			{
				'optionLabel': 'International Studies',
				'optionValue': '1003'
			},
			{
				'optionLabel': 'Life Sciences',
				'optionValue': '1004'
			},
			{
				'optionLabel': 'Musik',
				'optionValue': '1005'
			},
		],
	locationOptions: [
			{
				'optionLabel': 'Basel',
				'optionValue': 'basel'
			},
			{
				'optionLabel': 'Muttenz',
				'optionValue': 'mtz'
			},
			{
				'optionLabel': 'Brugg-Windisch',
				'optionValue': 'brg'
			},
			{
				'optionLabel': 'Olten',
				'optionValue': 'olt'
			},
			{
				'optionLabel': 'Solothurn',
				'optionValue': 'slt'
			}
		],
		competenceOptions: [
			{
				'optionLabel': '',
				'optionValue': ''
			},
			{
				'optionLabel': 'Akustik',
				'optionValue': '7192'
			},
			{
				'optionLabel': 'Andragogik',
				'optionValue': '7191'
			},
			{
				'optionLabel': 'Architektur',
				'optionValue': '7193'
			},
			{
				'optionLabel': 'Audiodesign',
				'optionValue': '8335'
			},
			{
				'optionLabel': 'Automation',
				'optionValue': '7194'
			},
			{
				'optionLabel': 'Banking/Finance/Controlling',
				'optionValue': '7206'
			},
			{
				'optionLabel': 'Bau',
				'optionValue': '7195'
			},
			{
				'optionLabel': 'Bauleitung',
				'optionValue': '8080'
			},
			{
				'optionLabel': 'Begabungs-/Begabtenförderung',
				'optionValue': '7196'
			},
			{
				'optionLabel': 'Behinderung/Integration',
				'optionValue': '7197'
			},
			{
				'optionLabel': 'Beratung/Coaching',
				'optionValue': '7198'
			},
			{
				'optionLabel': 'Berufsrolle',
				'optionValue': '7199'
			},
			{
				'optionLabel': 'Bildung - Schule - Unterricht',
				'optionValue': '8092'
			},
			{
				'optionLabel': 'Change Management',
				'optionValue': '7200'
			},
			{
				'optionLabel': 'Dirigieren',
				'optionValue': '8336'
			},
			{
				'optionLabel': 'Disziplin/Partizipation',
				'optionValue': '7202'
			},
			{
				'optionLabel': 'Eingliederungsmanagement',
				'optionValue': '8026'
			},
			{
				'optionLabel': 'Einkauf/Beschaffung',
				'optionValue': '8096'
			},
			{
				'optionLabel': 'Elektronik',
				'optionValue': '7203'
			},
			{
				'optionLabel': 'Energie',
				'optionValue': '7204'
			},
			{
				'optionLabel': 'Ethik',
				'optionValue': '7205'
			},
			{
				'optionLabel': 'Forschung',
				'optionValue': '7207'
			},
			{
				'optionLabel': 'Geomatik',
				'optionValue': '7208'
			},
			{
				'optionLabel': 'Gestalten - Musik - Bewegung',
				'optionValue': '8095'
			},
			{
				'optionLabel': 'Gesundheit',
				'optionValue': '7209'
			},
			{
				'optionLabel': 'Graphic Design and Typography',
				'optionValue': '8347'
			},
			{
				'optionLabel': 'Heterogenität',
				'optionValue': '7210'
			},
			{
				'optionLabel': 'Human Resource Management',
				'optionValue': '7211'
			},
			{
				'optionLabel': 'Improvisation',
				'optionValue': '8337'
			},
			{
				'optionLabel': 'Informatik',
				'optionValue': '7212'
			},
			{
				'optionLabel': 'Integration',
				'optionValue': '7213'
			},
			{
				'optionLabel': 'Jazz',
				'optionValue': '8338'
			},
			{
				'optionLabel': 'Kinder und Jugendhilfe',
				'optionValue': '8377'
			},
			{
				'optionLabel': 'Kinder/Jugendliche',
				'optionValue': '7215'
			},
			{
				'optionLabel': 'Komposition',
				'optionValue': '8339'
			},
			{
				'optionLabel': 'Kulturmanagement',
				'optionValue': '7216'
			},
			{
				'optionLabel': 'Kunststofftechnik',
				'optionValue': '7217'
			},
			{
				'optionLabel': 'Lerncoaching',
				'optionValue': '7218'
			},
			{
				'optionLabel': 'Logistik',
				'optionValue': '7219'
			},
			{
				'optionLabel': 'Management/Führung',
				'optionValue': '7220'
			},
			{
				'optionLabel': 'Maschinenbau',
				'optionValue': '7221'
			},
			{
				'optionLabel': 'Methoden',
				'optionValue': '7223'
			},
			{
				'optionLabel': 'Migration',
				'optionValue': '7629'
			},
			{
				'optionLabel': 'Mikrotechnologie',
				'optionValue': '7224'
			},
			{
				'optionLabel': 'Musik',
				'optionValue': '8340'
			},
			{
				'optionLabel': 'Musik und Bewegung',
				'optionValue': '8341'
			},
			{
				'optionLabel': 'Musikpädagogik',
				'optionValue': '8343'
			},
			{
				'optionLabel': 'Musikvermittlung',
				'optionValue': '8344'
			},
			{
				'optionLabel': 'Nachhaltigkeit',
				'optionValue': '8184'
			},
			{
				'optionLabel': 'Natur - Gesellschaft - Technik',
				'optionValue': '8094'
			},
			{
				'optionLabel': 'Nonprofit Management',
				'optionValue': '7226'
			},
			{
				'optionLabel': 'Ökologie',
				'optionValue': '8183'
			},
			{
				'optionLabel': 'Online-Marketing',
				'optionValue': '7850'
			},
			{
				'optionLabel': 'Pädagogischer ICT-Support',
				'optionValue': '7227'
			},
			{
				'optionLabel': 'Performance',
				'optionValue': '8345'
			},
			{
				'optionLabel': 'Praxisausbildende Soz.Arbeit',
				'optionValue': '7228'
			},
			{
				'optionLabel': 'Public Management',
				'optionValue': '7879'
			},
			{
				'optionLabel': 'Qualitätsmanagement',
				'optionValue': '7231'
			},
			{
				'optionLabel': 'Recht',
				'optionValue': '7229'
			},
			{
				'optionLabel': 'Schulleitung',
				'optionValue': '7230'
			},
			{
				'optionLabel': 'Schulmusik',
				'optionValue': '8346'
			},
			{
				'optionLabel': 'Sicherheitsmanagement',
				'optionValue': '7232'
			},
			{
				'optionLabel': 'Sozialmanagement',
				'optionValue': '7233'
			},
			{
				'optionLabel': 'Sozialplanung',
				'optionValue': '8155'
			},
			{
				'optionLabel': 'Sport',
				'optionValue': '8385'
			},
			{
				'optionLabel': 'Sprachen - Mathematik - Medien',
				'optionValue': '8093'
			},
			{
				'optionLabel': 'Stadtentwicklung',
				'optionValue': '7819'
			},
			{
				'optionLabel': 'Train-the-Trainers',
				'optionValue': '7235'
			},
			{
				'optionLabel': 'Umwelt',
				'optionValue': '7239'
			},
			{
				'optionLabel': 'Umweltmanagement',
				'optionValue': '7237'
			},
			{
				'optionLabel': 'Umweltrecht',
				'optionValue': '8185'
			},
			{
				'optionLabel': 'Umweltschutz',
				'optionValue': '7238'
			},
			{
				'optionLabel': 'Umwelttechnik',
				'optionValue': '7236'
			},
			{
				'optionLabel': 'Unternehmenskommunikation',
				'optionValue': '7241'
			},
			{
				'optionLabel': 'Usability/User Experience',
				'optionValue': '8307'
			},
			{
				'optionLabel': 'Weiterbildung im Bildungsraum',
				'optionValue': '8145'
			},
			{
				'optionLabel': 'Wirtschaftsinformatik/E-Business',
				'optionValue': '7243'
			},
			{
				'optionLabel': 'Zusammenarbeit',
				'optionValue': '7244'
			}
		]
	}
});

module.exports = data;
