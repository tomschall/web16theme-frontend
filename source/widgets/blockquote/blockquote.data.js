'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			quote: 'Ganzheitliche Ansätze und die Kombination von industrieller Produktion, Umweltschutz und moderner Ressourcenrückgewinnung sind Zukunftsthemen. Die Hochschule für Life Sciences FHNW ist bereits aktiv dabei engagiert.',
			author: 'Prof. Dr. Frank Pude, Leiter Aus- und Weiterbildung'
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Zitate, Testimonial | WI_047',
				description: '',
				code: dataHelper.getTemplateCode('blockquote.hbs'),
				documentation: dataHelper.getDocumentation('blockquote.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;