const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const registerFunc = async (req,res) => {
    const { username, password, role} = req.body
    try {
        
        const existUser = await User.findOne({username})
        if(existUser)
        return res.status(409).json('Username already exists')

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({username,password:hashedPassword,role})
        await newUser.save()

        res.status(200).json("New User added")

    } catch (err) {
        console.log(err);
        
        res.status(500).json(err)
    }
}

const loginFunc = async(req,res) =>{
    const { username,password,role } = req.body
    try {
        
        const user = await User.findOne({username})
        if(!user)
        return res.status(409).json("Username is wrong")

        const isPasswordTrue = await bcrypt.compare(password,user.password)
        if(!isPasswordTrue)
        return res.status(409).json("Invalid Password")

        if(user.role !== role) return res.status(409).json("Invalid Role")

        const token = jwt.sign({username : user.username,role : 'user' }, process.env.SECRET_KEY , { expiresIn : "24h"})

        res.status(200).json({message : 'Login successfull',token})

    } catch (err) {
        console.log(err);
        
        res.status(500).json(err)
    }
}

module.exports = {registerFunc,loginFunc}