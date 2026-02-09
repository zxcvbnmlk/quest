const express = require('express')
const bcrypt = require('bcrypt')
const fs = require('fs');
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
const { writeFile } = require('fs/promises');
const { randomUUID } = require('crypto');
const path = require("path");
const multer = require("multer");
const uploadDir = '../UI/public/images/quests';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null,  file.originalname);
    }
  });

if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}
const upload = multer({ storage });
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

apiRoutes.delete('/deleteQuestion', authorizeAdmin, async (req, res) => {
    const {question_id} = req.body;
    console.log('question_id',question_id);
    try {
        await pool.query('DELETE FROM questions WHERE id = $1', [question_id]);
        res.status(200).jsonp(question_id);
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Server error');
    }
});

apiRoutes.post('/getQuestions', authorizeAdmin, async (req, res) => {
    const {quest_id} = req.body;

    try {
        const result = await pool.query(
            `SELECT * FROM questions WHERE quest_id IN ($1) ORDER BY sort_number`,
            [quest_id]
        );

        res.status(200).json(result.rows);
    } catch (err) {
        console.log('err',err);
        res.status(500).send('Server error');
    }
});
apiRoutes.put('/putQuest', authorizeAdmin, upload.single("image"), async (req, res) => {
    console.log('req.body',req.body);
    console.log('Uploaded file info:', req.file);
    console.log('Saved filename:', req.file.filename); 


    const quest = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        start: req.body.start,
        price: req.body.price,
        duration: req.body.duration,
        questions: req.body.questions,
        public: req.body.public === "true", // convert to boolean if needed
        image_url: req.file?.originalname ? req.file.originalname : req.body.image_url
    };

    try {
    
        if (quest.id) {
            await pool.query(
                'UPDATE quests SET name = $2, description = $3, image_url = $4, start = $5, price = $6, duration = $7, questions = $8, public = $9 WHERE id = $1',
                [quest.id, quest.name, quest.description, quest.image_url, quest.start, quest.price, quest.duration, quest.questions, quest.public]
            );
        } else {
            await pool.query(
                'INSERT INTO quests (name, description, image_url, start, price, duration, questions, public) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [quest.name, quest.description, quest.image_url, quest.start, quest.price, quest.duration, quest.questions, quest.public]
            );
        }

        res.status(200).send('Квест сохранен');
    } catch (error) {
        console.log('error',error)
        res.status(500).send('Database error');
    }
});
apiRoutes.put('/putQuestions', authorizeAdmin, async (req, res) => {
    const {questions} = req.body.questions;
    try {
    const promises = questions.map(async (question) => {
        const existingQuestion = await pool.query('SELECT id FROM questions WHERE id = $1', [question.id]);
        if (existingQuestion.rows.length > 0) {
          return pool.query(
            'UPDATE questions SET name = $2, description = $3, question = $4, buttons = $5, answer = $6, text_after_answer = $7, sort_number = $8, quest_id = $9 WHERE id = $1',
            [question.id, question.name, question.description, question.question, question.buttons, question.answer, question.text_after_answer, question.sort_number, question.quest_id]
          );
        } else {
          return pool.query(
            'INSERT INTO questions (name, description, question, buttons, answer, text_after_answer, sort_number, quest_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [question.name, question.description, question.question, question.buttons, question.answer, question.text_after_answer, question.sort_number, question.quest_id]
          );
        }
      });
      
      await Promise.all(promises);
      questions.sort((a, b) => a.sort_number - b.sort_number);
      res.status(200).jsonp(questions);
    } catch (error) {
        console.log('error',error);
        res.status(500).send('Database error');
    }
});


//     try {
//         for (const question of questions) {
//                 const existingQuestion = await pool.query(
//                     'SELECT id FROM questions WHERE id = $1',
//                     [question.id]
//                 );
//                 console.log('existingQuestion',existingQuestion.rows.length);
//                 if (existingQuestion.rows.length > 0) {
//                     await pool.query(
//                         'UPDATE questions  SET name = $2, description = $3, question = $4, buttons = $5, answer = $6 WHERE id = $1',
//                         [question.id, question.name, question.description, question.question, question.buttons, question.answer]
//                     );
//                 } else {
//                     console.log('question',question);
//                     await pool.query(
//                         'INSERT INTO questions (name, description, question, buttons, answer, text_after_answer) VALUES ($1, $2, $3, $4, $5, $6)',
//                         [question.name, question.description, question.question, question.buttons, question.answer, question.text_after_answer]
//                     );
//                 }
//         }
//         res.status(200).send('Вопросы сохранены');
//     } catch (error) {
//         res.status(500).send('Database error');
//     }
// });

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
