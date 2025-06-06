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
const { SECRET_KEY } = require('./config');
const {authorizeAdmin, verifyToken} = require("./helpers/middleware");

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
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/api', apiRoutes);



// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

apiRoutes.get('/users', authorizeAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users'); // таблица users
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
apiRoutes.get('/getQuests', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM quests'); // таблица users
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

apiRoutes.post('/getQuestions', authorizeAdmin, async (req, res) => {
    const {questions} = req.body;
    console.log('questions',questions);
    try {
        const result = await pool.query(
            `SELECT q.*
               FROM unnest($1::int[]) WITH ORDINALITY AS ids(id, ord)
               JOIN questions q ON q.id = ids.id
               ORDER BY ids.ord`,
            [questions]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Server error');
    }
});
apiRoutes.put('/putQuest', authorizeAdmin, async (req, res) => {
    const {quest} = req.body;
    try {
        quest.questions = JSON.stringify(quest.questions);
        if (quest.id.length > 0) {
            await pool.query(
                'UPDATE quests SET name = $2, description = $3, image = $4, start = $5, price = $6, duration = $7, questions = $8 WHERE id = $1',
                [quest.id, quest.name, quest.description, quest.image, quest.start, quest.price, quest.duration, quest.questions]
            );
        } else {
            await pool.query(
                'INSERT INTO quests (name, description, image, start, price, duration, questions) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [quest.name, quest.description, quest.image, quest.start, quest.price, quest.duration, quest.questions]
            );
        }

        res.status(200).send('Вопросы сохранены');
    } catch (error) {
        console.log('error',error)
        res.status(500).send('Database error');
    }
});
apiRoutes.put('/putQuestions', authorizeAdmin, async (req, res) => {
    const {questions} = req.body.questions;
    try {
        for (const question of questions) {
                const existingUser = await pool.query(
                    'SELECT id FROM questions WHERE id = $1',
                    [question.id]
                );
                if (existingUser.rows.length > 0) {
                    await pool.query(
                        'UPDATE questions  SET name = $2, description = $3, question = $4, buttons = $5, answer = $6 WHERE id = $1',
                        [question.id, question.name, question.description, question.question, question.buttons, question.answer]
                    );
                } else {
                    await pool.query(
                        'INSERT INTO questions (name, description, question, buttons, answer) VALUES ($1, $2, $3, $4, $5)',
                        [question.name, question.description, question.question, question.buttons, question.answer]
                    );
                }
        }
        res.status(200).send('Вопросы сохранены');
    } catch (error) {
        res.status(500).send('Database error');
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
            return res.status(401).json({ message: 'Неверный логин или пароль2' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                login: user.login,
                username: user.username,
                role: user.role
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


// const hashedPassword = await bcrypt.hash(password, saltRounds);
// await pool.query(
//     'UPDATE users SET password = $1 WHERE id = $2',
//     [hashedPassword, user.id]
// );
