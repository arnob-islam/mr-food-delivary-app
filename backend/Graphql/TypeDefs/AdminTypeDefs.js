const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type AdminType {
    success: Boolean!
    message: String
    admin: Admin
  }

  type Admin {
    _id: ID!
    userName: String!
    email: String!
  }

  type ChartInfoType {
    success: Boolean!
    message: String
    chartinfo: [ChartInfo]
  }
  type FoodOrderUpdate {
    success: Boolean!
    message: String
    info: OrderUpdateinfo
  }
  type OrderUpdateinfo {
    userId: String
    foodId: String
  }

  type ChartInfo {
    name: String
    usd: Float
    uv: Float
    pv: Float
    createdAt: Int
  }
  type OrderOverview {
    success: Boolean!
    message: String
    overview: OverviewInfo
  }

  type OverviewInfo {
    foodItems: Int
    confirmDelivared: Int
    rejected: Int
    users: Int
  }

  input AdminSignUpInput {
    userName: String!
    email: String!
    password: String
  }

  # food type input
  input FoodInput {
    foodName: String
    thumb: String
    catagory: String
    subTitle: String
    price: Float
    recipe: String
  }

  type Query {
    allFoods: DisplayFoodType
    singleFood(_id: ID): FoodType
    AdminAllOrders: OrderType
    Admin: AdminType
    Riders: RidersType #from rider type  defs
    ViewRiderApply(_id: ID): RiderType
    NewApplyRiders: RidersType #from rider type  defs
    RejectedRiders: RidersType #from rider type  defs
    cashOfCurrentMonth: ChartInfoType
    OrderOverview: OrderOverview
  }

  type Mutation {
    # AdminSignUp(input:AdminSignUpInput):AdminType
    CreateNewAdmin(input: AdminSignUpInput): AdminType
    AdminLogin(userName: String, password: String): AdminType
    AdminForgetPassword(email: String): DefaultType
    AdminResetPassword(resetToken: String, password: String): DefaultType
    AdminRiderApplyReplay(
      _id: ID
      approve: Boolean
      reject: Boolean
    ): DefaultType
    AdminCreateFood(input: FoodInput): DefaultType
    AdminDeleteFood(userName: String, password: String, id: ID): DefaultType
    AdminUpdateFood(input: FoodInput, id: ID): DefaultType
    AdminUpdateOrder(status: String, id: ID): FoodOrderUpdate
  }
`;

module.exports = typeDefs;
