const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type FoodType {
    success: Boolean!
    message: String
    food: Food
  }

  type DisplayFoodType {
    success: Boolean!
    message: String
    foods: [Food]
  }

  type Food {
    _id: ID
    foodName: String
    subTitle: String
    thumb: String
    catagory: String
    price: Float
    star: Float
    starCount: [Float]
    recipe: String
  }

  type Query {
    displayFoods: DisplayFoodType
    searcDisplayhFoods(search: String): DisplayFoodType
  }
`;

module.exports = typeDefs;
