'use strict';

var _ = require('lodash'),
  requireNew = require('require-new'),
  dataHelper = require('../../../helpers/data.js'),
  defaultData = requireNew('../../data/default.data.js');

var templateData = {
    button: {
      text: 'Alle ansehen',
      url: '#targetInfoEvents',
    },
    title: 'Infoveranstaltungen',
    entries: [],
  },
  data = _.merge(
    defaultData,
    {
      meta: {
        title: 'Svelte | WI_XXX',
        description: '',
        code: dataHelper.getTemplateCode('svelte.hbs'),
        documentation: dataHelper.getDocumentation('svelte.md'),
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
