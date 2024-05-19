import React from "react";
import formatDateTime from "../../utils/CreatedAt";
import { Link } from "react-router-dom";

function PlayListCard({ playlist }) {
  return (
    <div className="w-full">
      <Link to={"/playlist/" + playlist._id}>
        <div className="relative mb-2 w-full pt-[56%]">
          <div className="absolute inset-0">
            <img
              src={playlist.thumbnail.url}
              alt={playlist.name}
              className="h-full w-full"
            />
            <div className="absolute inset-x-0 bottom-0">
              <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                <div className="relative z-[1]">
                  <p className="flex justify-between">
                    <span className="inline-block">Playlist</span>
                    <span className="inline-block">{playlist.totalVideos} videos</span>
                  </p>
                  <p className="text-sm text-gray-200">
                    {playlist.totalViews} Views · {formatDateTime(playlist.createdAt)} Ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <h6 className="mb-1 font-semibold">{playlist.name}</h6>
      <p className="flex text-sm text-gray-200">
        {playlist.description}
      </p>
    </div>
  );
}

export default PlayListCard;
