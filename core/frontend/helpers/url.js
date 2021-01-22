// # URL helper
// Usage: `{{url}}`, `{{url absolute="true"}}`
//
// Returns the URL for the current object scope i.e. If inside a post scope will return post permalink
// `absolute` flag outputs absolute URL, else URL is relative

<<<<<<< HEAD
const {SafeString, metaData} = require('../services/proxy');
const {getMetaDataUrl} = metaData;
=======
var proxy = require('./proxy'),
    SafeString = proxy.SafeString,
    getMetaDataUrl = proxy.metaData.getMetaDataUrl;
>>>>>>> parent of 3218606... Add v3.13.0

module.exports = function url(options) {
    const absolute = options && options.hash.absolute && options.hash.absolute !== 'false';
    let outputUrl = getMetaDataUrl(this, absolute);

    outputUrl = encodeURI(decodeURI(outputUrl));

    return new SafeString(outputUrl);
};
