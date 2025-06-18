import User from "../models/User";

import { Webhook } from "svix";

const clerWebhooks = async (req,res) =>{
    try{
        // create a Svix instance with clerk webhook secret
        const whook= new Webhook(process.env.CLERK_WEBHOOK_SECRET)//this will create a new webhook


        ///getting headers
        const headers ={
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        //verifying Headers
        await whook.verify(JSON.stringify(req.body), headers);

        //getting data from request body
        const {data, type} = req.body;
        
        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.img_url,
        }
        
        // Switch cases for differnt Events
        switch (type) {
            case "user.created":{
                await User.create(userData); // create a new user in the database
                break;
            }
            case "user.updated":{
                await User.findByIdAndUpdate(data.id, userData); // update user in the database
                break;
            }
            case "user.deleted":{
                await User.findByIdAndDelete(data.id); // delete user from the database
                break;
            }

            defeault: 
            break;
        }
        res.json({success: true, message: "Webhook Recieved"})
    }

    catch (error){
        console.log(error.message);
        res.json({success: false, message: error.message});

    }
}

export default clerWebhooks;
