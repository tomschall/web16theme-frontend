'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			xingURL: 'http://www.xing.com',
			twitterURL: 'http://www.twitter.com',
			fbURL: 'http://www.facebook.com',
			linkedinURL: 'https://www.linkedin.com/organization/50566'
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'SocialMedia Links | WI_038',
				description: '',
				code: dataHelper.getTemplateCode('somelinks.hbs'),
				documentation: dataHelper.getDocumentation('somelinks.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
