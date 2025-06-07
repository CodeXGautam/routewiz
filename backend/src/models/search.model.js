import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },

    start :{
        type: String,
        required: true,
    },

    end: {
        type: String,
        required: true,
    },
    vehicle: {
        type: String,
        enum: ["car", "bike", "walking"],
        required: true,
    },
    routePref: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,   
});

const Search = mongoose.model("Search", searchSchema);
export default Search;