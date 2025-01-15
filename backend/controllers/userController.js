
import {User} from "../models/User.js";
import {createError} from "../utils/utils.js";

export const register = async (req, res, next) => {

    try {
        const {name, second_name, email, password} = req.body;
        if (!name || !second_name || !email  || !password) {
            return res.status(400).send({error: 'Please enter fill required fields'});
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send({error: `User with email ${email} already exists`});
        }


        const newUser = new User(
            {
                name,
                second_name,
                email,
                password
            }
        )

       await newUser.save()
        return res.status(200).send({message: 'User saved successfully'})
    }
    catch (error) {
        createError(500, error.stack)
        next(error);
    }


}