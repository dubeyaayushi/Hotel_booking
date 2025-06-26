import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    // _id: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
      password: { type: String, required: true },
    // image: {type: String, required: true},
     role: {type: String, enum:["user", "admin"], default: "user"},
    // recentSearchedCities:[{type: String, required: true},]
 },{timestamps:true}//timestamps: will tell us when user was created
);

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});


// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model("User", userSchema);

export default User;
