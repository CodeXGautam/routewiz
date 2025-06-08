import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const generateAccessandRefreshToken = async (userId) => {
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
  } catch (err) {
    console.error("Error generating tokens:", err);
    throw new Error("Token generation failed");
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;

    if (!(firstName && lastName && userName && email && password)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { userName }]
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password,
    });

    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(newUser._id);
    const user = await User.findById(newUser._id).select("-password");

    const options = {
      httpOnly: true,
      secure: false,
    };

    res.status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ user, message: "User registered successfully" });

  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: false,
    };

    return res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user: loggedInUser,
        accessToken,
        refreshToken,
        message: "Login successful"
      });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getcurrentUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user,
    });

  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.refreshToken = undefined;
    await user.save({ validateBeforeSave: false });


    const options = {
      httpOnly: true,
      secure: false,
    };

    return res.status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "Logged out successfully" });


  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const refreshAccessToken = async(req,res) =>{
    const incomingRefreshToken = req.cookies?.refreshToken;
    
    if(!incomingRefreshToken) {
      res.status(401)
      .json({
        message: "Token not found"
      })
    }
    const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);

    if(!decodedToken){
      res.status(401)
      .json({
        message:"Unauthorized token"
      })
    }

    const user = User.findById(decodedToken._id) 

    if(!user){
      res.status(409)
      .json({
        message:"Unauthorized user"
      })
    }

    if(!(incomingRefreshToken === user?.refreshToken)){
      res.status(401)
      .json({
        message:"Unauthorized user request"
      })
    }

      const options = {
      httpOnly: true,
      secure: false,
    };

    const {accessToken, newRefreshToken} = generateAccessandRefreshToken(user._id)

    res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken",newRefreshToken, options)
    .json({
      message:"AccessToken refreshed",
      accessToken,
      refreshToken:newRefreshToken
    })

}

const getsearchHistory = async (req, res) => {
  try {
    const history = await User.aggregate([
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
      },
      {
        $project: {
          searchHistory: 1,
          _id: 0
        }
      }
    ]);

    res.status(200).json({ searchHistory: history[0]?.searchHistory || [] });

  } catch (error) {
    console.error("Error fetching search history:", error);
    res.status(500).json({ message: "Failed to fetch search history" });
  }
};

export {
  registerUser,
  loginUser,
  getsearchHistory,
  getcurrentUser,
  logoutUser
};
