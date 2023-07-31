const express = require("express");
const User = require("../Modals/User")
const router = express.Router();
const fetchuser = require ('../midelware/Fetchuser')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const JWT_KEY = "Sohaibisagoodboy";

//Create a user 
router.post("/creatuser", [
    body('name', 'enter Valid Name').isLength({ min: 3 }),
    body('email', 'enter Valid Email').isEmail(),
    body('password', 'enter Valid Password').isLength({ min: 5 })
], async (req, res) => {
    let success= false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(404).json({success, error: "this account already exist" })
        }


        const Salt = await bcrypt.genSalt(10);
        const SecPassword= await bcrypt.hash( req.body.password, Salt)
        user = await User.create({
            email: req.body.email,
            name: req.body.name,
            password: SecPassword,
        })

        const data ={
            user:{
                id:user.id,
            }
        }
        const AuthToken =  jwt.sign(data,JWT_KEY);

        success=true;
        res.json({success,AuthToken})

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

//Login a user
router.post("/login", [
    body('email','enter a Valid email').isEmail(),
    body('password', 'Cant be Blank').exists()
], async(req, res)=>{
    let success=false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;

    try {
        let user = await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({Message:"Account doesnt Fine"})   
        }

        const passwordCompare = await bcrypt.compare(password,user.password)

        if(!passwordCompare)
        {
            return res.status(400).json({Message:"Account doesnt"}) 
        }

        const Payload ={
            user:{
                id:user.id,
            }
        }
        const AuthToken =  jwt.sign(Payload,JWT_KEY);
        success=true;
        res.json({success,AuthToken})

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

//getlogin user details
router.post("/getuser",fetchuser,async(req, res)=>{
    try {
    userid=req.user.id;
    const user =await User.findById(userid).select("-password")
    res.send(user);
    } catch (error) {
        console.error(error)
            res.status(500).send('error occured')
    }
})

module.exports = router