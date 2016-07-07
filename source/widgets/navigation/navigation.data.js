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
						link: '#'
					},
					{
						title: 'Weiterbildung',
						link: '#'
					},
					{
						title: 'Forschung & Praxis',
						link: '#'
					},
					{
						title: 'Die FHNW',
						link: '',
						list: {
							level: 1,
							entries: [
								{
									title: 'Übersicht',
									link: '../about_us/about_us.html'
								},
								{
									title: 'Portrait',
									link: '#'
								},
								{
									title: 'Hochschulen',
									link: '#',
									list: {
										level: 2,
										entries: [
											{
												title: 'Hochschule für Angewandte Psychologie',
												link: '../university_for_applied_psychology/university_for_applied/psychology.html'
											},
											{
												title: 'Hochschule für Architektur, Bau und Geomatik',
												link: '#',
												list: {
													level: 3,
													entries: [
														{
															title: 'Übersicht',
															link: '#'
														},
														{
															title: 'Institut für Architektur',
															link: '#'
														},
														{
															title: 'Institut für Bauingenieurwesen',
															link: '#'
														},
														{
															title: 'Institut für Vermessung und Geoinformation',
															link: '#'
														},
														{
															title: 'Institut für Energie am Bau',
															link: '#'
														}
													]
												}
											},
											{
												title: 'Hochschule für Gestaltung und Kunst',
												link: '#'
											},
											{
												title: 'Hochschule für Life Sciences',
												link: '#',
												list: {
													level: 3,
													entries: [
														{
															title: 'Übersicht',
															link: '#'
														},
														{
															title: 'Lorem ipsum dolor',
															link: '#'
														},
														{
															title: 'Vanitas Carpe',
															link: '#'
														},
														{
															title: 'Institut für Medizinal- und Analysetechnologie',
															link: '#'
														},
														{
															title: 'Institut für Chemie und Bioanalytik',
															link: '#'
														},
														{
															title: 'Institut für Pharma Technology',
															link: '#'
														},
														{
															title: 'Institut für Ecopreneurship',
															link: '#'
														}
													]
												}
											},
											{
												title: 'Musikhochschulen',
												link: '../music_school/music_school.html'
											},
											{
												title: 'Pädagogische Hochschule',
												link: '#'
											},
											{
												title: 'Hochschule für Soziale Arbeit',
												link: '#'
											},
											{
												title: 'Hochschule für Technik',
												link: '#'
											},
											{
												title: 'Hochschule für Wirtschaft',
												link: '#'
											}
										]
									}
								},
								{
									title: 'Organisation',
									link: '#'
								},
								{
									title: 'Alumni',
									link: '#'
								},
								{
									title: 'Stiftung',
									link: '#'
								},
								{
									title: 'Publikation',
									link: '#',
									list: {
										level: 2,
										entries: [
											{
												title: 'Übersicht',
												link: '#'
											},
											{
												title: 'Studentische Arbeiten',
												link: '#'
											},
											{
												title: 'Projekte',
												link: '#'
											}
										]
									}
								},
								{
									title: 'Rechtliche Dokumente',
									link: '#'
								},
								{
									title: 'Kontakt',
									link: '#'
								}
							]
						}
					}
				]
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
