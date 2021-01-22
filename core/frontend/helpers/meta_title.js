// # Meta Title Helper
// Usage: `{{meta_title}}`
//
// Page title used for sharing and SEO
<<<<<<< HEAD
const {metaData} = require('../services/proxy');
const {getMetaDataTitle} = metaData;
=======
var proxy = require('./proxy'),
    getMetaDataTitle = proxy.metaData.getMetaDataTitle;
>>>>>>> parent of 3218606... Add v3.13.0

// We use the name meta_title to match the helper for consistency:
module.exports = function meta_title(options) { // eslint-disable-line camelcase
    return getMetaDataTitle(this, options.data.root, options);
};
