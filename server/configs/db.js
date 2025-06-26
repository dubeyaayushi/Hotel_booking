/* here we have connect our project with mongodb database */

import mongoose from "mongoose";
const mongo_url = process.env.MONGODB_URI;
/* function that would connect us to db database */
const  connectDB = async () =>{

        try{
            mongoose.connection.on('connected', () => console.log("Database Connected"))/* when connected to data base this message will be displayed */
            /* connecting to the database */
            await mongoose.connect(`${mongo_url}/hotel-booking`)
        }
        catch (error) {
            console.log(error.message);
        }

}

// if (!mongo_url) {
//     throw new Error('MongoDB connection string is missing in environment variables');
// }

// mongoose.connect(mongo_url)
//     .then(()=>{
//         console.log('MongoDB connected successfully');
//     }).catch((err)=> {
//         console.log('MongoDB connection failed:', err);
//     })



export default connectDB;
// this function will be imported in server.js file and will be called there
