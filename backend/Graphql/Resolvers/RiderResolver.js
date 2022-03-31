const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const SendEmail = require('../../controllers/SendEmail');
const crypto = require('crypto');
const Rider = require('../../Models/Rider');


const CurrentRider = async (_, __, { rider }) => {
    try {

        const existRider = await Rider.findOne({ _id: rider.rider._id })
        if (existAdmin) return {
            success: true,
            rider: existRider
        }
        return {
            success: false,
            message: "no rider found"
        }

    } catch (err) {
        throw new Error(err.message)
    }
}

const RiderApply = async (_, { input }, { res }) => {

    const { email, password, userName, address, age, } = input
    try {

        const isUserNameTaken = await Rider.findOne({ userName })
        if (isUserNameTaken) {
            return {
                success: false,
                message: `rider name is taken`
            }
        }

        const isExixt = await Rider.findOne({ email })
        if (isExixt) {
            return {
                success: false,
                message: `rider exist!`
            }
        }

        const newRider = await Rider.create({
            email, password, userName, address, age,
        })
        if (newRider) return {
            success: true,
            message: "Your application is summited",
        }

        return {
            success: false,
            message: "Error try again",
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

const RiderLogin = async (_, { userName, password }, { res }) => {

    try {
        const response = await Rider.findOne({ userName, approve: true, reject: false })

        if (!response) {
            return { success: false, message: `No rider found! on your rider list` }
        }

        const byres = await bcryptjs.compare(password, response.password)

        if (byres) {

            const token = jwt.sign({ rider: response }, process.env.RIDER_JWT_SECRET, {
                expiresIn: '7d'
            })
            res.cookie('riderToken', token, {
                expires: new Date(Date.now() + 604800000),
                httpOnly: true,
            })
            return { success: true, rider: response }
        }
        return { success: false, message: `wrong password! Try again` }

    }
    catch (error) {
        throw new Error(error.message)
    }
}

const RiderForgetPassword = async (_, { email, }, { req }) => {

    try {
        const response = await Rider.findOne({ email, approve: true, reject: false })
        if (!response) {
            return { success: false, message: `No user found! as ${email}` }
        }

        const resetToken = response.getResetPasswordToken()

        await response.save({ validateBeforeSave: true })

        const resetLink = `${req.protocol}://${req.get('host')}/admin/reset-password/${resetToken}`

        await SendEmail({
            email: response.email,
            subject: 'password reset',
            message: `reset your password ${resetLink}`,
            html: ` <div  style="width: 20rem; text-align: center; margin: auto;padding: 2rem 1rem; background: rgb(243, 243, 243); font-family: sans-serif;" >
        <div>
            <h3> Password reset </h2>
            <br>
            <h3> reset your password ${resetLink} </h2>
        </div>
        <div>
            <h3> If this is not your please ignore </h2>
        </div>
      
        <div>
            <h5>
            Mr Light house
            </h5>
        </div>
    </div>`
        })

        return { success: true, message: `reset tokan is sent on ${response.email}` }
    }
    catch (error) {
        throw new Error(error.message)
    }
}

const RiderResetPassword = async (_, { resetToken, password }) => {
    try {
        const newPassword = await bcryptjs.hash(password, 12)
        const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')

        const updatedAdmin = await Rider.findOneAndUpdate(
            { resetPasswordToken, resetPasswordTokenExpireDate: { $gt: Date.now() } }, { password: newPassword, resetPasswordToken: '', resetPasswordTokenExpireDate: '' },
            { new: true, runValidators: true }
        )
        if (updatedAdmin) {
            return { success: true, message: `password reset success` }
        }

        return { success: false, message: `Invalid token or reset time is out`, }
    } catch (err) {
        throw new Error(err.message)
    }
}




const resolver = {
    Query: {
        Rider: CurrentRider,
    },
    Mutation: {
        RiderApply: RiderApply,
        RiderLogin: RiderLogin,
        RiderForgetPassword: RiderForgetPassword,
        RiderResetPassword: RiderResetPassword
    }

}

module.exports = resolver