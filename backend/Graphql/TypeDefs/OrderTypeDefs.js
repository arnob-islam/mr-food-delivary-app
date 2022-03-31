const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type OrderType {
    success: Boolean!
    message: String
    foodItem: [Food]
  }

  type Food {
    _id: ID
    foodItems: [FoodItems]
    userId: String
    star: Float
    orderStatus: String
    paymentInfo: PaymentInfo
    shippingInfo: ShippingInfo
  }

  type FoodItems {
    # single food id
    _id: String
    foodName: String
    qty: Int
    price: Float
    thumb: String
  }
  type PaymentInfo {
    complete: Boolean
    card: Card
  }

  type Card {
    brand: String
    client_secret: String
    funding: String
    id: String
  }

  type ShippingInfo {
    area: String
    street: String
    tel: String
    note: String
  }

  input FoodItemsInput {
    foodId: String
    qty: Int
    price: Float
  }
  input PaymentInfoInput {
    complete: Boolean
    card: CardInput
  }

  input CardInput {
    brand: String
    funding: String
    client_secret: String
    id: String
  }

  input ShippingInfoInput {
    area: String
    street: String
    tel: String
    note: String
  }

  input FoodInput {
    foodItems: [FoodItemsInput]
    userId: String
    paymentInfo: PaymentInfoInput
    shippingInfo: ShippingInfoInput
  }
  type Query {
    userActiveOrder: OrderType
    userSuccessOrder: OrderType
  }
  type Mutation {
    orderFood(input: FoodInput): DefaultType
    paymentSecret(amount: Float): DefaultType
    updateUserOrder(
      id: [ID]
      orderId: ID
      userId: String
      star: Float
    ): DefaultType
  }
`;

module.exports = typeDefs;
