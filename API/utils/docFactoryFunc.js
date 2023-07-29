const catchAsync = require('./catchAsync');

// if(req.params.recipeId) req.body.article = {articleType: 'Recipe', id: req.params.recipeId}
//         if(req.params.blogId) req.body.article = {articleType: 'Blog', id: req.params.blogId}
//         if(req.params.bookerId) req.body.booker = req.params.bookerId;

//         console.log(req.params);

exports.getAll = Model => catchAsync(async (req, res, next) => {
        const docs = await Model.find(req.body).select('-updatedAt');

        res.status(200).json({
            status: 'success',
            results: docs.length,
            data: {
                documents: docs
            }
        })
    })

exports.getOne = Model => catchAsync( async (req, res, next) => {
        const doc = await Model.findById(req.params.id).select('-updatedAt');

        if(!doc) return next(new appError(`No document found with that ID,`, 404))
        
        res.status(200).json({
            status: 'success',
            data: {
                document: doc
            }
        })
    })
    
    exports.createNew = Model =>  catchAsync( async (req, res, next) => {
        const newDoc = await Model.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                document: newDoc
            }
        })
    })

    exports.updateOne = Model => catchAsync(async (req, res, next) => {
        console.log(req.params.recipeId, req.params.blogId);
        if(req.params.recipeId) req.body.article = {articleType: 'Recipe', id: req.params.recipeId}
        if(req.params.blogId) req.body.article = {articleType: 'Blog', id: req.params.blogId}
        
        console.log(req.body);
        const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).select('-updatedAt')
        
        if(!updatedDoc) return next(new appError(`No document found with that ID,`, 404))
        
        res.status(200).json({
            status: 'success',
            data: {
                document: updatedDoc
            }
        });
    });
    
    exports.deleteOne = Model => catchAsync( async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id)
        
        if(!doc) return next(new appError(`No document found with that ID,`, 404))

        res.status(204).json({
            status: 'success',
            message: 'Successfully deleted document'
        })
    })

