const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const app = express()
const User = require("../models/userSchema")

// middleware
app.use(express.json())


app.get("/", (req, res) => {
    User.find().then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
})
app.post("/register", async (req, res) => {

    const {
        name,
        phone,
        email,
        work,
        password,
        cPassword
    } = req.body;
    if (!name || !phone || !email || !work || !password || !cPassword) {
        res.status(501).json({message: "please fill al fileds"})
    }
    try {
        const find = await User.findOne({email: email})
        if (find) {
            res.status(401).send({message: "Email already exist!"})
        } else if (password !== cPassword) {
            res.status(401).send({message: "passsword doest match!"})
        } else {
            const user = new User({
                name,
                phone,
                email,
                work,
                password,
                cPassword
            })

            const userExist = await user.save()
            if (userExist) {
                res.status(201).send("registerd succesfully")
            } else {
                res.status(403).send("registration failed!")
            }
        }
    } catch (err) {
        res.status(401).json({err})
    }
})


app.post("/login", async (req, res) => {

    try {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(501).json({message: "please fill al fileds"})
        }
        const user = await User.findOne({email: email});
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            const token = await user.generateAuthToken()
            res.cookie("jsontoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })

            if (! isMatch) {
                res.status(401).json({message: "email/password does'nt match"})
            } else {
                res.status(201).send("Login succesfully")
            }
        } else {
            res.status(404).send("invalid credentials!")
        }
    } catch (err) {
        res.status(403).send("failed!")
    }
})

module.exports = app;
