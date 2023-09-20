require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOptions = require('./middlewares/corsOptions');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
// подключение к БД
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
app.use(requestLogger);

app.use(router);

// логирование ошибок
app.use(errorLogger);

// обработка ошибок валидации данных мидлваре validate
app.use(errors());

// централизованная обработка остальных ошибок
app.use(errorHandler);

app.listen(3000);
