import { gql } from "@apollo/client";

export const GET_ADMIN = gql`
  query AdminGet {
    Admin {
      success
      message
      admin {
        _id
        email
        userName
      }
    }
  }
`;

export const GET_CASH_OF_THE_MONTH = gql`
  query GetCashOfTheMonth {
    cashOfCurrentMonth {
      message
      success
      chartinfo {
        usd
        name
        createdAt
      }
    }
  }
`;

export const OVERVIEW_OF_THE_MONTHH = gql`
  query OrderOverview {
    OrderOverview {
      success
      overview {
        confirmDelivared
        rejected
        users
        foodItems
      }
    }
  }
`;

export const GET_ADMIN_ALL_FOODS = gql`
  query AdminAllFoods {
    allFoods {
      success
      foods {
        foodName
        _id
        catagory
        thumb
        star
        subTitle
        price
        recipe
      }
    }
  }
`;

export const GET_EDIT_SINGLE_FOOD = gql`
  query SingleFood($id: ID) {
    singleFood(_id: $id) {
      success
      message
      food {
        _id
        catagory
        foodName
        thumb
        subTitle
        price
        recipe
      }
    }
  }
`;

export const GET_ADMIN_ADD_ORDERS = gql`
  query AllOrders {
    AdminAllOrders {
      message
      success
      foodItem {
        _id
        userId
        star
        orderStatus
        foodItems {
          _id
          foodName
          price
          qty
          thumb
        }
        shippingInfo {
          area
          street
          tel
          note
        }
      }
    }
  }
`;
