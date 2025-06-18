/* here we have connect our project with mongodb database */

import mongoose from "mongoose";

/* function that would connect us to db database */
const  connectDB = async () =>{

        try{
            mongoose.connection.on('connected', () => console.log("Database Connected"))/* when connected to data base this message will be displayed */
            /* connecting to the database */
            await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`)
        }
        catch (error) {
            console.log(error.message);
        }

}

export default connectDB;
// this function will be imported in server.js file and will be called there
