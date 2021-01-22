// # Title Helper
// Usage: `{{title}}`
//
// Overrides the standard behaviour of `{[title}}` to ensure the content is correctly escaped

<<<<<<< HEAD
const {SafeString, escapeExpression} = require('../services/proxy');
=======
var proxy = require('./proxy'),
    SafeString = proxy.SafeString,
    escapeExpression = proxy.escapeExpression;
>>>>>>> parent of 3218606... Add v3.13.0

module.exports = function title() {
    return new SafeString(escapeExpression(this.title || ''));
};
