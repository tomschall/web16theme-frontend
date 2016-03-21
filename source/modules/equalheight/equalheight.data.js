'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Equalheight',
		description: 'A very nice Equalheight module',
		jira: 'ESTATICO-37',
		feature: 'Equal height fallback, flexbox-like',
		code: dataHelper.getTemplateCode('equalheight.hbs'),
		documentation: dataHelper.getDocumentation('equalheight.md')/*,
		testScripts: [
			dataHelper.getTestScriptPath('equalheight.test.js')
		]*/
	},
	lorem: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, dicta, dignissimos earum expedita fuga fugiat fugit id in ipsa nesciunt quae quasi quidem quis rem, sed sunt tempora veniam voluptatem! ',
	cards: _.fill(new Array(8), {})
});

data.cards = _.map(data.cards, function(card, i) {
	// Increase the text in the tabs to have several text lengths
	return {
		text: _.repeat(data.lorem, (i % 3) + 1)
	};
});

module.exports = data;
