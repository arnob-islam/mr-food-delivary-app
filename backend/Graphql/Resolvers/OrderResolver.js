const Order = require("../../Models/Order");
const Food = require("../../Models/Food");
const stripe = require("stripe")(process.env.STRIPE_SECTET_KEY);

const OrderTheFood = async (_, { input }) => {
  try {
    const newOrder = await Order.create(input);

    if (newOrder) return { success: true, message: `${newOrder._id}` };

    return { success: false, message: "Error try again" };
  } catch (err) {
    throw new Error(err.message);
  }
};

const PaymentSecret = async (_, { amount }) => {
  try {
    const striperRes = await stripe.paymentIntents.create({
      amount: amount * 100, // multipy by 100 for stripe payment in sent
      currency: "usd",
    });

    return { success: true, message: striperRes.client_secret };
  } catch (error) {
    throw new Error(error.message);
  }
};

const UserActiveOrder = async (_, __, { user }) => {
  try {
    const response = await Order.find({
      userId: user.user._id,
      reject: false,
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

    return {
      success: true,
      foodItem: container,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const UserSuccessOrders = async (_, __, { user }) => {
  try {
    const response = await Order.find({
      userId: user.user._id,
      reject: false,
      orderStatus: "delivared",
      delivered: true,
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

    return {
      success: true,
      foodItem: container,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const UpdateUserOrder = async (
  _,
  { id, userId, star: userStar, orderId },
  { user }
) => {
  try {
    if (user.user._id === userId) {
      id.map(async (e) => {
        await Food.findByIdAndUpdate(
          e,
          {
            $push: {
              starCount: userStar,
            },
          },
          { new: true, runValidators: true }
        );
      });

      for (let index = 0; index < id.length; index++) {
        const element = id[index];
        if (element) {
          let starArr = [];
          const response = await Food.findById(element);

          starArr = response.starCount;

          var count = 0;
          var sum = starArr.reduce(function (sum, item, index) {
            count += item;
            return sum + item * (index + 1);
          }, 0);

          const totalRate = sum / count;
          const fixTo = Number(totalRate.toFixed(1));

          await Food.findByIdAndUpdate(element, { star: fixTo });
        }
      }
      await Order.findByIdAndUpdate(
        orderId,
        { rated: true },
        { new: true, runValidators: true }
      );

      return { success: true, message: `Rated success` };
    }

    return { success: false, message: `Something is wrong` };
  } catch (error) {
    throw new Error(error.message);
  }
};

const resolver = {
  Query: {
    userActiveOrder: UserActiveOrder,
    userSuccessOrder: UserSuccessOrders,
  },
  Mutation: {
    orderFood: OrderTheFood,
    paymentSecret: PaymentSecret,
    updateUserOrder: UpdateUserOrder,
  },
};

module.exports = resolver;
