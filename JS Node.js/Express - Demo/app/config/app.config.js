/* globals __dirname */

const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const configApp = (app) => {
    app.set('view engine', 'pug');

    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.use((req, res, done) => {
        const start = new Date();

        req.on('end', () => {
            const end = new Date();
            console.log(`-----Execution time: ${end - start}`);
        });

        done();
    });

    app.use('/libs',
        express.static(path.join(__dirname, '../../node_modules'))
    );

    app.use('/static',
        express.static(path.join(__dirname, '../../static'))
    );
};

module.exports = configApp;
