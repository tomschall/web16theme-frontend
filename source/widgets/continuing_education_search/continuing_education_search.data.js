'use strict';

var _ = require('lodash'),
  requireNew = require('require-new'),
  dataHelper = require('../../../helpers/data.js'),
  defaultData = requireNew('../../data/default.data.js');

var templateData = {
<<<<<<< HEAD
  langStrings: {
    title: 'Title add by PLONE',
    description: 'Description added by PLONE',
  },
  widgetData: JSON.stringify({
    filterSubjectArea: false,
    filterDateLine: false,
    filterLocation: false,
    subjectAreaOptions: [
      {
        optionValue: '1003',
        optionLabel: 'International Studies',
        selected: false,
      },
      {
        optionValue: '1009',
        optionLabel: 'Technik',
        selected: false,
      },
    ],
    dateLineOptions: [
      {
        optionValue: '8wjt11bpvt',
        optionLabel: 'Ausbildungen',
        selected: false,
      },
      {
        optionValue: '2000',
        optionLabel: 'CAS',
        selected: false,
      },
      {
        optionValue: '2001',
        optionLabel: 'DAS',
        selected: false,
      },
      {
        optionValue: '2015',
        optionLabel: 'Studierendenseminar',
        selected: false,
      },
      {
        optionValue: '2018',
        optionLabel: 'Tagung',
        selected: false,
      },
      {
        optionValue: 'kr5y78pjyt',
        optionLabel: 'Weiterbildungen',
        selected: false,
        hide: true,
      },
    ],
    locationOptions: [
      {
        optionValue: 'crrsav5xc4',
        optionLabel: 'Andere',
        selected: false,
      },
      {
        optionValue: 'basel',
        optionLabel: 'Basel',
        selected: false,
      },
      {
        optionValue: 'muttenz',
        optionLabel: 'Muttenz',
        selected: false,
      },
    ],
    subject: [],
    jsonURL: 'http://localhost:8000/Plone/de/searchbar.json',
    filterURL: 'http://localhost:8000/Plone/de/searchbar.json',
  }),
};

var data = _.merge(
  defaultData,
  {
    meta: {
      title: 'Continuing Education Search | WI_076',
      description: '',
      code: dataHelper.getTemplateCode('continuing_education_search.hbs'),
      documentation: dataHelper.getDocumentation(
        'continuing_education_search.md'
      ),
      mocks: [
        {
          description: null,
          data: dataHelper.getFormattedJSON(templateData),
        },
      ],
    },
  },
  templateData
);
=======
		widget_data:
			'{"filterSubjectArea": false, "filterDateLine": true, "filterLocation": true, "showImages": true, ' +
			'"initialResultLayout": "teaser_layout", "subjectAreaOptions": [{"optionValue": "1003", "optionLabel": "International Studies", ' +
			'"selected": false}, {"optionValue": "1009", "optionLabel": "Technik", "selected": false}], "dateLineOptions": [{"optionValue": "cas",' +
			'"optionLabel": "CAS", "selected": false}, {"optionValue": "infoanlass", "optionLabel": "Info-Anlass", "selected": true}, ' +
			'{"optionValue": "masterofarts", "optionLabel": "Master of Arts", "selected": false}], "locationOptions": [{"optionValue": "crrsav5xc4", ' +
			'"optionLabel": "Andere", "selected": false}, {"optionValue": "basel", "optionLabel": "Basel", "selected": false}, ' +
			'{"optionValue": "muttenz", "optionLabel": "Muttenz", "selected": false}], "subject": [], ' +
			'"jsonURL": "http://localhost:8000/Plone/de/searchbar.json", "filterURL": "http://localhost:8000/Plone/de/searchbar.json"}',
	},
	data = _.merge(
		defaultData,
		{
			meta: {
				title: 'Continuing Education Search | WI_076',
				description: '',
				code: dataHelper.getTemplateCode('continuing_education_search.hbs'),
				documentation: dataHelper.getDocumentation(
					'continuing_education_search.md'
				),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData),
					},
				],
			},
		},
		templateData
	);
>>>>>>> master

module.exports = data;
