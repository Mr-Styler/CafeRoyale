const appError = require('../utils/appError');
const queryFunc = require('./../utils/docFactoryFunc');
const catchAsync = require('../utils/catchAsync');
const Branch = require('./../models/branch');

exports.getAllBranches = queryFunc.getAll(Branch);

exports.getBranch = queryFunc.getOne(Branch);

exports.createBranch = queryFunc.createNew(Branch);

exports.updateBranch = queryFunc.updateOne(Branch);

exports.deleteBranch = queryFunc.deleteOne(Branch);

exports.getBranchesWithin = catchAsync (async (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat,lng] = latlng.split(',');
    const radius = (unit === 'mi') ? distance/3963.2 : distance/6378.1;

    console.log(distance, latlng, unit, radius)
    
    if (!lat || !lng) {
        return next(new appError(`Please provide latitude and longitude in the format lat,lng.`, 400))
    }

    const branches = await Branch.find({ 
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    })

    res.status(200).json({
        status: 'success',
        result: branches.length,
        data: {
            documents: branches
        }
    })
})