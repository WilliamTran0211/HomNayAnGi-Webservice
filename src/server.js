const express = require('express');
const morgan = require('morgan');
const logger = require('./config/httpLogger');
const helmet = require('helmet');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

app.use(helmet());
// app.use(morgan('combined', { stream: logger.stream.write }));
app.use(cors());
app.use(express.json());
app.use(logger);

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
