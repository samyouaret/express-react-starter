const VerifyEmailRepository = require('../../repositories/VerifyEmailRepository');
const VerifyEmailRepo = new VerifyEmailRepository();

module.exports = function verifyEmail(successCallback = null, errorCallback = null) {
    return async function (req, res, next) {
        let {
            token,
            signature
        } = req.query;
        try {
            let message = await VerifyEmailRepo.verifyToken(token, signature);
            if (successCallback) {
                successCallback(req, res, message);
            }
        } catch (error) {
            if (errorCallback) {
                errorCallback(req, res, error);
            }
        }
    }
}