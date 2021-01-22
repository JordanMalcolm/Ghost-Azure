var templates = {},
    _ = require('lodash'),
    proxy = require('./proxy'),
    hbs = require('../services/themes/engine');

// ## Template utils
<<<<<<< HEAD:core/frontend/services/themes/handlebars/template.js
const templates = {};
const _ = require('lodash');
const errors = require('@tryghost/errors');
const hbs = require('../engine');
const {i18n} = require('../../proxy');
=======
>>>>>>> parent of 3218606... Add v3.13.0:core/frontend/helpers/template.js

// Execute a template helper
// All template helpers are register as partial view.
templates.execute = function execute(name, context, data) {
    const partial = hbs.handlebars.partials[name];

    if (partial === undefined) {
        throw new proxy.errors.IncorrectUsageError({
            message: proxy.i18n.t('warnings.helpers.template.templateNotFound', {name: name})
        });
    }

    // If the partial view is not compiled, it compiles and saves in handlebars
    if (typeof partial === 'string') {
        hbs.registerPartial(partial);
    }

    return new hbs.SafeString(partial(context, data));
};

templates.asset = _.template('<%= source %>?v=<%= version %>');
templates.link = _.template('<a href="<%= url %>"><%= text %></a>');
templates.script = _.template('<script src="<%= source %>?v=<%= version %>"></script>');
templates.input = _.template('<input class="<%= className %>" type="<%= type %>" name="<%= name %>" <%= extras %> />');

module.exports = templates;
