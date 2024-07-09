import User from "../models/user.models.js"
import { errorHamdlerler } from "../Utils/error.js"
import bcryptjs from "bcryptjs"
export const test = (req, res) => {
    res.json({
        message: "Congralutions your api is working"
    })
}

//update user
export const updateuser = async (req, res, next) => {
    if (req.user.id != req.params.id) next(errorHamdlerler(401, "You dont have permission for this"))
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 12);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: {
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            profilepicture:req.body.profilepicture
        }
        },
        {new:true}

    );
    const {password,...rest}=updatedUser._doc;
    res.status(200).json(rest)

    } catch (error) {

    }
}