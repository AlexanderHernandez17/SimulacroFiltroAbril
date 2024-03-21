const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = 'mysecret'


const userController = {
    // create users//
    createUser: (req, res) =>{
        const userData = req.body;
        try {
            const newUser = new User(userData)
            const savedUser = newUser.save()
            
        } catch (error) {
            console.error('Error creating user', error);
            res.status(501).json({message: 'internal server error'})
            
        }
    },
    // get all users //
    getAllUsers: async (req, res) => {
       try {
        const users = await User.find()
        res.json(users)
        
       } catch (error) {
        console.error('Error getting users', error);
        res.status(500).json({message: 'internal server error'})
       }
    },
    //get user by id //
    getUserById: async (req, res) => {
        const id = req.params.id
        try {
            const userId = await User.findById(id)
            res.json(userId)
        } catch (error) {
            console.error('Error getting user by id');
            res.status(500).json({message: 'internal server error'})
            
        }
    },
    // update user //

    updateUser: async (req, res) => {
        try {
            const {userName} = req.params
            const newUserName = req.body
            const userUpdate = await User.findOneAndUpdate({userName}, newUserName,{new: true})
            
        } catch (error) {
            console.error('error updating user', error);
            res.status(500).json({message: 'internal server error'})
            
        }},
        // delete user //






}