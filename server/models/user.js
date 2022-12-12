import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: {type: String}
});

export default mongoose.model("User", userSchema);