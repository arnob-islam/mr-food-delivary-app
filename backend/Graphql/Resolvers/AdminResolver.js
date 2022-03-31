const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const SendEmail = require("../../controllers/SendEmail");
const cloudinary = require("../../controllers/Cloudinary");
const crypto = require("crypto");
const Admin = require("../../Models/Admin");
const Rider = require("../../Models/Rider");
const Food = require("../../Models/Food");
const FoodOrder = require("../../Models/Order");
const User = require("../../Models/User");

const CurrentAdmin = async (_, __, { admin }) => {
  try {
    const existAdmin = await Admin.findOne({ _id: admin.admin._id });
    if (existAdmin)
      return {
        success: true,
        admin: existAdmin,
      };
    return {
      success: false,
      message: "no admin found",
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const AdminSingUp = async (_, { input }, { res }) => {
  const { email, password, userName } = input;
  try {
    const isUserNameTaken = await Admin.findOne({ userName });
    if (isUserNameTaken) {
      return {
        success: false,
        message: `user name is taken`,
      };
    }

    const isExixt = await Admin.findOne({ email });
    if (isExixt) {
      return {
        success: false,
        message: `user exist! try to login`,
      };
    }

    const newAdmin = await Admin.create({
      email,
      password,
      userName,
    });
    const token = jwt.sign({ admin: newAdmin }, process.env.ADMIN_JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("AdminToken", token, {
      expires: new Date(Date.now() + 604800000),
      httpOnly: true,
    });
    return {
      success: true,
      message: "regiser success",
      admin: newAdmin,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const CreateNewAdmin = async (_, { input }, { res }) => {
  const { email, password, userName } = input;
  try {
    const isUserNameTaken = await Admin.findOne({ userName });
    if (isUserNameTaken) {
      return {
        success: false,
        message: `user name is taken`,
      };
    }

    const isExixt = await Admin.findOne({ email });
    if (isExixt) {
      return {
        success: false,
        message: `user exist! try to login`,
      };
    }

    const newAdmin = await Admin.create({
      email,
      password,
      userName,
    });
    const token = jwt.sign({ admin: newAdmin }, process.env.ADMIN_JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("AdminToken", token, {
      expires: new Date(Date.now() + 604800000),
      httpOnly: true,
    });
    return {
      success: true,
      message: "admin create success",
      admin: newAdmin,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const AdminLogin = async (_, { userName, password }, { res }) => {
  try {
    const response = await Admin.findOne({ userName });

    if (!response) {
      return { success: false, message: `No admin found! please signup` };
    }

    const byres = await bcryptjs.compare(password, response.password);

    if (byres) {
      const token = jwt.sign(
        { admin: response },
        process.env.ADMIN_JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      res.cookie("adminToken", token, {
        expires: new Date(Date.now() + 604800000),
        httpOnly: true,
      });
      return { success: true, admin: response };
    }
    return { success: false, message: `wrong password! Try again` };
  } catch (error) {
    throw new Error(error.message);
  }
};

const AdminForgetPassword = async (_, { email }, { req }) => {
  try {
    const response = await Admin.findOne({ email });
    if (!response) {
      return { success: false, message: `No user found! as ${email}` };
    }

    const resetToken = response.getResetPasswordToken();

    await response.save({ validateBeforeSave: true });

    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/admin/reset-password/${resetToken}`;

    await SendEmail({
      email: response.email,
      subject: "password reset",
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

const AdminResetPassword = async (_, { resetToken, password }) => {
  try {
    const newPassword = await bcryptjs.hash(password, 12);
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const updatedAdmin = await Admin.findOneAndUpdate(
      { resetPasswordToken, resetPasswordTokenExpireDate: { $gt: Date.now() } },
      {
        password: newPassword,
        resetPasswordToken: "",
        resetPasswordTokenExpireDate: "",
      },
      { new: true, runValidators: true }
    );
    if (updatedAdmin) {
      return { success: true, message: `password reset success` };
    }

    return { success: false, message: `Invalid token or reset time is out` };
  } catch (err) {
    throw new Error(err.message);
  }
};

const AllWorkinRiders = async () => {
  try {
    const allWorkingRiders = await Rider.find({ approve: true, reject: false });
    return {
      success: true,
      riders: allWorkingRiders,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const ViewRiderApplay = async (_, { _id }) => {
  try {
    const riderApply = await Rider.findOne({ _id });

    if (riderApply) return { success: true, rider: riderApply };

    return { success: false, message: "no apply rider found" };
  } catch (err) {
    throw new Error(err.message);
  }
};

const NewApplyedRiders = async () => {
  try {
    const newApplyRiders = await Rider.find({ reject: false });
    return {
      success: true,
      riders: newApplyRiders,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const RejectedRiders = async () => {
  try {
    const rejectedRiders = await Rider.find({ reject: true });
    return {
      success: true,
      riders: rejectedRiders,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const AdminRiderApplyReplay = async (_, { _id, approve, reject }) => {
  try {
    const replay = await Rider.findOneAndUpdate(
      { _id },
      {
        approve,
        reject,
      },
      { new: true, runValidators: true }
    );

    if (replay.approve) {
      await SendEmail({
        email: replay.email,
        subject: "Job Approve",
        message: `Congratulation`,
        html: ` <div  style="width: 20rem; text-align: center; margin: auto;padding: 2rem 1rem; background: rgb(243, 243, 243); font-family: sans-serif;" >
        <div>
            <h3> your application has been approved </h2>
            <br>
            <h3> We will contact you soon to join us </h2>
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
        message: `rider is approved`,
      };
    }

    if (replay.reject) {
      await SendEmail({
        email: replay.email,
        subject: "Job Rejection",
        message: `Sorry`,
        html: ` <div  style="width: 20rem; text-align: center; margin: auto;padding: 2rem 1rem; background: rgb(243, 243, 243); font-family: sans-serif;" >
        <div>
            <h3> Your application has been Denied </h2>
            <br>
            <h3> Sorry! we are unable to select you </h2>
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
        message: `application denied`,
      };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const CreateNewFood = async (_, { input }, { admin }) => {
  const { foodName, subTitle, thumb, catagory, price, recipe } = input;
  try {
    if (!admin) {
      return {
        success: false,
        message: "Admin authentication fail",
      };
    }
    const publicIdForPic = crypto.randomBytes(10).toString("hex");

    const thumbRes = await cloudinary.uploader.upload(thumb, {
      folder: "Food-Delivery/foods",
      public_id: publicIdForPic,
    });

    const response = await Food.create({
      foodName,
      subTitle,
      thumb: thumbRes.url,
      catagory,
      price,
      recipe,
      publicId: publicIdForPic,
    });
    return {
      success: true,
      message: `new food id is ${response._id}`,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const GetCashOfTheMonth = async () => {
  try {
    const currentTimes = new Date();
    const curr_year = currentTimes.getFullYear();
    const curr_month = currentTimes.getMonth();

    let monthCash = [];

    const response = await FoodOrder.find({
      createdAt: {
        $gte: new Date(curr_year, curr_month),
        $lt: new Date(curr_year, curr_month + 1),
      },
      delivered: true,
    });

    for (let index = 0; index < response.length; index++) {
      const element = response[index];

      if (element) {
        const singleDay = response.filter(
          (a) =>
            new Date(a.createdAt).getDate() ===
            new Date(element.createdAt).getDate()
        );

        const createdDate = new Date(element.createdAt).getDate();
        let money = 0;

        singleDay.forEach((singleElm) => {
          if (singleElm) {
            money =
              money +
              singleElm.foodItems.reduce((acc, e) => acc + e.qty * e.price, 0);
          }
        });

        monthCash = [
          ...monthCash,
          {
            name: `${createdDate}`,
            usd: money,
            uv: 00,
            pv: 00,
            createdAt: createdDate,
          },
        ].filter(
          (value, index, self) =>
            self.findIndex((m) => Number(m.name) === value.createdAt) === index
        );
      }
    }

    return {
      success: true,
      chartinfo: monthCash,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const GetOrderOverview = async () => {
  try {
    const currentTimes = new Date();
    const curr_year = currentTimes.getFullYear();
    const curr_month = currentTimes.getMonth();

    const foodItems = await Food.find({});
    const confirmDelivared = await FoodOrder.find({
      createdAt: {
        $gte: new Date(curr_year, curr_month),
        $lt: new Date(curr_year, curr_month + 1),
      },
      delivered: true,
    });
    const rejected = await FoodOrder.find({
      createdAt: {
        $gte: new Date(curr_year, curr_month),
        $lt: new Date(curr_year, curr_month + 1),
      },
      rejected: true,
    });

    const users = await User.find({
      createdAt: {
        $gte: new Date(curr_year, curr_month),
        $lt: new Date(curr_year, curr_month + 1),
      },
    });

    return {
      success: true,
      overview: {
        foodItems: foodItems.length,
        confirmDelivared: confirmDelivared.length,
        rejected: rejected.length,
        users: users.length,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const GetAllFoods = async () => {
  try {
    const allFood = await Food.find({});
    return {
      success: true,
      foods: allFood,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const AdminDeleteFood = async (_, { userName, password, id }) => {
  try {
    const response = await Admin.findOne({ userName });

    if (!response) {
      return { success: false, message: `No admin found!` };
    }

    const byres = await bcryptjs.compare(password, response.password);

    if (byres) {
      const { publicId } = await Food.findById({ _id: id });

      await cloudinary.uploader.destroy(`Food-Delivery/foods/${publicId}`);

      await Food.deleteOne({ _id: id });

      return { success: true, message: "delete success" };
    }
    return { success: false, message: `wrong password! Try again` };
  } catch (error) {
    throw new Error(error.message);
  }
};

const ViewSingleFood = async (_, { _id }) => {
  try {
    const findFood = await Food.findById(_id);
    if (findFood) {
      return { success: true, food: findFood };
    }
    return {
      success: false,
      message: `No food found ${_id}`,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const AdminUpdateFood = async (_, { input, id }) => {
  try {
    const { foodName, subTitle, thumb, catagory, price, recipe } = input;

    const useToUpdate = async (params) => {
      return await Food.findByIdAndUpdate(id, params, {
        new: true,
        runValidators: true,
      });
    };

    const findRes = await Food.findById(id);

    if (!findRes) return { success: false, message: "no found" };
    // if the thumb is not changed
    if (findRes.thumb === thumb) {
      await useToUpdate({
        foodName,
        subTitle,
        catagory,
        price,
        recipe,
      });

      return {
        success: true,
        message: "Update success",
      };
    } else {
      // if the thumb is  changed
      await cloudinary.uploader.destroy(
        `Food-Delivery/foods/${findRes.publicId}`
      );

      const publicIdForPic = crypto.randomBytes(10).toString("hex");

      const thumbRes = await cloudinary.uploader.upload(thumb, {
        folder: "Food-Delivery/foods",
        public_id: publicIdForPic,
      });

      await useToUpdate({
        foodName,
        subTitle,
        thumb: thumbRes.url,
        catagory,
        price,
        recipe,
        publicId: publicIdForPic,
      });

      return {
        success: true,
        message: "update success",
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const AdminAllOrders = async () => {
  try {
    const response = await FoodOrder.find({
      rejected: false,
    }).sort({
      orderStatus: 1,
      // updatedAt: 1
    });

    const container = await Promise.all(
      response.map(
        async ({
          foodItems,
          _id,
          userId,
          orderStatus,
          shippingInfo,
          paymentInfo,
        }) => {
          const intizer = await Promise.all(
            foodItems.map(async ({ foodId, _id, qty, price }) => {
              const res = await Food.findById(foodId);
              return {
                foodId,
                _id,
                qty,
                price,
                thumb: res.thumb,
                foodName: res.foodName,
              };
            })
          );

          return {
            _id,
            userId,
            orderStatus,
            shippingInfo,
            paymentInfo,
            foodItems: intizer,
          };
        }
      )
    );

    const pendingOrders = container.filter((e) => e.orderStatus == "pending");
    const acceptOrders = container.filter((e) => e.orderStatus == "accept");
    const cookingOrders = container.filter((e) => e.orderStatus == "cooking");
    const onWay = container.filter((e) => e.orderStatus == "way");

    return {
      success: true,
      foodItem: [...pendingOrders, ...acceptOrders, ...cookingOrders, ...onWay],
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const AdminUpdateOrder = async (_, { status, id }) => {
  try {
    if (status === "delivared") {
      const resp = await FoodOrder.findByIdAndUpdate(
        id,
        { orderStatus: status, delivered: true },
        { new: true, runValidators: true }
      );
      return {
        success: true,
        message: `This order is ${resp.orderStatus}`,
        info: {
          foodId: resp._id,
          userId: resp.userId,
        },
      };
    }
    if (status === "reject") {
      const resp = await FoodOrder.findByIdAndUpdate(
        id,
        { orderStatus: status, delivered: false, rejected: true },
        { new: true, runValidators: true }
      );
      return {
        success: true,
        message: `This order is ${resp.orderStatus}`,
        info: {
          foodId: resp._id,
          userId: resp.userId,
        },
      };
    }

    const resp = await FoodOrder.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true, runValidators: true }
    );
    return {
      success: true,
      message: `This order is ${resp.orderStatus}`,
      info: {
        foodId: resp._id,
        userId: resp.userId,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const resolver = {
  Query: {
    allFoods: GetAllFoods,
    AdminAllOrders,
    Admin: CurrentAdmin,
    Riders: AllWorkinRiders,
    ViewRiderApply: ViewRiderApplay,
    NewApplyRiders: NewApplyedRiders,
    RejectedRiders: RejectedRiders,
    cashOfCurrentMonth: GetCashOfTheMonth,
    OrderOverview: GetOrderOverview,
    singleFood: ViewSingleFood,
  },
  Mutation: {
    // AdminSignUp: AdminSingUp,
    CreateNewAdmin: CreateNewAdmin,
    AdminLogin: AdminLogin,
    AdminForgetPassword: AdminForgetPassword,
    AdminResetPassword: AdminResetPassword,
    AdminRiderApplyReplay,
    AdminCreateFood: CreateNewFood,
    AdminDeleteFood: AdminDeleteFood,
    AdminUpdateFood,
    AdminUpdateOrder,
  },
};

module.exports = resolver;
