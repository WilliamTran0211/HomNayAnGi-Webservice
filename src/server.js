const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello, Hôm Nay Ăn Gì!'
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
