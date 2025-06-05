const express = require('express')
const bcrypt = require('bcrypt')
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const index = http.Server(app);
const pool = require('./db');
const saltRounds = 11;
const jwt = require('jsonwebtoken');
let apiRoutes = express.Router();
const port = process.env.PORT || 3000;
const SECRET_KEY = 'eyJpZCI6IjIwM2YzZWVmLWF';

apiRoutes.use((req, res, next) => { //allow cross-origin requests
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Content-Type", "text/html; charset=utf-8");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

function verifyToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
}
async function verifyAdmin(req, res, next) {
    const id = req.user.id;
    const existingUser = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    if (existingUser.rows.length > 0 && existingUser.rows[0].role !== 'admin') {
        return res.sendStatus(401);
    }
    next();
}

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/api', apiRoutes);



// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

apiRoutes.get('/users', verifyToken, verifyAdmin , async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users'); // таблица users
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
apiRoutes.get('/quests', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM quests'); // таблица users
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

apiRoutes.post('/addUser', async (req, res) => {
    const {login, username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {

        const existingUser = await pool.query(
            'SELECT * FROM users WHERE login = $1',
            [login]
        );
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Email уже существует' });
        }

        await pool.query(
            'INSERT INTO users (login, username, password) VALUES ($1, $2, $3)',
            [login, username, hashedPassword]
        );
        res.status(200).send('Пользователь зарегистрирован');
    } catch (error) {
        res.status(500).send('Database error');
    }


})
apiRoutes.post('/auth', async (req, res) => {
    const {login, password} = req.body;
    try {
        const userResult = await pool.query(
            'SELECT * FROM users WHERE login = $1',
            [login]
        );
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Неверный логин или пароль1' });
        }
        const user = userResult.rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // const hashedPassword = await bcrypt.hash(password, saltRounds);
            // await pool.query(
            //     'UPDATE users SET password = $1 WHERE id = $2',
            //     [hashedPassword, user.id]
            // );
            return res.status(401).json({ message: 'Неверный логин или пароль2' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                login: user.login,
                username: user.username,
            },
            SECRET_KEY,
            { expiresIn: '30d' } // токен истекает через 30 дней
        );

        res.status(200).send({
            id: user.id,
            username: user.username,
            login: user.login,
            quests: user.quests,
            role: user.role,
            token: token
        });
    } catch (error) {
        res.status(500).send('Database error');
    }


})

index.listen(port, () => {
    console.log(`started on port: ${port}`);
});


