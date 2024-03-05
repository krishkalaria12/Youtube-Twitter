import mongoose from "mongoose"
import {Comment} from "../models/comment.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { content } = req.body;

    if (!req.user?._id) {
        throw new ApiError(400, "You must be authenticated to add comment on the video")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(404, "Video not found")
    }

    if (!content) {
        throw new ApiError(404, "Content is required")
    }

    const comment = await Comment.create({
        video: videoId,
        content,
        owner: req.user?._id,
    })

    if (!comment) {
        throw new ApiError(500, "Failed to add comment, Try again later")
    }

    return res
        .status(201)
        .json(new ApiResponse(201, comment, "Commented Added Successfully"))
})

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!req.user?._id) {
        throw new ApiError(400, "You must be authenticated to update comment on the video")
    }

    if (!isValidObjectId(commentId)) {
        throw new ApiError(404, "Comment not found")
    }

    if (!content) {
        throw new ApiError(404, "Content is required")
    }

    const commentDetails = await Comment.findById(commentId)

    if ((commentDetails?.owner.toString() !== req.user?._id)) {
        throw new ApiError(404, "You are not authorized to update this comment")
    }

    const comment = await Comment.findByIdAndUpdate(commentDetails?._id, {
        $set: {
            content
        }
    }, {new: true})

    if (!comment) {
        throw new ApiError(500, "Failed to update comment, Try again later")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, comment, "Comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!req.user?._id) {
        throw new ApiError(400, "You must be authenticated to delet the comment")
    }

    if (!isValidObjectId(commentId)) {
        throw new ApiError(404, "Comment not found")
    }

    if (!content) {
        throw new ApiError(404, "Content is required")
    }

    const commentDetails = await Comment.findById(commentId)

    if ((commentDetails?.owner.toString() !== req.user?._id)) {
        throw new ApiError(404, "You are not authorized to update this comment")
    }

    const comment = await Comment.findByIdAndDelete(commentDetails?._id)

    await Like.deleteMany({
        comment: commentId,
        likedBy: req.user
    });

    if (!comment) {
        throw new ApiError(500, "Failed to delete comment, Try again later")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, commentId, "Comment deleted successfully"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
}
