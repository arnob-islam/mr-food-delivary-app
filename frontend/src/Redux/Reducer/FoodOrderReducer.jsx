const initialState = {
    orderList: [],
    userAddress: {},
    userInformation: {},
    processing: false,
}

const Reducer = (state = initialState, { type, payload }) => {


    if (type === 'ADD_TO_FOOD_ORDER') {

        const { _id } = payload


        const isExist = state.orderList.find(e => e._id === _id)

        if (isExist) {
            const increasedFoodItem = state.orderList.map(e => {
                if (e._id === _id) {
                    let newQty = e.qty + 1
                    return {
                        ...e,
                        qty: newQty
                    }
                }
                return e
            })
            return {
                ...state,
                orderList: increasedFoodItem
            }

        }

        return {
            ...state,
            orderList: [
                ...state.orderList, payload
            ]

        }

    }

    if (type === "DELETE_FORM_LIST") {
        const remainItem = state.orderList.filter(e => e._id !== payload)
        return {
            ...state,
            orderList: remainItem
        }
    }

    if (type === "DECREASE_ITEM_QTY") {

        const decreaseItem = state.orderList.map(e => {
            if (e._id === payload) {
                let newQty = e.qty - 1
                return {
                    ...e,
                    qty: newQty
                }
            }
            return e
        })
        return {
            ...state,
            orderList: decreaseItem
        }
    }

    if (type === "INCREASE_ITEM_QTY") {

        const increasedItem = state.orderList.map(e => {
            if (e._id === payload) {
                let newQty = e.qty + 1
                return {
                    ...e,
                    qty: newQty
                }
            }
            return e
        })
        return {
            ...state,
            orderList: increasedItem
        }
    }

    if (type === "USER_ADDRESS") {
        return {
            ...state,
            userAddress: payload
        }
    }

    if (type === "USER_PERSONAL_INFORMATION") {
        return {
            ...state,
            userInformation: payload
        }
    }

    if (type === "PAYMENT_COMPLETE") {
        return {
            ...state,
            orderList: []
        }
    }

    return state
}

export default Reducer