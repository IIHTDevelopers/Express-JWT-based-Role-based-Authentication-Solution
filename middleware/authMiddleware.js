const jwt = require('jsonwebtoken');

const jwtSecret = 'your_jwt_secret_key';

module.exports = (requiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token is missing or malformed' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.user = decoded;

            // Role-based access control: Check if the user has the required role
            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
};
