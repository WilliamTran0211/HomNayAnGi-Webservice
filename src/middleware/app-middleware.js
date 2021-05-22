const morgan = require('morgan');
// const bodyParser = require('body-parser');
const cors = require('cors');
const override = require('method-override');
const express = require('express');
// setup global middleware here

module.exports = (app) => {
    app.use(cors());
    app.use(override());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
};
