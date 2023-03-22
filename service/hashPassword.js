const bcrypt = require('bcrypt')
module.exports.hash = async (pw) => {
    return new Promise(async rs => {
        let salt, hash;
        salt = await bcrypt.genSalt(10);
        hash = await bcrypt.hash(pw, salt);
        return rs(hash);
    })
}