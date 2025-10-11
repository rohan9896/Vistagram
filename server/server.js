const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const JWT_SECRET = 'your-secret-key'; // Change this to a secure secret

// Use default middlewares
server.use(middlewares);

// Body parsing middleware
server.use(jsonServer.bodyParser);

// Custom middleware for authentication
server.use((req, res, next) => {
    // Handle login
    if (req.method === 'POST' && req.url === '/api/auth/login') {
        const { email, password } = req.body;

        // Find user in database
        const dbData = JSON.parse(readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
        const users = dbData.users;
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

            return res.json({
                success: true,
                token,
                user: userWithoutPassword
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
    }

    // Handle /me endpoint
    if (req.method === 'GET' && req.url === '/api/auth/me') {
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
            const dbData = JSON.parse(readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
            const users = dbData.users;
            const user = users.find(u => u.id === decoded.id);

            if (user) {
                const { password: _, ...userWithoutPassword } = user;
                return res.json(userWithoutPassword);
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
    }

    // Handle logout
    if (req.method === 'POST' && req.url === '/api/auth/logout') {
        return res.json({
            success: true,
            message: 'Logged out successfully'
        });
    }

    next();
});

// Use router for other endpoints
server.use('/api', router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
