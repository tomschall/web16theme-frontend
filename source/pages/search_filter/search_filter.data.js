'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Suchesuche mit Filter - Weiterbildungsangebot der FHNW'
		},
		title: 'Weiterbildungsangebot der FHNW',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: false
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			searchpage: requireNew('../../widgets/searchpage/searchpage.data.js')
		}
	});

module.exports = data;
