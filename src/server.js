const express = require('express');
const morgan = require('morgan');
const logger = require('./config/httpLogger');
const helmet = require('helmet');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./db');
const services = require('../src/services');

const port = process.env.PORT || 8080;

const app = express();

const upload = multer();

app.use(helmet());
// app.use(morgan('combined', { stream: logger.stream.write }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// parsing multipart/form-data
app.use(upload.array());
app.use(logger);

db.load();

app.use('/api', require('./routes'));
app.get('/', (req, res) => {
    res.json('Hom Nay An Gi APIs');
});
app.get('*', (req, res) => {
    res.json('Hom Nay An Gi APIs');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
