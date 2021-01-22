const cloneDeep = require('lodash/cloneDeep');
<<<<<<< HEAD:core/server/web/api/middleware/normalize-image.js
const config = require('../../../../shared/config');
const logging = require('../../../../shared/logging');
=======
const path = require('path');
const config = require('../../../../config');
const {logging} = require('../../../../lib/common');
>>>>>>> parent of 3218606... Add v3.13.0:core/server/web/shared/middlewares/image/normalize.js
const imageTransform = require('@tryghost/image-transform');

module.exports = function normalize(req, res, next) {
    const imageOptimizationOptions = config.get('imageOptimization');

    // CASE: image transform is not capable of transforming file (e.g. .gif)
    if (!imageTransform.canTransformFileExtension(req.file.ext) || !imageOptimizationOptions.resize) {
        return next();
    }

    const out = `${req.file.path}_processed`;
    const originalPath = req.file.path;

    const options = Object.assign({
        in: originalPath,
        out,
        ext: req.file.ext,
        width: config.get('imageOptimization:defaultMaxWidth')
    }, imageOptimizationOptions);

    imageTransform.resizeFromPath(options)
        .then(() => {
            req.files = [];

            // CASE: push the processed/optimised image
            req.files.push(Object.assign(req.file, {path: out}));

            // CASE: push original image, we keep a copy of it
            const parsedFileName = path.parse(req.file.name);
            const newName = `${parsedFileName.name}_o${parsedFileName.ext}`;
            req.files.push(Object.assign(cloneDeep(req.file), {path: originalPath, name: newName}));

            next();
        })
        .catch((err) => {
            err.context = `${req.file.name} / ${req.file.type}`;
            logging.error(err);
            next();
        });
};
