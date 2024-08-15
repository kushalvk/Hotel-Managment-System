const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String
})

// generating token
UserSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign(
            {
                username: this.username,
                email: this.email,
                role: this.role,
            },
            process.env.JWT_TOKEN,
            {
                expiresIn: '1h'
            }
        )
        return token;
    } catch (error) {
        console.log(error);
    }
}

const UserModel = mongoose.model("auths", UserSchema)
module.exports = UserModel