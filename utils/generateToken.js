const jwt = require('jsonwebtoken');

const jwtSecret = 'your_jwt_secret_key';

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role // Include role in the token payload
    };

    return jwt.sign(payload, jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour
};

module.exports = generateToken;
