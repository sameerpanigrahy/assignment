const userModel = require('../Model/userModel')
const { validPassword, validMail, validName } = require('./validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    createUser: async (req, res) => {
        try {
            const data = req.body
        const Error = {}
        const { name, email, passWord, ...rest } = data
        if (Object.keys(data).length == 0) {
            Error.InvaileBody = "please provide a valied request Body"
        } else if (!name || !email || !passWord) {
            Error.InvailedFields = "request body missing some mandatory Fields"
        } else {
            if (rest.length >= 0) {
                Error.InvalidRequest = "request only contain name, email & passWord"
            }
            if (!validName(name)) {
                Error.InvalidName = "Valid name should not cantain any special character & it shoud be between 3-20 char "
            }
            const uniqueEmail = await userModel.findOne({ email: email })

            if (!validMail(email)) {
                Error.InvalidEmail = "plese provide a valid email"
            } else if (uniqueEmail) {
                Error.InvalidEmail = "Email ID alrady exist"
            }
            if (!validPassword(passWord)) {
                Error.InvalidPassword = "Password should be contain An upperCash & special cahar and 8-12"
            }

        }
        if (Object.keys(Error).length > 0) return res.status(400).send({ status: false, message: Error })

        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(passWord, salt)

        const obj = {
            name: name,
            email: email,
            passWord: hash
        }
        const saveData = await userModel.create(obj)

        res.status(201).send({ status: true, message: "User successfully registered", data: saveData })

        } catch (error) {
            res.status(500).send({status:false,message:error.message})
        }
    },

    logInUser: async (req, res) => {
        try {
            const data = req.body
        const Error = {}
        const { name, email, passWord, ...rest } = data
        if (Object.keys(data).length == 0) {
            Error.InvaileBody = "please provide a valied request Body"
        } else if (!email || !passWord) {
            Error.InvailedFields = "request body missing some mandatory Fields"
        } else {
            if (rest.length > 0) {
                Error.InvalidRequest = "request only contain email & passWord"
            }
            var uniqueEmail = await userModel.findOne({ email: email })

            if (!uniqueEmail) {
                Error.InvalidEmail = "plese provide a valid email"
            } else {
                const checkPass = await bcrypt.compare(passWord, uniqueEmail.passWord)
                if (!checkPass) Error.InvalidPassWord = "plese provide a correct passWord"
            }

        }

        if (Object.keys(Error).length > 0) return res.status(400).send({ status: false, message: Error })

        const token = await jwt.sign(
            { userId: uniqueEmail._id.toString() },
            process.env.key,
            { expiresIn: "24h" }
        )
        res.setHeader("x-api-key", token)
        res.status(201).send({ status: true, message: "User successfully LogedInn", Token: token })
        } catch (error) {
            res.status(500).send({status:false,message:error.message})
        }
    }
}