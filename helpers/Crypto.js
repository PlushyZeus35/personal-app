const bcrypt = require('bcrypt');
const Crypto = {};

Crypto.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    console.log(hash)
    return hash;
}

Crypto.validatePassword = async (hashedPassword, password) => {
    return await bcrypt.compare(password,hashedPassword);
}

module.exports = Crypto;