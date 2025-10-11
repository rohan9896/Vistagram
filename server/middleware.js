import { jwt } from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // Change this to a secure secret

// Middleware to handle login
const handleLogin = (req, res, next) => {
    if (req.method === 'POST' && req.url === '/api/auth/login') {
        const { email, password } = req.body;

        // Find user in database
        const users = require('./db.json').users;
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Generate JWT token
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    username: user.username
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Remove password from response
            const { password: _, ...userWithoutPassword } = user;

            res.json({
                success: true,
                token,
                user: userWithoutPassword
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
    } else {
        next();
    }
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    if (req.url === '/api/auth/me') {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access token required'
            });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
    } else {
        next();
    }
};

// Middleware to handle /me endpoint
const handleMe = (req, res, next) => {
    if (req.method === 'GET' && req.url === '/api/auth/me') {
        const users = require('./db.json').users;
        const user = users.find(u => u.id === req.user.id);

        if (user) {
            const { password: _, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } else {
        next();
    }
};

// Middleware to handle logout
const handleLogout = (req, res, next) => {
    if (req.method === 'POST' && req.url === '/api/auth/logout') {
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } else {
        next();
    }
};

module.exports = [handleLogin, verifyToken, handleMe, handleLogout];