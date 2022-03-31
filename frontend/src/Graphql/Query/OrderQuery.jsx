import { gql } from "@apollo/client";

export const GET_ACTIVE_ORDER = gql`
  query UserActiveOrder {
    userActiveOrder {
      success
      message
      foodItem {
        _id
        orderStatus
        shippingInfo {
          area
          street
          tel
          note
        }
        foodItems {
          _id
          qty
          price
          foodName
          thumb
        }
      }
    }
  }
`;
export const GET_USER_SUCCESSORDER = gql`
  query UserSuccessOrder {
    userSuccessOrder {
      success
      message
      foodItem {
        _id
        orderStatus
        shippingInfo {
          area
          street
          tel
          note
        }
        foodItems {
          _id
          qty
          price
          foodName
          thumb
        }
      }
    }
  }
`;
