const {i18n} = require('../../lib/common');
const errors = require('@tryghost/errors');
const {extract, hasProvider} = require('oembed-parser');
const Promise = require('bluebird');
const externalRequest = require('../../lib/request-external');
const cheerio = require('cheerio');

const findUrlWithProvider = (url) => {
    let provider;

    // build up a list of URL variations to test against because the oembed
    // providers list is not always up to date with scheme or www vs non-www
    let baseUrl = url.replace(/^\/\/|^https?:\/\/(?:www\.)?/, '');
    let testUrls = [
        `http://${baseUrl}`,
        `https://${baseUrl}`,
        `http://www.${baseUrl}`,
        `https://www.${baseUrl}`
    ];

    for (let testUrl of testUrls) {
        provider = hasProvider(testUrl);
        if (provider) {
            url = testUrl;
            break;
        }
    }

    return {url, provider};
};

<<<<<<< HEAD
function unknownProvider(url) {
    return Promise.reject(new errors.ValidationError({
        message: i18n.t('errors.api.oembed.unknownProvider'),
        context: url
    }));
}

function knownProvider(url) {
    return extract(url, {maxwidth: 1280}).catch((err) => {
        return Promise.reject(new errors.InternalServerError({
            message: err.message
        }));
    });
}

function isIpOrLocalhost(url) {
    try {
        const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const IPV6_REGEX = /:/; // fqdns will not have colons
        const HTTP_REGEX = /^https?:/i;

        const {protocol, hostname} = new URL(url);
=======
const getOembedUrlFromHTML = (html) => {
    return cheerio('link[type="application/json+oembed"]', html).attr('href');
};
>>>>>>> parent of 3218606... Add v3.13.0

module.exports = {
    docName: 'oembed',

    read: {
        permissions: false,
        data: [
            'url'
        ],
        options: [],
        query({data}) {
            let {url} = data;

            function unknownProvider() {
                return Promise.reject(new common.errors.ValidationError({
                    message: common.i18n.t('errors.api.oembed.unknownProvider'),
                    context: url
                }));
            }

            function knownProvider(url) {
                return extract(url).catch((err) => {
                    return Promise.reject(new common.errors.InternalServerError({
                        message: err.message
                    }));
                });
            }

            let provider;
            ({url, provider} = findUrlWithProvider(url));

<<<<<<< HEAD
    // url not in oembed list so fetch it in case it's a redirect or has a
    // <link rel="alternate" type="application/json+oembed"> element
    return externalRequest(url, {
        method: 'GET',
        timeout: 2 * 1000,
        followRedirect: true
    }).then((pageResponse) => {
        // url changed after fetch, see if we were redirected to a known oembed
        if (pageResponse.url !== url) {
            ({url, provider} = findUrlWithProvider(pageResponse.url));
=======
>>>>>>> parent of 3218606... Add v3.13.0
            if (provider) {
                return knownProvider(url);
            }

<<<<<<< HEAD
        // check for <link rel="alternate" type="application/json+oembed"> element
        let oembedUrl;
        try {
            oembedUrl = cheerio('link[type="application/json+oembed"]', pageResponse.body).attr('href');
        } catch (e) {
            return unknownProvider(url);
        }

        if (oembedUrl) {
            // make sure the linked url is not an ip address or localhost
            if (isIpOrLocalhost(oembedUrl)) {
                return unknownProvider(oembedUrl);
            }

            // fetch oembed response from embedded rel="alternate" url
            return externalRequest(oembedUrl, {
                method: 'GET',
                json: true,
                timeout: 2 * 1000,
                followRedirect: true
            }).then((oembedResponse) => {
                // validate the fetched json against the oembed spec to avoid
                // leaking non-oembed responses
                const body = oembedResponse.body;
                const hasRequiredFields = body.type && body.version;
                const hasValidType = ['photo', 'video', 'link', 'rich'].includes(body.type);

                if (hasRequiredFields && hasValidType) {
                    // extract known oembed fields from the response to limit leaking of unrecognised data
                    const knownFields = [
                        'type',
                        'version',
                        'html',
                        'url',
                        'title',
                        'width',
                        'height',
                        'author_name',
                        'author_url',
                        'provider_name',
                        'provider_url',
                        'thumbnail_url',
                        'thumbnail_width',
                        'thumbnail_height'
                    ];
                    const oembed = _.pick(body, knownFields);
=======
            // see if the URL is a redirect to cater for shortened urls
            return request(url, {
                method: 'GET',
                timeout: 2 * 1000,
                followRedirect: true
            }).then((response) => {
                if (response.url !== url) {
                    ({url, provider} = findUrlWithProvider(response.url));
                    return provider ? knownProvider(url) : unknownProvider();
                }
>>>>>>> parent of 3218606... Add v3.13.0

                const oembedUrl = getOembedUrlFromHTML(response.body);

                if (!oembedUrl) {
                    return unknownProvider();
                }

                return request(oembedUrl, {
                    method: 'GET',
                    json: true
                }).then((response) => {
                    return response.body;
                });
            }).catch(() => {
                return unknownProvider();
            });
        }
    }
};
