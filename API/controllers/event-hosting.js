const queryFunc = require('./../utils/docFactoryFunc')
const Event = require('../models/event');

exports.getAllEvents = queryFunc.getAll(Event);

exports.getEvent = queryFunc.getOne(Event);

exports.createEvent = queryFunc.createNew(Event);

exports.updateEvent = queryFunc.updateOne(Event);

exports.deleteEvent = queryFunc.deleteOne(Event);