/*
author:'Arnob Islam'
created date:'10/1/22'
description:''
*/

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');

const AdminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        // select: false
    },
    resetPasswordToken: String,
    resetPasswordTokenExpireDate: Date,

})


// save password with bcrypt 
AdminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 12)
    }
    next()
})


// reset password with crypto
AdminSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(30).toString('hex')
    // creatimg tokan
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')
    // expire in 15 minits
    this.resetPasswordTokenExpireDate = Date.now() + 15 * 60 * 1000
    return resetToken
}

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin

