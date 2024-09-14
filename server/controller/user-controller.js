

import User from '../model/user.js';

export const signupUser = async (request, response) => {
    try {
        const user = request.body;

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({msg: 'signup successful'});
    } catch(error) {
        return response.status(500).json({msg: 'Error while signing up the user'});
    }
}

export const loginUser = async (request, response) => {
    try {
        let user = await User.findOne({ username: request.body.username });
        if(user) {
            if(request.body.password !== user.password){
                return response.status(400).json({msg: 'Incorrect password'});
            } else {
                return response.status(200).json({user: user.name, username: user.username});
            }
        } else {
            return response.status(400).json({msg: 'No account exists with this username'});
        }
    } catch(error) {
        return response.status(500).json({msg: 'Error occured while logging in the user'});
    }
}