module.exports = {
    // @TODO: expose files/units and not functions of units
    get createSession() {
        return require('./middleware').createSession;
    },

    get destroySession() {
        return require('./middleware').destroySession;
    },

<<<<<<< HEAD
const models = require('../../../models');
const urlUtils = require('../../../../shared/url-utils');
const url = require('url');

function getOriginOfRequest(req) {
    const origin = req.get('origin');
    const referrer = req.get('referrer') || urlUtils.getAdminUrl() || urlUtils.getSiteUrl();

    if (!origin && !referrer || origin === 'null') {
        return null;
    }

    if (origin) {
        return origin;
    }

    const {protocol, host} = url.parse(referrer);
    if (protocol && host) {
        return `${protocol}//${host}`;
    }
    return null;
}

const sessionService = createSessionService({
    getOriginOfRequest,
    getSession: expressSession.getSession,
    findUserById({id}) {
        return models.User.findOne({id});
    }
});

module.exports = createSessionMiddleware({sessionService});

const ssoAdapter = adapterManager.getAdapter('sso');
// Looks funky but this is a "custom" piece of middleware
module.exports.createSessionFromToken = sessionFromToken({
    callNextWithError: false,
    createSession: sessionService.createSessionForUser,
    findUserByLookup: ssoAdapter.getUserForIdentity.bind(ssoAdapter),
    getLookupFromToken: ssoAdapter.getIdentityFromCredentials.bind(ssoAdapter),
    getTokenFromRequest: ssoAdapter.getRequestCredentials.bind(ssoAdapter)
});
=======
    get authenticate() {
        return require('./middleware').authenticate;
    }
};
>>>>>>> parent of 3218606... Add v3.13.0
