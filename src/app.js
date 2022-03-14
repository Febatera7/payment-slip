const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./app/routes');

class App {
    constructor() {
        this.server = express();

        this.server.use(cors());
        this.middlewares();
        this.routes();
    };

    middlewares() {
        this.server.use(express.json());
        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(bodyParser.json());
    };

    routes() {
        this.server.use(routes);
    };
};

module.exports = new App().server;
