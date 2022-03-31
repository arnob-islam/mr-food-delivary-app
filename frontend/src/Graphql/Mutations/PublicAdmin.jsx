import { gql } from "@apollo/client";

export const CREATE_NEW_ADMIN = gql`
  mutation CreateNewAdmin($input: AdminSignUpInput) {
    CreateNewAdmin(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_NEW_FOOD = gql`
  mutation ($input: FoodInput) {
    AdminCreateFood(input: $input) {
      message
      success
    }
  }
`;

export const DELETE_FOOD = gql`
  mutation ($userName: String, $password: String, $id: ID) {
    AdminDeleteFood(userName: $userName, password: $password, id: $id) {
      message
      success
    }
  }
`;
export const UPDATE_FOOD = gql`
  mutation ($input: FoodInput, $id: ID) {
    AdminUpdateFood(input: $input, id: $id) {
      message
      success
    }
  }
`;

export const UPDATE_ADMIN_ORDER_STATUS = gql`
  mutation ($status: String, $id: ID) {
    AdminUpdateOrder(status: $status, id: $id) {
      message
      success
      info {
        userId
        foodId
      }
    }
  }
`;
