import React from "react";
import { Link } from "react-router-dom";
import formatDateTime from "../../utils/CreatedAt";
import secondsToMinutesSeconds from "../../utils/Duration";

function VideoCard({ video }) {

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <div className="relative mb-2 w-full pt-[56%]">
        <Link to={`/watch/${video._id}`}>
          <div className="absolute inset-0">
            <img
              src={video.thumbnail.url}
              alt={video.title}
              className="h-full w-full cursor-pointer"
            />
          </div>
        </Link>
        <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
          {secondsToMinutesSeconds(video.duration)}
        </span>
      </div>
      <div className="flex gap-x-2">
        <div className="h-10 w-10 shrink-0">
          <img
            src={video.ownerDetails.avatar.url}
            alt={video.ownerDetails.username}
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="w-full">
          <h6 className="mb-1 font-semibold">{video.title}</h6>
          <p className="flex text-sm text-gray-200">
            {video.__v} Views, {formatDateTime(video.createdAt)} Ago
          </p>
          <Link to={`/channel/${video.ownerDetails._id}`}>
            <p className="text-sm text-gray-200">{video.ownerDetails.username}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
