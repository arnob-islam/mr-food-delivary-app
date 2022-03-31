import { gql } from "@apollo/client";

export const FORGET_PASSWORD = gql`
  mutation ForgetPassword($email: String) {
    forgetPassword(email: $email) {
      message
      success
    }
  }
`;

export const LOGIN_TYPE = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      success
      message
      user {
        _id
        email
        firstName
        lastName
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Signup($input: signUpInput) {
    signUp(input: $input) {
      success
      message
      user {
        _id
        email
        firstName
        lastName
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($resetToken: String, $password: String) {
    resetPassword(resetToken: $resetToken, password: $password) {
      message
      success
    }
  }
`;

export const UPDATE_USER_INFORMATION = gql`
  mutation ($email: String, $firstName: String, $lastName: String) {
    updateUserInfo(email: $email, firstName: $firstName, lastName: $lastName) {
      message
      success
      user {
        _id
        email
        firstName
        lastName
        createdAt
      }
    }
  }
`;
export const UPDATE_USER_PASSWORD = gql`
  mutation ($oldPassword: String, $newPassword: String) {
    updateUserPassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      message
      success
    }
  }
`;
