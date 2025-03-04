import {User} from '../models/user.model.js';

export const authCallback = async (req, res) => {
   try{
    const {id, firstName, lastName, imageUrl} = req.body;
    const user = await User.find({clerkId: id});

   if(!user){
    await user.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,

    });
   }
   res.status(200).json({message: 'User created successfully!', success: true});

}catch(error){
    console.log( "Error in autth callback" , error);
    res.status(500).json({message: error.message, success: false});


   }
}