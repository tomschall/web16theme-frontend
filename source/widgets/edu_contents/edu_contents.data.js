'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {},
	data = _.assign(
		defaultData,
		{
			meta: {
				title: 'EDU Contents | WI_075',
				description: '',
				code: dataHelper.getTemplateCode('edu_contents.hbs'),
				documentation: dataHelper.getDocumentation('edu_contents.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData),
					},
				],
			},
			widgets: {
				edu_key_datas: _.assign(
					requireNew('../../widgets/edu_key_data/edu_key_data.data.js')
				),
				application: _.assign(
					requireNew('../../widgets/edu_application/edu_application.data.js')
				),
				events: _.assign(
					requireNew('../../widgets/edu_events/edu_events.data.js')
				),
			},
		},
		templateData
	);

module.exports = data;
