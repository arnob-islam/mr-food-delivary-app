const socket = require("socket.io");
const Food = require("../Models/Food");
const FoodOrder = require("../Models/Order");

// user who went to see their order status
let Users = [];

const addUser = (socketId, userId, foodId) => {
  const chack = Users.some((user) => user.userId === userId);
  if (!chack) {
    Users.push({
      socketId,
      userId,
      foodId,
    });
  }
};

const SocketIo = (server) => {
  const io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    initial(socket, io);
  });
};

const initial = (socket, io) => {
  socket.on("MyOrderStatus", async ({ foodId, userId }) => {
    addUser(socket.id, userId, foodId);
    io.to(socket.id).emit("orderStatus", await getOrder(foodId));
  });

  socket.on("OrderStatusIsUpdated", async ({ foodId, userId }) => {
    const isThisUserOnline = Users.find(
      (e) => e.foodId == foodId && e.userId === userId
    );
    if (isThisUserOnline) {
      io.to(isThisUserOnline.socketId).emit(
        "orderStatusUpdated",
        await getOrder(foodId)
      );
    }
  });
};

const getOrder = async (id) => {
  try {
    const response = await FoodOrder.findById(id);

    if (response) {
      const intizer = await Promise.all(
        response.foodItems.map(async ({ foodId, _id, qty, price }) => {
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
      const {
        paymentInfo,
        shippingInfo,
        userId,
        orderStatus,
        _id,
        delivered,
        rated,
      } = response;

      return {
        _id,
        foodItems: intizer,
        shippingInfo,
        userId,
        orderStatus,
        paymentBy: paymentInfo.card.brand,
        delivered,
        rated,
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = SocketIo;
