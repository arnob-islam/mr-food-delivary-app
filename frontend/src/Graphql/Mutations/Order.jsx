import { gql } from "@apollo/client";

export const CLIENT_SECRET = gql`
  mutation ClientSecret($amount: Float) {
    paymentSecret(amount: $amount) {
      message
      success
    }
  }
`;
export const ORDER_FOOD = gql`
  mutation ($orderFoodInput: FoodInput) {
    orderFood(input: $orderFoodInput) {
      message
      success
    }
  }
`;

export const ORDER_NEW_RATE = gql`
  mutation ($id: [ID], $userId: String, $star: Float, $orderId: ID) {
    updateUserOrder(id: $id, userId: $userId, star: $star, orderId: $orderId) {
      message
      success
    }
  }
`;
