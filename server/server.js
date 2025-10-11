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

// Helper function to get user ID from token
function getUserIdFromToken(req) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.id;
    } catch (error) {
        return null;
    }
}

// Custom middleware for authentication and posts enhancement
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

    // Handle like creation - prevent duplicates and update post like count
    if (req.method === 'POST' && req.url === '/api/likes') {
        const { postId, userId } = req.body;

        // Check if like already exists
        const dbData = JSON.parse(readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
        const existingLike = dbData.likes.find(like =>
            like.postId === postId && like.userId === userId
        );

        if (existingLike) {
            return res.status(409).json({
                error: 'User has already liked this post'
            });
        }
    }

    // Handle posts endpoint with like status
    if (req.method === 'GET' && req.url.startsWith('/api/posts')) {
        const userId = getUserIdFromToken(req);

        // Let json-server handle the query first
        const originalSend = res.send;
        res.send = function (data) {
            try {
                const posts = JSON.parse(data);

                if (Array.isArray(posts) && userId) {
                    // Read likes data
                    const dbData = JSON.parse(readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
                    const likes = dbData.likes || [];

                    // Add isLikedByUser field to each post
                    const postsWithLikeStatus = posts.map(post => ({
                        ...post,
                        isLikedByUser: likes.some(like =>
                            like.postId === post.id && like.userId === userId
                        )
                    }));

                    return originalSend.call(this, JSON.stringify(postsWithLikeStatus));
                } else if (!Array.isArray(posts) && posts.id && userId) {
                    // Single post
                    const dbData = JSON.parse(readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
                    const likes = dbData.likes || [];

                    const postWithLikeStatus = {
                        ...posts,
                        isLikedByUser: likes.some(like =>
                            like.postId === posts.id && like.userId === userId
                        )
                    };

                    return originalSend.call(this, JSON.stringify(postWithLikeStatus));
                }
            } catch (error) {
                console.error('Error processing posts:', error);
            }

            // Fallback to original response
            return originalSend.call(this, data);
        };
    }

    // Handle like creation - update post like count
    if (req.method === 'POST' && req.url === '/api/likes') {
        const originalSend = res.send;
        res.send = function (data) {
            try {
                const like = JSON.parse(data);
                if (like.postId) {
                    // Update the post's like count
                    const dbPath = path.join(__dirname, 'db.json');
                    const dbData = JSON.parse(readFileSync(dbPath, 'utf8'));

                    const post = dbData.posts.find(p => p.id === like.postId);
                    if (post) {
                        post.likes = (post.likes || 0) + 1;
                        require('fs').writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
                    }
                }
            } catch (error) {
                console.error('Error updating like count on create:', error);
            }
            return originalSend.call(this, data);
        };
    }

    // Handle like deletion - update post like count
    if (req.method === 'DELETE' && req.url.startsWith('/api/likes/')) {
        const likeId = parseInt(req.url.split('/').pop());

        // Get the like record before deletion to know which post to update
        const dbPath = path.join(__dirname, 'db.json');
        const dbData = JSON.parse(readFileSync(dbPath, 'utf8'));
        const like = dbData.likes.find(l => l.id === likeId);

        if (like) {
            const originalSend = res.send;
            res.send = function (data) {
                try {
                    // Update the post's like count
                    const updatedDbData = JSON.parse(readFileSync(dbPath, 'utf8'));
                    const post = updatedDbData.posts.find(p => p.id === like.postId);
                    if (post && post.likes > 0) {
                        post.likes = post.likes - 1;
                        require('fs').writeFileSync(dbPath, JSON.stringify(updatedDbData, null, 2));
                    }
                } catch (error) {
                    console.error('Error updating like count on delete:', error);
                }
                return originalSend.call(this, data);
            };
        }
    }

    // Handle get post likers endpoint
    if (req.method === 'GET' && req.url.match(/^\/api\/posts\/\d+\/likers$/)) {
        const postId = parseInt(req.url.split('/')[3]);

        try {
            const dbData = JSON.parse(readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
            const likes = dbData.likes || [];
            const users = dbData.users || [];

            // Find all likes for this post
            const postLikes = likes.filter(like => like.postId === postId);

            // Get user objects for each like (excluding password)
            const likers = postLikes.map(like => {
                const user = users.find(u => u.id === like.userId);
                if (user) {
                    const { password, ...userWithoutPassword } = user;
                    return userWithoutPassword;
                }
                return null;
            }).filter(user => user !== null);

            return res.json(likers);
        } catch (error) {
            console.error('Error fetching post likers:', error);
            return res.status(500).json({
                error: 'Failed to fetch users who liked this post'
            });
        }
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
