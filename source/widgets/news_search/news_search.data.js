'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'News Search',
			description: 'Lorem ipsum dolor sit amet ...',
			searchpage: _.assign(requireNew('../../widgets/searchpage/searchpage.data.js'), {
				jsonURL: '/mocks/widgets/searchpage/searchpage.category.json'
			}),
			widgets: {
					label_search: 'Suchbegriff',
					label_btn_search: 'Suchen',
					label_reset_fields: 'Alle Felder zurücksetzen',
					label_school: 'Hochschule',
					label_date: 'Datum',
					schoolOptions: [
            {
              'optionLabel': 'Brugg/Windisch',
              'optionValue': '1000'
            },
            {
              'optionLabel': 'Basel',
              'optionValue': '1003'
            },
            {
              'optionLabel': 'Aarau',
              'optionValue': '1004'
            },
          ],
          dateOptions: [
            {
              'optionLabel': 'Date1',
              'optionValue': 'date1'
            },
            {
              'optionLabel': 'Date2',
              'optionValue': 'date2'
            },
            {
              'optionLabel': 'Date3',
              'optionValue': 'date3'
            },
          ],
				}
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'News Search | WI_074',
				description: '',
				code: dataHelper.getTemplateCode('news_search.hbs'),
				documentation: dataHelper.getDocumentation('news_search.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
