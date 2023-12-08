const catchAsync = require('../utils/catchAsync');

exports.getLandingPage = catchAsync( async (req, res, next ) => {
    res.render('index', { pageTitle: 'Landing Page', currentUser: req.session.user });
});

exports.getLoginPage = catchAsync( async (req, res, next ) => {
    res.render('login', { pageTitle: 'Login', currentUser: req.session.user });
});

exports.getSignUpPage = catchAsync( async (req, res, next ) => {
    res.render('sign-up', { pageTitle: 'Sign Up', currentUser: req.session.user });
});

exports.getShopPage = catchAsync( async (req, res, next ) => {
    res.render('shop', { pageTitle: 'Shop', currentUser: req.session.user });
});

exports.getRecipePage = catchAsync( async (req, res, next ) => {
    res.render('recipes', { pageTitle: 'Top Chefs Recipes', currentUser: req.session.user });
});

exports.getRecipeShowPage = catchAsync( async (req, res, next) => {
    res.render('recipe', { pageTitle: 'Recipe', currentUser: req.session.user})
})

exports.getBlogsPage = catchAsync( async (req, res, next ) => {
    res.render('blogs', { pageTitle: 'Our Blogs', currentUser: req.session.user });
});

exports.getBlogShowPage = catchAsync( async (req, res, next ) => {
    res.render('blog', { pageTitle: 'Blog', currentUser: req.session.user });
});

exports.getProfilePage = catchAsync( async (req, res, next ) => {
    res.render('profile', { pageTitle: 'My Dashboard', currentUser: req.session.user });
});

exports.getTableBookingForm = catchAsync( async (req, res, next ) => {
    res.render('table-form', { pageTitle: 'Book a table', currentUser: req.session.user });
});

exports.getCartPage = catchAsync( async (req, res, next ) => {
    res.render('cart', { pageTitle: 'Book a table', currentUser: req.session.user });
});

exports.getOrdersPage = catchAsync( async (req, res, next ) => {
    res.render('orders', { pageTitle: 'Book a table', currentUser: req.session.user });
});
