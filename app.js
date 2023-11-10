require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOptions = require('./middlewares/corsOptions');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { DATABASE } = require('./utils/utils');

const { PORT = 3000, NODE_ENV, DATABASE_PROD } = process.env;

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
// подключение к БД

mongoose.connect((NODE_ENV === 'production') ? DATABASE_PROD : DATABASE);
app.use(requestLogger);
console.log('Выполнение app');
app.use(router);

// логирование ошибок
app.use(errorLogger);

// обработка ошибок валидации данных мидлваре validate
app.use(errors());

// централизованная обработка остальных ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
