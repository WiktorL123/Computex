
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

export const updateUserAddress = async (req, res) => {
    try {
        const { id, addressId } = req.params;
        const { street, city, country, zip_code } = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid or missing user ID' });
        }

        if (!addressId || !mongoose.Types.ObjectId.isValid(addressId)) {
            return res.status(400).json({ error: 'Invalid or missing address ID' });
        }

        const updateFields = {};
        if (street) updateFields['addresses.$.street'] = street;
        if (city) updateFields['addresses.$.city'] = city;
        if (country) updateFields['addresses.$.country'] = country;
        if (zip_code) updateFields['addresses.$.zip_code'] = zip_code;

        const result = await User.updateOne(
            { _id: id, 'addresses._id': addressId },
            { $set: updateFields }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Address not found or not updated' });
        }

        res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteUserAddress = async (req, res, next) => {
    try {
        const {id, addressId} = req.params;
        if (!id || !isValidObjectId(id)) {
            return res.status(400).json({message: 'id no provided or invalid'})
        }

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({message: 'No user found'})
        }

        const address = user.addresses.id(addressId);
        if (!address) {
            return res.status(404).json({message: 'No user address found'})
        }
        user.addresses.pull(addressId)
        await user.save()
        res.status(200).json({ message: 'User deleted successfully', address });

    }
    catch (error) {
        next(createError(500, error.stack))
    }
}

export const addUserAddress = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || !isValidObjectId(id)) {
            return res.status(400).json({ message: "id no provided or invalid" });
        }

        const { street, city, country, zip_code } = req.body;

        if (!street || !city || !country || !zip_code) {
            return res.status(400).json({ message: "missing fields" });
        }

        const address = { street, city, country, zip_code };

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $push: { addresses: address } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(201).send({ message: "User address added", address });
    } catch (error) {
        next(createError(500, error.stack));
    }
};

