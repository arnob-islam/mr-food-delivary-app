const Food = require('../../Models/Food');

const DisplSearchFoodItem = async () => {
    try {
        const response = await Food.find({})

        const allDisplayedFood = response.reduce((acc, current) => {
            const x = acc.find(item => item.catagory === current.catagory);
            if (!x) {
                return acc.concat([current])
            } else {
                return acc
            }
        }, []);

        // const allDisplayedFood = response.filter(
        //     (value, index, self) => self.findIndex((m) => m.catagory === value.catagory) === index);
        return {
            success: true,
            foods: allDisplayedFood
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

const DisplayFoodsBySearch = async (_, { search }) => {
    try {
        const response = await Food.find({})

        const allDisplayedFood = response.filter(e => e.catagory === search);
        return {
            success: true,
            foods: allDisplayedFood
        }
    } catch (err) {
        throw new Error(err.message)
    }
}


const resolver = {
    Query: {
        displayFoods: DisplSearchFoodItem,
        searcDisplayhFoods: DisplayFoodsBySearch
    }
}

module.exports = resolver