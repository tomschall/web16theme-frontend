'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Cookie confirmation',
			description: 'A very nice Cookie confirmation module',
			jira: 'ESTATICO-182',
			code: dataHelper.getTemplateCode('cookieconfirmation.hbs'),
			documentation: dataHelper.getDocumentation('cookieconfirmation.md')
		},
		title: 'Crispy Peanut Butter Chocolate Chip Cookies (Gluten-Free)',
		text: 'These peanut butter chocolate cookies are made gluten-free by using almonds and gluten-free oats – both ground in my Vitamix to make a flour. You can either grind it yourself in a high-speed blender or you can buy pre-made almond and oat flour. I weighed and measured the amounts to take the guess work out of it for you. As is the case with many of my vegan cookie recipes, a flax egg (which is simply ground flax mixed with water) mimics the texture of a traditional hen’s egg. Read more at <a href="http://ohsheglows.com/2012/12/05/crispy-peanut-butter-chocolate-chip-cookies-vegan-gluten-free/">ohsheglows.com</a>',
		button: 'Accept'
	});

module.exports = data;
