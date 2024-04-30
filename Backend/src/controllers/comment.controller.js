import mongoose, { isValidObjectId } from "mongoose"
import {Comment} from "../models/comment.models.js"
import { Video } from "../models/video.models.js"
import { Like } from "../models/like.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    
    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }  

    const commentAggregate = await Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "comment",
                as: "likes"
            }
        },
        {
            $addFields: {
                likesCount: {
                    $size: "$likes"
                },
                owner: {
                    $first: "$owner"
                },
                isLiked: {
                    $cond: {
                        if: { $in: [req.user?._id, "$likes.likedBy"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $project: {
                content: 1,
                createdAt: 1,
                likesCount: 1,
                owner: {
                    username: 1,
                    fullName: 1,
                    "avatar.url": 1
                },
                isLiked: 1
            }
        }
    ]);

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    };

    const comments = await Comment.aggregatePaginate(commentAggregate, options);

    return res
        .status(200)
        .json(new ApiResponse(200, comments, "Video Comments fetched successfully"));

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
    
    const owner = {
        0: {
            avatar: {
                url: req.user.avatar.url
            },
            username: req.user.username,
        }
    }
    
    const response = {
        _id: comment._id,
        content: comment.content,
        createdAt: comment.createdAt,
        owner: owner
    };

    return res
        .status(201)
        .json(new ApiResponse(201, response, "Commented Added Successfully"))
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

    const userId = new mongoose.Types.ObjectId(req.user?._id)
    
    if (!userId.equals(commentDetails?.owner)) {
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

    if (!req.user?._id) {
        throw new ApiError(400, "You must be authenticated to delet the comment")
    }

    if (!isValidObjectId(commentId)) {
        throw new ApiError(404, "Comment not found")
    }

    const commentDetails = await Comment.findById(commentId)

    const userId = new mongoose.Types.ObjectId(req.user?._id)

    if (!userId.equals(commentDetails?.owner)) {
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
