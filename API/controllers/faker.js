const User = require('./../models/user');
const Review = require('./../models/review');
const Blog = require('./../models/blog');
const Meal = require('./../models/meal');
const Recipe = require('./../models/recipe');
const { faker } = require('@faker-js/faker')
const catchAsync = require('../utils/catchAsync');


exports.createDummyUser = catchAsync(async (req, res, next) => {
    const user = await User.create({
        name: faker.person.fullName(),
        password: 'test1234',
        email: faker.internet.email(),
    })

    res.status(201).json({
        status: 'success',
        data: {
            document: user
        }
    })
});

exports.createDummyBlog = catchAsync(async (req, res, next) => {
    const blog = await Blog.create({
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs({min: 4, max: 10}),
        author: '648f5305a4602d6e20d51640'
    })

    res.status(201).json({
        status: 'success',
        data: {
            document: blog
        }
    })
});

exports.createDummyReview = catchAsync(async (req, res, next) => {
    let articleType = ['Blog', 'Recipe']
    const review = await Review.create({
        review: faker.lorem.sentence(),
        rating: faker.number.float({precision: 0.1, min: 1, max: 5}),
        userId: '648f52c3a4602d6e20d5163e',
        article: '64f2524b47bdb1a7b3b4af7a',
        articleType: articleType[1]
    })
    
    res.status(201).json({
        status: 'success',
        data: {
            document: review
        }
    })
});

exports.createDummyRecipe = catchAsync(async (req, res, next) => {
    const recipe = await Recipe.create({
        title: faker.lorem.sentence(),
        avgRating: faker.number.float({precision: 0.1, min: 1, max: 5}),
        description: faker.lorem.sentences({min: 3, max: 7}),
        author: '64965559d6718cfa537f64c2',
        steps: [
            {
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraphs({min: 4, max: 10}),
            },
            {
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraphs({min: 4, max: 10}),
            },
            {
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraphs({min: 4, max: 10}),
            },
            {
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraphs({min: 4, max: 10}),
            }
        ]
    })

    res.status(201).json({
        status: 'success',
        data: {
            document: recipe
        }
    })
});

exports.createDummyMeal = catchAsync(async (req, res, next) => {
    const meal = await Meal.create({
        name: faker.word.words({min: 2, max: 3}),
        price: faker.number.int({min: 250, max: 50000})
    })
    
    res.status(201).json({
        status: 'success',
        data: {
            document: meal
        }
    })
});