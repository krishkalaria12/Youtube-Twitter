import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req,res) => {
    // get user details from frontend
    // validation
    // check if user already exists: username or email
    // check for images , check for avatar
    // upload to cloudinary, avatar
    // create user object
    // create entry in db
    // remove password and refresh token from response
    // check for user creation then return

    const {fullName, email, username, password} = req.body
    
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields is required")
    }

    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with username or email already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverimageLocalPath = req.files?.coverimage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is Required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverimage = await uploadOnCloudinary(coverimageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "file upload failed of avatar");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverimage: coverimage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

export {registerUser}
