'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Kooperationspartner',
			listEntries: [
				{
					title: 'BBT, Bundesamt für Berufsbildung und Technologie',
					entryText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.',
					img: {
						src: '/assets/media/img/bund_logo.png',
						alt: 'Bundesamt für Berufsbildung und Technologie'
					},
					url: '#',
					isExternal: false
				},
				{
					title: 'Bundesministerium des Innern',
					entryText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.',
					img: {
						src: '/assets/media/img/bmi_logo.png',
						alt: 'Bundesministerium des Innern'
					},
					url: '#',
					isExternal: true
				},
				{
					title: 'Kanton Aargau, Departement Gesundheit und Soziales',
					entryText: 'ist für die Luftfahrtentwicklung und die Aufsicht über die zivile Luftfahrt in der Schweiz zuständig. Das BAZL gehört zum Eidgenössischen Departement für Umwelt, Verkehr, Energie und Kommunikation (UVEK) und ist dafür verantwortlich, dass die Zivilluftfahrt in der Schweiz ein hohes Sicherheitsniveau.',
					url: '#',
					isExternal: true,
					news_detail: {
						news_date: '27.07.2017',
						university: 'Hochschule für Pädagogik'
					}
				},
				{
					title: 'Stadtpolizei Zürich, Wissenschaftlicher Forschungsdienst (WFD)',
					entryText: 'ist für die Luftfahrtentwicklung und die Aufsicht über die zivile Luftfahrt in der Schweiz zuständig. Das BAZL gehört zum Eidgenössischen Departement für Umwelt, Verkehr, Energie und Kommunikation (UVEK) und ist dafür verantwortlich, dass die Zivilluftfahrt in der Schweiz ein hohes Sicherheitsniveau.',
					img: {
						src: '/assets/media/img/stzh_logo.jpg',
						alt: 'Stadtpolizei Zürich'
					},
					news_detail: {
						news_date: '27.06.2017',
						university: 'Hochschule für angewandte Psychologie'
					},
					url: '#',
					isExternal: true
				}
			]
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Link-Liste mit/ohne Bildern | WI_063',
				description: '',
				code: dataHelper.getTemplateCode('linklist.hbs'),
				documentation: dataHelper.getDocumentation('linklist.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
