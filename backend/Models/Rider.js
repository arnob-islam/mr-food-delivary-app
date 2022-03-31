/*
author:'Arnob Islam'
created date:'10/1/22'
description:''
*/

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');

const RiderSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
    },
    password: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    approve: {
        type: Boolean,
        default: false
    },
    reject: {
        type: Boolean,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpireDate: Date,

}, {
    timeStamp: true
})


// save password with bcrypt 
RiderSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 12)
    }
    next()
})


// reset password with crypto
RiderSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(30).toString('hex')
    // creatimg tokan
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')
    // expire in 15 minits
    this.resetPasswordTokenExpireDate = Date.now() + 15 * 60 * 1000
    return resetToken
}

const Rider = mongoose.model('Rider', RiderSchema)

module.exports = Rider

