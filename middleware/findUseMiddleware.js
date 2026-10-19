const User = require('../model/users'); // adjust path to your model
const asyncWrapper = require('../utills/asyncWrapper');

const findUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `No user found with id ${id}`
        });
    }

    // Attach the found user to the request object!
    // req.user=user
next()
    // Let the controller handle the rest
});

module.exports=findUser