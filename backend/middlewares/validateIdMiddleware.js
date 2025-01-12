import {isValidObjectId} from "../utils/utils.js";

export const validateId  = (param)=>[
    (req, res, next) => {
        const id = req.params[param];
        if (!isValidObjectId(id)){
            return res.status(400).json({
                status: 400,
                message: 'Invalid id format',
                details: 'Provided ID: ${id} is not a valid MongoDB ObjectId'
            })
        }
       next()

    }
]