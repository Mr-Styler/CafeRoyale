const router = require('express').Router();
const authController = require('./../controllers/auth')
const branchController = require('./../controllers/branch')

router.route('/').get(branchController.getAllBranches)
router.route('/:id').get(branchController.getBranch)
router.get('/branches-within/:distance/center/:latlng/unit/:unit', branchController.getBranchesWithin)

router.use(authController.isAuth, authController.restrictTo(['admin']))

router.post('/', branchController.createBranch);
router.route('/:id').patch(branchController.updateBranch).delete(branchController.deleteBranch);


// 4.814256129618026,7.013664881459675

module.exports = router;