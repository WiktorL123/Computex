
import {User} from "../models/User.js";
import {createError} from "../utils/utils.js";
import mongoose, {isValidObjectId} from "mongoose";

export const register = async (req, res, next) => {

    try {
        const {name, second_name, email, password, addresses} = req.body;
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
                password,
                addresses,
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

export const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.params.id;

        if (!userId || !isValidObjectId(userId)) {
            return res.status(400).json({message: 'id no provided or invalid'})
        }
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({message: 'No user found'})
        }
        return res.status(200).send({
            message: 'User profile:',
            firstName: user.name,
            lastName: user.second_name,
            email: user.email

        })
    }
    catch (error) {
        createError(500, error.stack)
        next(error);
    }


}
export const getUserAddresses = async (req, res, next) => {
    try {
        const userId = req.params.id;
        if (!userId || !isValidObjectId(userId)) {
            return res.status(400).json({message: 'id no provided or invalid'})
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({message: 'No user found'})
        }
        const userAddresses = user.addresses;

        console.log(userAddresses);
        console.log(user.addresses)
        if (!userAddresses || userAddresses.length === 0) {
            return res.status(404).json({message: 'No user address found'})
        }

        return res.status(200).send({
            message: 'User address:',
            addresses: userAddresses
        })
    }
    catch (error) {
        createError(500, error.stack)
        next(error);
    }
}
export const updateUserProfile = async (req, res, next) => {
    try {

        const userId = req.params.id;

        const {name, second_name, email} = req.body;

        if (!userId || !isValidObjectId(userId)) {
            return res.status(400).json({message: 'id no provided or invalid'})
        }
        const user = await User.findByIdAndUpdate(userId, {name, second_name, email })

        if (!user) {
            return res.status(404).json({message: 'No user found'})
        }

        return res.status(200).send({message: 'User updated successfully'})
    }
    catch (error) {
        createError(500, error.stack)
        next(error);
    }


}

export const updateUserAddress = async (req, res, next) => {
    try {
        const { id, addressIndex } = req.params;
        const { street, city, country, zip_code } = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "User ID not provided or invalid" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.addresses || user.addresses.length <= addressIndex || addressIndex < 0) {
            return res.status(404).json({ message: "Address not found" });
        }

        const address = user.addresses[addressIndex];

        if (street) address.street = street;
        if (city) address.city = city;
        if (country) address.country = country;
        if (zip_code) address.zip_code = zip_code;

        await user.save();

        res.status(200).json({
            message: "User's address updated successfully",
            addresses: user.addresses,
        });
    } catch (error) {
        next(createError(500, error.message || "Failed to update address"));
    }
};

