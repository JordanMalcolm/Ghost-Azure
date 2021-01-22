<<<<<<< HEAD:core/frontend/services/themes/handlebars/register.js
const Promise = require('bluebird');
const errors = require('@tryghost/errors');
const hbs = require('../engine');
const config = require('../../../../shared/config');
const logging = require('../../../../shared/logging');
=======
var hbs = require('../services/themes/engine'),
    Promise = require('bluebird'),
    config = require('../../server/config'),
    proxy = require('./proxy');
>>>>>>> parent of 3218606... Add v3.13.0:core/frontend/helpers/register.js

// Register an async handlebars helper for a given handlebars instance
function asyncHelperWrapper(hbsInstance, name, fn) {
    hbsInstance.registerAsyncHelper(name, function returnAsync(context, options, cb) {
        // Handle the case where we only get context and cb
        if (!cb) {
            cb = options;
            options = undefined;
        }

        // Wrap the function passed in with a when.resolve so it can return either a promise or a value
        Promise.resolve(fn.call(this, context, options)).then(function asyncHelperSuccess(result) {
            cb(result);
        }).catch(function asyncHelperError(err) {
<<<<<<< HEAD:core/frontend/services/themes/handlebars/register.js
            const wrappedErr = err instanceof errors.GhostError ? err : new errors.IncorrectUsageError({
                err: err,
                context: 'registerAsyncThemeHelper: ' + name,
                errorDetails: {
                    originalError: err
                }
            });

            const result = config.get('env') === 'development' ? wrappedErr : '';
=======
            var wrappedErr = err instanceof proxy.errors.GhostError ? err : new proxy.errors.IncorrectUsageError({
                    err: err,
                    context: 'registerAsyncThemeHelper: ' + name,
                    errorDetails: {
                        originalError: err
                    }
                }),
                result = config.get('env') === 'development' ? wrappedErr : '';
>>>>>>> parent of 3218606... Add v3.13.0:core/frontend/helpers/register.js

            proxy.logging.error(wrappedErr);

            cb(new hbsInstance.SafeString(result));
        });
    });
}

// Register a handlebars helper for themes
module.exports.registerThemeHelper = function registerThemeHelper(name, fn) {
    hbs.registerHelper(name, fn);
};

// Register an async handlebars helper for themes
module.exports.registerAsyncThemeHelper = function registerAsyncThemeHelper(name, fn) {
    asyncHelperWrapper(hbs, name, fn);
};
