const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = 'mysecret'


const userController = {
    // create users//
    createUser: async (req, res) =>{
        const userData = req.body;
        try {
            const newUser = new User(userData)
            const savedUser = await newUser.save()
            res.status(201).json(savedUser);
            
        } catch (error) {
            console.error('Error creating user', error);
            res.status(500).json({message: 'internal server error'})
            
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
            res.json(userUpdate)
            
        } catch (error) {
            console.error('error updating user', error);
            res.status(500).json({message: 'internal server error'})
            
        }},
        // delete user //

        deleteUser: async (req, res) => {
            try {
                const {userName} = req.params;
                const deleteUser = await User.findOneAndDelete({userName: userName})
                res.json(deleteUser)
                
            } catch (error) {
                console.error('Error deleting user');
                res.status(500).json({message: 'Internal server error'})
                
            }
        },

        register: async (req, res) => {
            try {
                const users = await User.find();
                const {userName, email, password} = req.body;

                const userData = {
                    userName: userName,
                    email: email,
                    password: await bcrypt.hash(password, 10),
                    userid: users.length + 1
                }

                const newUser = new User(userData)
                const savedUser = await newUser.save()
                res.status(201).json(savedUser);
                
            } catch (error) {
                console.error('Error al registar el usuarios:', error);
                res.status(500).json({message: 'internal server error'})
                
            }
        },

        login: async (req, res) => {
            try {
                const {email, password} = req.body;
                const user = await User.find({email: email});
                if (!user) {
                    return res.status(400).json({message: "Invalid username or password"});
                }

                const isPasswordValid = await bcrypt.compare(password, user[0].password);
                if (!isPasswordValid) {
                    return res.status(400).json({message: "Invalid username or password"});
                }

                const token = jwt.sign({userid: user.id}, jwt_secret,{
                    expiresIn: "1h"
                });

                res.json({message: "Logged in successfully", token})


            } catch (error) {
                console.error('Error al loguear el usuario:', error);
                res.status(500).json({message: 'Internal server error'});
                
            }
        }
};


module.exports = userController;