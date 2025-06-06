const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function authorizeAdmin(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Нет токена' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Доступ запрещён: только для админов' });
        }

        // Добавим пользователя в запрос (если нужно дальше)
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Неверный токен' });
    }
}

module.exports = {
    authorizeAdmin
};
