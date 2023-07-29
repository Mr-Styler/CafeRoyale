const express = require('express');
const app = express();
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

const store = new MongoDBSession({
    uri: process.env.DB_URI,
    collection: 'sessions'
});

// Route declaration
const userRoute = require('./routes/user');
const mealRoute = require('./routes/meal');
const recipeRoute = require('./routes/recipe');
const blogRoute = require('./routes/blog');
const bookingRoute = require('./routes/booking');
const eventRoute = require('./routes/events');
const orderRoute = require('./routes/booking');
const appError = require('./utils/appError');
const errorController = require('./controllers/error');

app.use(express.json());
app.use(session({
    secret: 'CafeRoyale',
    resave: false,
    saveUninitialized: false,
    store
}));

app.use('/api/users', userRoute);
app.use('/api/meals', mealRoute);
app.use('/api/recipes', recipeRoute);
app.use('/api/blogs', blogRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/events', eventRoute);

app.all('*', (req, res, next) => {
    return next(new appError(`Can't find ${req.originalUrl} route on this server.`));
})

app.use(errorController)

module.exports = app;