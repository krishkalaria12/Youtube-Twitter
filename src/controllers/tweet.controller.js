import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
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

    if ((tweetDetails?.owner.toString() !== req.user?._id)) {
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
    const { content } = req.body;

    if (!req.user?._id) {
        throw new ApiError(400, "You must be authenticated to delete the tweet")
    }

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(404, "Comment not found")
    }

    if (!content) {
        throw new ApiError(404, "Content is required")
    }

    const tweetDetails = await Tweet.findById(tweetId)

    if ((tweetDetails?.owner.toString() !== req.user?._id)) {
        throw new ApiError(404, "You are not authorized to update this tweet")
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
