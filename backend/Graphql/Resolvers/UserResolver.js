const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const SendEmail = require("../../controllers/SendEmail");
const crypto = require("crypto");
const User = require("../../Models/User");

const CurrentUser = async (_, __, { user }) => {
  try {
    const existUser = await User.findOne({ _id: user.user._id });
    if (user)
      return {
        success: true,
        user: existUser,
      };
    return {
      success: false,
      message: "no user found",
    };
  } catch (err) {
    throw new Error("Not login");
  }
};

const SingUp = async (_, { input }, { res }) => {
  const { email, password, firstName, lastName, photoUrl } = input;
  try {
    const isExixt = await User.findOne({ email });
    if (isExixt) {
      return {
        success: false,
        message: `user exist! try to login`,
      };
    }

    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      photoUrl,
    });
    const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 604800000),
      httpOnly: true,
    });
    return {
      success: true,
      message: "regiser success",
      user: newUser,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const Login = async (_, { email, password }, { res }) => {
  try {
    const response = await User.findOne({ email });
    if (!response) {
      return { success: false, message: `No user found! please signup` };
    }

    const byres = await bcryptjs.compare(password, response.password);

    if (byres) {
      const token = jwt.sign({ user: response }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 604800000),
        httpOnly: true,
      });
      return { success: true, token, user: response };
    }
    return { success: false, message: `wrong password! Try again` };
  } catch (error) {
    throw new Error(error.message);
  }
};

const ForgetPassword = async (_, { email }, { req }) => {
  try {
    const response = await User.findOne({ email });
    if (!response) {
      return { success: false, message: `No user found! as ${email}` };
    }

    const resetToken = response.getResetPasswordToken();

    await response.save({ validateBeforeSave: true });

    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/user/reset-password/${resetToken}`;

    await SendEmail({
      email: response.email,
      subject: "password reset",
      message: `reset your password ${resetLink}`,
      html: `<div  style="width: 20rem; text-align: center; margin: auto;padding: 2rem 1rem; background: rgb(243, 243, 243); font-family: sans-serif;" >
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
    </div>`,
    });

    return {
      success: true,
      message: `reset tokan is sent on ${response.email}`,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const ResetPassword = async (_, { resetToken, password }) => {
  try {
    const newPassword = await bcryptjs.hash(password, 12);
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOneAndUpdate(
      { resetPasswordToken, resetPasswordTokenExpireDate: { $gt: Date.now() } },
      {
        password: newPassword,
        resetPasswordToken: "",
        resetPasswordTokenExpireDate: "",
      },
      { new: true, runValidators: true }
    );
    if (user) {
      return { success: true, message: `password reset success` };
    }

    return { success: false, message: `Invalid token or reset time is out` };
  } catch (err) {
    throw new Error(err.message);
  }
};

const LogOut = async (_, __, { res }) => {
  try {
    res.clearCookie("token");
    return { success: true, message: "logout success" };
  } catch (err) {
    throw new Error(err.message);
  }
};

const UpdateUserInfo = async (
  _,
  { email, firstName, lastName },
  { user, res }
) => {
  try {
    const useToUpdate = async (id, obj) => {
      const response = await User.findByIdAndUpdate({ _id: id }, obj, {
        new: true,
        runValidators: true,
      });
      const token = jwt.sign({ user: response }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 604800000),
        httpOnly: true,
      });
      return response;
    };

    if (email === user.user.email) {
      const upRes = await useToUpdate(user.user._id, { firstName, lastName });
      return { success: true, message: "update success", user: upRes };
    }
    const isEmailExist = await User.findOne({ email });

    if (!isEmailExist) {
      const upRes = await useToUpdate(user.user._id, {
        email,
        firstName,
        lastName,
      });
      return { success: true, message: "update success", user: upRes };
    }
    return { success: false, message: "email is taken" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const UpdateUserPassword = async (
  _,
  { oldPassword, newPassword },
  { user }
) => {
  try {
    const thisUser = await User.findOne({ _id: user.user._id });

    const byres = await bcryptjs.compare(oldPassword, thisUser.password);

    if (byres) {
      const hashPass = await bcryptjs.hash(newPassword, 12);

      await User.findByIdAndUpdate(
        { _id: user.user._id },
        {
          password: hashPass,
        },
        { new: true, runValidators: true }
      );
      return { success: true, message: "update success" };
    }
    return { success: false, message: "Your password is wrong" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const resolver = {
  Query: {
    user: CurrentUser,
    logout: LogOut,
  },
  Mutation: {
    signUp: SingUp,
    login: Login,
    forgetPassword: ForgetPassword,
    resetPassword: ResetPassword,
    updateUserInfo: UpdateUserInfo,
    updateUserPassword: UpdateUserPassword,
  },
};

module.exports = resolver;
