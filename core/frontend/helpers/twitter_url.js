// # Twitter URL Helper
// Usage: `{{twitter_url}}` or `{{twitter_url author.twitter}}`
//
// Output a url for a twitter username
<<<<<<< HEAD
const {socialUrls, localUtils} = require('../services/proxy');
=======
var proxy = require('./proxy'),
    socialUrls = proxy.socialUrls,
    localUtils = proxy.localUtils;
>>>>>>> parent of 3218606... Add v3.13.0

// We use the name twitter_url to match the helper for consistency:
module.exports = function twitter_url(username, options) { // eslint-disable-line camelcase
    if (!options) {
        options = username;
        username = localUtils.findKey('twitter', this, options.data.site);
    }

    if (username) {
        return socialUrls.twitter(username);
    }

    return null;
};
