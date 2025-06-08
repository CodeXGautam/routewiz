import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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


searchSchema.plugin(mongooseAggregatePaginate)

const Search = mongoose.model("Search", searchSchema);
export default Search;