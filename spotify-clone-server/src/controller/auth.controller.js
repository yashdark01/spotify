import {User} from '../models/user.model.js';

export const authCallback = async (req, res) => {
   try {
    const {id, firstName, lastName, imageUrl} = req.body;
    const user = await User.findOne({clerkId: id});
    // console.log("Auth callback", req.body);
    // console.log("User", user);

    if(!user){
        try {
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl,
            });
            // console.log("Auth callback two", req.body);
            res.status(200).json({message: 'User created successfully!', success: true});
        } catch(error) {
            console.log("Error in creating user", error);
            return res.status(500).json({message: error.message, success: false});
        }
    } else {
        res.status(200).json({message: 'User already exists', success: true});
    }
    // console.log("Auth callback three", req.body);
   } catch(error) {
    // console.log("Error in auth callback", error);
    res.status(500).json({message: error.message, success: false});
   }
}

export const getUser = (req, res) => {
    res.status(201).json({user:"valid"});
}
