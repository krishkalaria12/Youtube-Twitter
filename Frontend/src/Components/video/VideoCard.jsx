import React from "react";
import { Link } from "react-router-dom";
import formatDateTime from "../../utils/CreatedAt";
import secondsToMinutesSeconds from "../../utils/Duration";

function VideoCard({ video, history = false }) {

    return (
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <div className="relative mb-2 w-full pt-[56%]">
                <Link to={`/watch/${video._id}`}>
                    <div className="absolute inset-0">
                        <img
                            src={video.thumbnail.url}
                            alt={video.title}
                            className="h-full w-full object-cover cursor-pointer"
                        />
                    </div>
                </Link>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm text-white">
                    {secondsToMinutesSeconds(video.duration)}
                </span>
            </div>
            <div className="flex gap-x-2 p-2">
                <div className="h-10 w-10 shrink-0">
                    <Link to={"/channel/" + video.owner._id}>
                        <img
                            src={history ? video.owner.avatar.url : video.ownerDetails.avatar.url}
                            alt={history ? video.title : video.ownerDetails.username}
                            className="h-full w-full rounded-full object-cover"
                        />
                    </Link>
                </div>
                <div className="w-full">
                    <h6 className="mb-1 font-semibold">{video.title}</h6>
                    {!history &&
                    <>
                        <p className="flex text-sm text-gray-500">
                        {video.views} Views, {formatDateTime(video.createdAt)} Ago
                        </p>
                        <Link to={`/channel/${history ? video.owner._id : video.ownerDetails._id}`}>
                            <p className="text-sm text-gray-500">{history ? video.owner.username : video.ownerDetails.username}</p>
                        </Link>
                    </>
                    }
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
