'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Kompetenzgebiete',
			text: 'Hier finden Sie unsere Kompetenzgebiete lorem ipsum dolor vanitas carpe diem memento mori alea iacta est.',
			link: {
				url: '#',
				title: 'Alle ansehen'
			},
			options: [
				{
					expertiseID: '7192',
					expertiseTitle: 'Akustik'
				},
				{
					expertiseID: '7191',
					expertiseTitle: 'Andragogik'
				},
				{
					expertiseID: '7193',
					expertiseTitle: 'Architektur'
				},
				{
					expertiseID: '8335',
					expertiseTitle: 'Audiodesign'
				},
				{
					expertiseID: '7194',
					expertiseTitle: 'Automation'
				},
				{
					expertiseID: '7206',
					expertiseTitle: 'Banking/Finance/Controlling'
				},
				{
					expertiseID: '7195',
					expertiseTitle: 'Bau'
				},
				{
					expertiseID: '8080',
					expertiseTitle: 'Bauleitung'
				},
				{
					expertiseID: '7196',
					expertiseTitle: 'Begabungs-/Begabtenförderung'
				},
				{
					expertiseID: '7191',
					expertiseTitle: 'Behinderung/Integration'
				},
				{
					expertiseID: '7198',
					expertiseTitle: 'Beratung/Coaching'
				},
				{
					expertiseID: '7199',
					expertiseTitle: 'Berufsrolle'
				},
				{
					expertiseID: '8092',
					expertiseTitle: 'Bildung - Schule - Unterricht'
				},
				{
					expertiseID: '7200',
					expertiseTitle: 'Change Management'
				},
				{
					expertiseID: '8336',
					expertiseTitle: 'Dirigieren'
				},
				{
					expertiseID: '7202',
					expertiseTitle: 'Disziplin/Partizipation'
				},
				{
					expertiseID: '8026',
					expertiseTitle: 'Eingliederungsmanagement'
				},
				{
					expertiseID: '8096',
					expertiseTitle: 'Einkauf/Beschaffung'
				},
				{
					expertiseID: '7203',
					expertiseTitle: 'Elektronik'
				},
				{
					expertiseID: '7204',
					expertiseTitle: 'Energie'
				},
				{
					expertiseID: '7205',
					expertiseTitle: 'Ethik'
				},
				{
					expertiseID: '7207',
					expertiseTitle: 'Forschung'
				},
				{
					expertiseID: '7208',
					expertiseTitle: 'Geomatik'
				},
				{
					expertiseID: '8095',
					expertiseTitle: 'Gestalten - Musik - Bewegung'
				},
				{
					expertiseID: '7209',
					expertiseTitle: 'Gesundheit'
				},
				{
					expertiseID: '8347',
					expertiseTitle: 'Graphich Design and Typography'
				},
				{
					expertiseID: '7210',
					expertiseTitle: 'Heterogenität'
				},
				{
					expertiseID: '7211',
					expertiseTitle: 'Human Resource Management'
				},
				{
					expertiseID: '8337',
					expertiseTitle: 'Improvisation'
				},
				{
					expertiseID: '7212',
					expertiseTitle: 'Informatik'
				},
				{
					expertiseID: '7213',
					expertiseTitle: 'Integration'
				},
				{
					expertiseID: '8338',
					expertiseTitle: 'Jazz'
				},
				{
					expertiseID: '8377',
					expertiseTitle: 'Kinder und Jugendhilfe'
				},
				{
					expertiseID: '8339',
					expertiseTitle: 'Komposition'
				},
				{
					expertiseID: '7216',
					expertiseTitle: 'Kulturmanagement'
				},
				{
					expertiseID: '7217',
					expertiseTitle: 'Kunststofftechnik'
				},
				{
					expertiseID: '7218',
					expertiseTitle: 'Lerncoaching'
				},
				{
					expertiseID: '7219',
					expertiseTitle: 'Logistik'
				},
				{
					expertiseID: '7220',
					expertiseTitle: 'Management/Führung'
				},
				{
					expertiseID: '7221',
					expertiseTitle: 'Maschinenbau'
				}
			],
			landingpageURL: '/pages/ppp/ppp.html',
			langStrings: {
				chooseCompetence: 'Wählen sie eine Kompetenz aus...'
			}
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Kompetenz Auswahl | WI_064',
				description: '',
				code: dataHelper.getTemplateCode('expertise_areas.hbs'),
				documentation: dataHelper.getDocumentation('expertise_areas.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
