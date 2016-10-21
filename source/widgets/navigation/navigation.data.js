'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		dataHelper = require('../../../helpers/data.js'),
		defaultData = requireNew('../../data/default.data.js');

var templateData = {
			list: {
				level: 0,
				entries: [
					{
						title: 'Studium',
						url: '#'
					},
					{
						title: 'Weiterbildung',
						url: '#'
					},
					{
						title: 'Forschung & Dienstleistung',
						url: '#',
						list: {
							level: 1,
							entries: [
								{
									title: 'Übersicht',
									url: '#'
								}
							]
						}
					},
					{
						title: 'Die FHNW',
						url: '',
						list: {
							level: 1,
							entries: [
								{
									title: 'Übersicht',
									url: '../about_us/about_us.html'
								},
								{
									title: 'Portrait',
									url: '#'
								},
								{
									title: 'Hochschulen',
									url: '#',
									list: {
										level: 2,
										entries: [
											{
												title: 'Hochschule für Angewandte Psychologie',
												url: '../university_for_applied_psychology/university_for_applied/psychology.html'
											},
											{
												title: 'Hochschule für Architektur, Bau und Geomatik',
												url: '#',
												list: {
													level: 3,
													entries: [
														{
															title: 'Übersicht',
															url: '#'
														},
														{
															title: 'Institut für Architektur',
															url: '#'
														},
														{
															title: 'Institut für Bauingenieurwesen',
															url: '#'
														},
														{
															title: 'Institut für Vermessung und Geoinformation',
															url: '#'
														},
														{
															title: 'Institut für Energie am Bau',
															url: '#'
														}
													]
												}
											},
											{
												title: 'Hochschule für Gestaltung und Kunst',
												url: '#'
											},
											{
												title: 'Hochschule für Life Sciences',
												url: '#',
												list: {
													level: 3,
													entries: [
														{
															title: 'Übersicht',
															url: '#'
														},
														{
															title: 'Lorem ipsum dolor',
															url: '#'
														},
														{
															title: 'Vanitas Carpe',
															url: '#'
														},
														{
															title: 'Institut für Medizinal- und Analysetechnologie',
															url: '#'
														},
														{
															title: 'Institut für Chemie und Bioanalytik',
															url: '#'
														},
														{
															title: 'Institut für Pharma Technology',
															url: '#'
														},
														{
															title: 'Institut für Ecopreneurship',
															url: '#'
														}
													]
												}
											},
											{
												title: 'Musikhochschulen',
												url: '../music_school/music_school.html'
											},
											{
												title: 'Pädagogische Hochschule',
												url: '#'
											},
											{
												title: 'Hochschule für Soziale Arbeit',
												url: '#'
											},
											{
												title: 'Hochschule für Technik',
												url: '#'
											},
											{
												title: 'Hochschule für Wirtschaft',
												url: '#'
											}
										]
									}
								},
								{
									title: 'Organisation',
									url: '#'
								},
								{
									title: 'Alumni',
									url: '#'
								},
								{
									title: 'Stiftung',
									url: '#'
								},
								{
									title: 'Publikation',
									url: '#',
									list: {
										level: 2,
										entries: [
											{
												title: 'Übersicht',
												url: '#'
											},
											{
												title: 'Studentische Arbeiten',
												url: '#'
											},
											{
												title: 'Projekte',
												url: '#'
											}
										]
									}
								},
								{
									title: 'Rechtliche Dokumente',
									url: '#'
								},
								{
									title: 'Kontakt',
									url: '#'
								}
							]
						}
					}
				]
			},
			langStrings: {
				back: 'Zurück'
			}
		},

		data = _.merge(defaultData, {
			meta: {
				title: 'Top-Navigation | WI_007',
				description: '',
				code: dataHelper.getTemplateCode('navigation.hbs'),
				documentation: dataHelper.getDocumentation('navigation.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
