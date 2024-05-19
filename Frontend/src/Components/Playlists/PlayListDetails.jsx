import React from "react";
import formatDateTime from "../../utils/CreatedAt";

function PlayListDetails({playlist}) {
  return (
    <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
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
                  {playlist.totalViews} Views ·{" "}{formatDateTime(playlist.createdAt)} Ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h6 className="mb-1 font-semibold">{playlist.name}</h6>
      <p className="flex text-sm text-gray-200">
        {playlist.description}
      </p>
      <div className="mt-6 flex items-center gap-x-3">
        <div className="h-16 w-16 shrink-0">
          <img
            src={playlist.owner.avatar.url}
            alt={playlist.owner.username}
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="w-full">
          <h6 className="font-semibold">{playlist.owner.fullName}</h6>
        </div>
      </div>
    </div>
  );
}

export default PlayListDetails;
