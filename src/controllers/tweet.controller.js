import mongoose, { isValidObjectId, mongo } from "mongoose"
import { Tweet } from "../models/tweet.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId");
    }

    const tweets = await Tweet.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            "avatar.url": 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "tweet",
                as: "likeDetails",
                pipeline: [
                    {
                        $project: {
                            likedBy: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                likesCount: {
                    $size: "$likeDetails",
                },
                ownerDetails: {
                    $first: "$ownerDetails",
                },
                isLiked: {
                    $cond: {
                        if: {$in: [req.user?._id, "$likeDetails.likedBy"]},
                        then: true,
                        else: false
                    }
                }
            },
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $project: {
                content: 1,
                ownerDetails: 1,
                likesCount: 1,
                createdAt: 1,
                isLiked: 1
            },
        },
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, tweets, "Tweets fetched successfully"));
})

const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;

    if (!req.user?._id) {
        throw new ApiError(400, "You must be authenticated to like the video")
    }

    if (!content) {
        throw new ApiError(404, "Content is required")
    }

    const tweet = await Tweet.create({
        content,
        owner: req.user?._id,
    })

    if (!tweet) {
        throw new ApiError(500, "Failed to add tweet, Try again later")
    }

    return res
        .status(201)
        .json(new ApiResponse(201, tweet, "Tweet Added Successfully"))
})

const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { content } = req.body;

    if (!req.user?._id) {
        throw new ApiError(400, "You must be authenticated to tweet")
    }

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(404, "Tweet not found")
    }

    if (!content) {
        throw new ApiError(404, "Content is required")
    }

    const tweetDetails = await Tweet.findById(tweetId)

    const userId = new mongoose.Types.ObjectId(req.user?._id)

    if (!userId.equals(tweetDetails?.owner)) {
        throw new ApiError(404, "You are not authorized to update this tweet")
    }

    const tweet = await Tweet.findByIdAndUpdate(tweetDetails?._id, {
        $set: {
            content
        }
    }, {new: true})

    if (!tweet) {
        throw new ApiError(500, "Failed to update tweet, Try again later")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, tweet, "Tweet updated successfully"))
})

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!req.user?._id) {
        throw new ApiError(400, "You must be authenticated to delete the tweet")
    }

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(404, "Comment not found")
    }

    const tweetDetails = await Tweet.findById(tweetId)

    const userId = new mongoose.Types.ObjectId(req.user?._id)

    if (!userId.equals(tweetDetails?.owner)) {
        throw new ApiError(404, "You are not authorized to delete this tweet")
    }

    const tweet = await Tweet.findByIdAndDelete(tweetDetails?._id)

    if (!tweet) {
        throw new ApiError(500, "Failed to delete tweet, Try again later")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, tweetId, "Tweet deleted successfully"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
