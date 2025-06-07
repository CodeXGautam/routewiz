import mongoose from "mongoose";
import User from "../models/user.model.js";

const generateAccessandRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {
            accessToken,
            refreshToken
        };
    }

    catch (err) {
        console.error("Error generating tokens:", err);
        throw new Error("Token generation failed");
    }
}




const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password } = req.body;



        // Validate input   

        if (!(firstName || lastName || userName || email || password)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        else if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [
                { email },
                { userName }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        // Create new user
        const newUser = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password,
        });

        if (!newUser) {
            return res.status(500).json({ message: "Failed to create user" })
        }

        const { accessToken, refreshToken } = await generateAccessandRefreshToken(newUser._id)
        const user = await User.findById(newUser._id).select("-password")


        const options = {
            httpOnly: true,
            secure: true
        };

        res.status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ user, message: "User registered successfully" })
        console.log("User registered successfully:", user);


    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!(email || password)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id)

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true
        };

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                { message: "Login successful" }
            )

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const getsearchHistory = async () => {
    User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "searches",
                localField: "_id",
                foreignField: "user",
                as: "searchHistory"
            }
        }
    ])
}






export { registerUser, loginUser, getsearchHistory };