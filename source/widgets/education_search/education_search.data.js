'use strict';

var _ = require('lodash'),
  requireNew = require('require-new'),
  dataHelper = require('../../../helpers/data.js'),
  defaultData = requireNew('../../data/default.data.js');

var templateData = {
  langStrings: {
    title: 'Title add by PLONE',
    description: 'Description added by PLONE',
  },
  widgetData: '',
};

var data = _.merge(
  defaultData,
  {
    meta: {
      title: 'Education Search | WI_077',
      description: '',
      code: dataHelper.getTemplateCode('education_search.hbs'),
      documentation: dataHelper.getDocumentation('education_search.md'),
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

module.exports = data;
