import React from "react";
import formatDateTime from "../../utils/CreatedAt"
import { Link } from "react-router-dom";
import secondsToMinutesSeconds from "../../utils/Duration";
import getTimeAgo from "../../utils/getTimeAgo";

function ChannelVideos({ videos, channel=false }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
      {videos.map((video) => (
        <div className="w-full" key={video._id}>
          <Link to={`/watch/${video._id}`}>
            <div className="relative mb-2 w-full pt-[56%]">
              <div className="absolute inset-0">
                <img
                  src={video.thumbnail.url}
                  alt={video.title}
                  className="h-full w-full"
                />
              </div>
              <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                {secondsToMinutesSeconds(video.duration)}
              </span>
            </div>
          </Link>
          <h6 className="mb-1 font-semibold">
            {video.title}
          </h6>
          <p className="flex text-sm text-gray-200">
            {video.views} Views | {!channel? getTimeAgo(video.createdAt) : formatDateTime(video.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ChannelVideos;
