const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        reuired: true
    },
    email: {
        type: String,
        reuired: true
    },
    phone: {
        type: Number,
        reuired: true
    },
    work: {
        type: String,
        reuired: true
    },
    password: {
        type: String,
        reuired: true
    },
    cPassword: {
        type: String,
        reuired: true
    },
    tokens: [
        {
            token: {
                type: String,
                reuired: true
            }
        }
    ]
})
// hashing function
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cPassword = await bcrypt.hash(this.cPassword, 12);
    }
    next();
})
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({
            _id: this._id
        }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token: token})
        await this.save();
        return token;
    } catch (err) {
        console.log(err)
    }
}


const User = mongoose.model("USER", userSchema)
module.exports = User;
