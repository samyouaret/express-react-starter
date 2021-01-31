const crypto = require('crypto');

function email() {
    let prefix = crypto.randomBytes(10).toString('base64').replace(/[\W_]+/g, '');
    let domain = crypto.randomBytes(6).toString('base64').replace(/[\W_]+/g, '');
    return `${prefix}@${domain}.info`;
}
module.exports = {
    email
}