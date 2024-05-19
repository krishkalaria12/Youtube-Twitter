import mongoose, {isValidObjectId} from "mongoose"
import { Like } from "../models/like.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params

    if (!req.user?._id) {
        throw new ApiError(400, "You must be authenticated to like the video")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id")
    }

    const likedAlready = await Like.findOne({
        video: videoId,
        likedBy: req.user?._id,
    });

    if (likedAlready) {
        await Like.findByIdAndDelete(likedAlready._id)

        return res
            .status(200)
            .json(new ApiResponse(200, { isLiked: false }));
    }

    await Like.create({
        video: videoId,
        likedBy: req.user?._id,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, { isLiked: true }));
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params

    if (!req.user?._id) {
        throw new ApiError(400, "You must be authenticated to like the video")
    }

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id")
    }

    const likedAlready = await Like.findOne({
        comment: commentId,
        likedBy: req.user?._id,
    });

    if (likedAlready) {
        await Like.findByIdAndDelete(likedAlready._id)

        return res
            .status(200)
            .json(new ApiResponse(200, { isLiked: false }));
    }

    await Like.create({
        comment: commentId,
        likedBy: req.user?._id,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, { isLiked: true }));

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweetId");
    }


    const likedAlready = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user?._id,
    });

    if (likedAlready) {
        await Like.findByIdAndDelete(likedAlready?._id);

        return res
            .status(200)
            .json(new ApiResponse(200, { tweetId, isLiked: false }));
    }

    await Like.create({
        tweet: tweetId,
        likedBy: req.user?._id,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {tweetId, isLiked: true }));
});

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos

    const userid = req.user?._id;

    if (!userid) {
        throw new ApiError(404,"No userid available")
    }

    const likedVideos = await Like.aggregate([
        {
            $match: {
                likedBy: new mongoose.Types.ObjectId(userid),
            },
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "likedVideo",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "ownerDetails",
                        },
                    },
                    {
                        $unwind: "$ownerDetails",
                    },
                    {
                        $project: {
                            _id: 1,
                            "videoFile.url": 1,
                            "thumbnail.url": 1,
                            owner: 1,
                            title: 1,
                            description: 1,
                            views: 1,
                            duration: 1,
                            createdAt: 1,
                            isPublished: 1,
                            ownerDetails: {
                                username: 1,
                                fullName: 1,
                                "avatar.url": 1,
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$likedVideo",
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $replaceRoot: { newRoot: "$likedVideo" },
        },
    ]);


    if (!likedVideos) {
        throw new ApiError(400, "No Liked videos found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                likedVideos,
                "liked videos fetched successfully"
            )
        );
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}

// $unwind example

// After the initial $match and $lookup stages, the document might look like this:
// {
//     "_id": ObjectId("likeId"),
//     "likedBy": ObjectId("userId"),
//     "video": ObjectId("videoId"),
//     "createdAt": ISODate("2024-03-11T12:00:00Z"),
//     "likedVideo": [
//       {
//         "_id": ObjectId("videoId"),
//         "videoFile": { "url": "video-url" },
//         "thumbnail": { "url": "thumbnail-url" },
//         "owner": ObjectId("ownerId"),
//         "title": "Video Title",
//         "description": "Video Description",
//         "views": 1000,
//         "duration": 180,
//         "createdAt": ISODate("2024-03-10T10:00:00Z"),
//         "isPublished": true,
//         "ownerDetails": {
//           "username": "ownerUsername",
//           "fullName": "Owner Full Name",
//           "avatar": { "url": "avatar-url" }
//         }
//       }
//       // Potentially more videos if there are multiple likes for the same user
//     ]
//   }

// Now, let's consider the effect of the $unwind stage:
//   [
//     {
//       "_id": ObjectId("likeId"),
//       "likedBy": ObjectId("userId"),
//       "video": ObjectId("videoId"),
//       "createdAt": ISODate("2024-03-11T12:00:00Z"),
//       "likedVideo": {
//         "_id": ObjectId("videoId"),
//         "videoFile": { "url": "video-url" },
//         "thumbnail": { "url": "thumbnail-url" },
//         "owner": ObjectId("ownerId"),
//         "title": "Video Title",
//         "description": "Video Description",
//         "views": 1000,
//         "duration": 180,
//         "createdAt": ISODate("2024-03-10T10:00:00Z"),
//         "isPublished": true,
//         "ownerDetails": {
//           "username": "ownerUsername",
//           "fullName": "Owner Full Name",
//           "avatar": { "url": "avatar-url" }
//         }
//       }
//     }
//     // Potentially more documents if there are multiple likes for the same user
//   ]