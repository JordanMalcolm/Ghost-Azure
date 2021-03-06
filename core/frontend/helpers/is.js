// # Is Helper
// Usage: `{{#is "paged"}}`, `{{#is "index, paged"}}`
// Checks whether we're in a given context.
<<<<<<< HEAD
const {logging, i18n} = require('../services/proxy');
const _ = require('lodash');
=======
var proxy = require('./proxy'),
    _ = require('lodash'),
    logging = proxy.logging,
    i18n = proxy.i18n;
>>>>>>> parent of 3218606... Add v3.13.0

module.exports = function is(context, options) {
    options = options || {};

    const currentContext = options.data.root.context;

    if (!_.isString(context)) {
        logging.warn(i18n.t('warnings.helpers.is.invalidAttribute'));
        return;
    }

    function evaluateContext(expr) {
        return expr.split(',').map(function (v) {
            return v.trim();
        }).reduce(function (p, c) {
            return p || _.includes(currentContext, c);
        }, false);
    }

    if (evaluateContext(context)) {
        return options.fn(this);
    }
    return options.inverse(this);
};

