import { gql } from '@apollo/client';

export const GET_DISPLAY_FOODS = gql`

query displayFood {
displayFoods {
  success
  foods {
    catagory
  }
}
}
`
export const DISPLAY_SEARCH_FOODS = gql`

query SearchFoods($search: String){
  searcDisplayhFoods (search: $search) {
    success
    message
   foods {
     _id
     foodName
     subTitle
     thumb
     star
     recipe
     price
   }
  }
}


`

