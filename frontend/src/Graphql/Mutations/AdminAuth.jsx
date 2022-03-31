import { gql } from "@apollo/client";

export const ADMIN_LOGIN_TYPE = gql`
mutation AdminLogin($userName: String, $password: String) {
  AdminLogin (userName: $userName,password: $password) {
    success
    message
    admin {
      _id
      userName
      email
    }
  }
}

`

export const ADMIN_FORGET_PASSWORD = gql`
mutation($email: String){
  AdminForgetPassword (email: $email) {
    message
    success
  }
}

`

export const ADMIN_RESET_PASSWORD = gql`
mutation($resetToken: String, $adminResetPassword: String) {
  AdminResetPassword (resetToken: $resetToken,password: $adminResetPassword) {
    message
    success
  }
}

`