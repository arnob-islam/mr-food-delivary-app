const { gql } = require("apollo-server-express");

const typeDefs = gql`

type RiderType{
    success:Boolean!
    message:String
    rider:Rider
}
type RidersType{
    success:Boolean!
    message:String
    riders:[Rider] 
}
type Rider{
     _id:ID!
    userName:String!
    email: String!
    rider_photo: String
    address: String
    age: Int
    approve: Boolean
    reject: Boolean
    createdAt: String
}
input RiderApplyInput{
    userName:String!
    password:String!
    email: String!
    photoUrl: String
    address: String
    age: Int
}

type Query{
    Rider:RidersType
}
type Mutation{
    RiderApply(input:RiderApplyInput):DefaultType
    RiderLogin(userName:String password:String):RiderType
    RiderForgetPassword(email:String):DefaultType
    RiderResetPassword(resetToken:String password:String):DefaultType
}
`

module.exports = typeDefs