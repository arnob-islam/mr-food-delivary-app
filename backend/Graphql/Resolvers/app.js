const UserResolver = require('./UserResolver');
const AdminResolver = require('./AdminResolver');
const RiderResolver = require('./RiderResolver');
const OrderResolver = require('./OrderResolver');
const FoodResolver = require('./FoodResolver');

module.exports = [
    UserResolver,
    AdminResolver,
    RiderResolver,
    OrderResolver,
    FoodResolver
]