import {User} from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(401).json({message: 'Incorrect email or password'});
        }
        const user = await User.findOne({email: email})
        if (!user) {
            return res.status(404).json({message: 'No user found  '});
        }
        const userPassword = user.password
        const isValidPassword = await bcrypt.compare(password, userPassword)

        if (!isValidPassword) {
            return res.status(401).json({message: 'Incorrect password'});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '15m'});

        // req.session.user = {
        //     id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     role: user.role
        // }

        res.status(200).json({token: token, name: user.name, userId: user._id});

    }

    catch (error) {
        next(error)
    }
}

export const logout = async (req, res, next) => {
    try {
        res.status(200).json({message: 'Logged out successfully'});
    }
    catch (error) {
        next(error)
    }
}