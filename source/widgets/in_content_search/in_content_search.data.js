'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Suche nach Weiterbildungsangeboten',
			searchFilterPageURL: '/pages/search_filter/search_filter.html',
			facultyOptions: [
						{
							'optionLabel': 'International Studies',
							'optionValue': 'is'
						},
						{
							'optionLabel': 'Informatik',
							'optionValue': 'it',
							'selected': 'selected'
						},
						{
							'optionLabel': 'Life Sciences',
							'optionValue': 'ls'
						},
						{
							'optionLabel': 'Musik',
							'optionValue': 'mc'
						},
						{
							'optionLabel': 'Pädagogik',
							'optionValue': 'ph'
						},
						{
							'optionLabel': 'Psychologie',
							'optionValue': 'ps'
						},
						{
							'optionLabel': 'Soziale Arbeit',
							'optionValue': 'sw'
						},
						{
							'optionLabel': 'Technik',
							'optionValue': 'tn'
						}
					],
			studyTypeOptions:
					[
						{
							'optionLabel': 'MAS',
							'optionValue': 'mas'
						},
						{
							'optionLabel': 'CAS',
							'optionValue': 'cas',
							'selected': 'selected'
						},
						{
							'optionLabel': 'DAS',
							'optionValue': 'das'
						}
					]
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'In-Content Suche | WI_059',
				description: '',
				code: dataHelper.getTemplateCode('in_content_search.hbs'),
				documentation: dataHelper.getDocumentation('in_content_search.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
