const mongoose = require("mongoose");
const mongodbURI = 'mongodb+srv://shibhya:shibhya@food-delivery.wvj7o2q.mongodb.net/food-delivery?retryWrites=true&w=majority';



const mongoDBconn = async () => {
    await mongoose.connect(mongodbURI)
        .then(async () => {
            console.log("Atlas Connected Successfully");
            const foodItems = mongoose.connection.collection('foodItems');
            const foodCategory=mongoose.connection.collection('foodCategory');
            try {
                const foodData = await foodItems.find({}).toArray();
                const catFoodData=await foodCategory.find({}).toArray();
                
                     global.food_Items=foodData;
                     global.foodCategory=catFoodData;
                 
            } catch (error) {
                console.error(error);
            }

})
        .catch ((e) => {
    console.log(e);
})

}

module.exports = mongoDBconn;

