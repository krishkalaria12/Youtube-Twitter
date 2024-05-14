import mongoose, {isValidObjectId} from "mongoose"
import { User } from "../models/user.models.js"
import { Subscription } from "../models/subscription.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, 'Invalid channel ID');
    }

    const isSubscribed = await Subscription.findOne({
        subscriber: req.user?._id,
        channel: channelId,
    });

    if (isSubscribed) {
        await Subscription.findByIdAndDelete(isSubscribed?._id);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { subscribed: false },
                    "unsubscribed successfully"
                )
            );
    }

    await Subscription.create({
        subscriber: req.user?._id,
        channel: channelId,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { subscribed: true },
                "subscribed successfully"
            )
        );
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, 'Invalid Channel ID')
    }

    const getSubscribers = await Subscription.aggregate([
        {
            $match: {
                channel: new mongoose.Types.ObjectId(channelId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "subscriber",
                foreignField: "_id",
                as: "subscriber",

                // Example: Let's say you want to get details about the subscribers of a particular channel. The $lookup stage fetches the user details for each subscriber, and within its pipeline, it checks if each subscriber has also subscribed to the same channel. This is done by looking at the "subscriptions" collection again to find records where the subscriber's ID matches the channel ID.

                pipeline: [
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "channel",
                            as: "subscribedToSubscriber",
                        },
                    },
                    {
                        $addFields: {
                            subscribedToSubscriber: {
                                $cond: {
                                    if: {
                                        $in: [
                                            channelId,
                                            "$subscribedToSubscriber.subscriber",
                                        ],
                                    },
                                    then: true,
                                    else: false,
                                },
                            },
                            subscribersCount: {
                                $size: "$subscribedToSubscriber",
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$subscriber",
        },
        {
            $project: {
                _id: 0,
                subscriber: {
                    _id: 1,
                    username: 1,
                    fullName: 1,
                    "avatar.url": 1,
                    subscribedToSubscriber: 1,
                    subscribersCount: 1,
                },
            },
        },
    ]);

    return res
    .status(200)
    .json(
        new ApiResponse(200, getSubscribers, "Fetched channel subscribers successfully")
    )
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const subscriberId = req.user?._id;

    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(401, "Not authorized to fetch channels");
    }

    const subscribedChannels = await Subscription.aggregate([
        {
            $match: {
                subscriber: new mongoose.Types.ObjectId(subscriberId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "channel",
                foreignField: "_id",
                as: "channelDetails",
            },
        },
        {
            $unwind: "$channelDetails",
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "channelDetails._id",
                foreignField: "channel",
                as: "subscribers",
            },
        },
        {
            $project: {
                _id: "$channelDetails._id",
                fullName: "$channelDetails.fullName",
                username: "$channelDetails.username",
                AvatarUrl: "$channelDetails.avatar.url",
                subscribersCount: { $size: "$subscribers" },
            },
        },
    ]);

    if (!subscribedChannels) {
        throw new ApiError(404, "Couldn't fetch subscribed channels");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            subscribedChannels,
            "Subscribed channels fetched successfully"
        )
    );
});


export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}