const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const events = require('../models/events');

const eventRouter = express.Router();

eventRouter.use(bodyParser.json());

eventRouter.route('/')
.post((req, res, next) => {
    events.create(req.body)
    .then((event) => {
        console.log('event Created ', event);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /events');
});

eventRouter.route('/:eventId')
.get((req,res,next) => {
    events.findById(req.params.eventId)
    .then((event) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(event);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = eventRouter;