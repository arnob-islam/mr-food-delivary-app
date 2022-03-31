import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User {
    user {
      message
      success
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const LOG_OUT = gql`
  query {
    logout {
      success
      message
    }
  }
`;
