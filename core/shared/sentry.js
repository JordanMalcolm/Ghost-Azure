const config = require('./config');
const sentryConfig = config.get('sentry');
const errors = require('@tryghost/errors');

if (sentryConfig && !sentryConfig.disabled) {
    const Sentry = require('@sentry/node');
<<<<<<< HEAD:core/shared/sentry.js
    const version = require('../server/lib/ghost-version').full;
    const environment = config.get('env');
=======
    const version = require('../../package.json').version;
>>>>>>> parent of 3218606... Add v3.13.0:core/server/sentry.js
    Sentry.init({
        dsn: sentryConfig.dsn,
        release: 'ghost@' + version,
        environment: environment
    });

    module.exports = {
        requestHandler: Sentry.Handlers.requestHandler(),
        errorHandler: Sentry.Handlers.errorHandler({
            shouldHandleError(error) {
                // Sometimes non-Ghost issues will come into here but they won't
                // have a statusCode so we should always handle them
                if (!errors.utils.isIgnitionError(error)) {
                    return true;
                }

                // Only handle 500 errors for now
                // This is because the only other 5XX error should be 503, which are deliberate maintenance/boot errors
                return (error.statusCode === 500);
            }
        }),
        captureException: Sentry.captureException
    };
} else {
    const expressNoop = function (req, res, next) {
        next();
    };

    module.exports = {
        requestHandler: expressNoop,
        errorHandler: expressNoop,
        captureException: () => {}
    };
}
