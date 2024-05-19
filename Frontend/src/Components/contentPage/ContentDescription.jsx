import React from "react";

function ContentDescription({fullName, username, avatar, subscribersCount, videosCount, createPlaylistToggle}) {
  return (
    <div className="flex flex-wrap gap-4 pb-4 pt-6">
      <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
        <img
          src={avatar.url}
          alt={username}
          className="h-full w-full"
        />
      </span>
      <div className="mr-auto inline-block">
        <h1 className="font-bolg text-xl">{fullName}</h1>
        <p className="text-sm text-gray-400">@{username}</p>
        <p className="text-sm text-gray-400">
          {subscribersCount} Subscribers&nbsp;·&nbsp;
          {videosCount} Videos
        </p>
      </div>
      <div className="inline-block">
        <div className="inline-flex min-w-[145px] justify-end">
              <button
                onClick={createPlaylistToggle}
                className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out sm:w-auto">
                Create Playlist
              </button>
        </div>
      </div>
    </div>
  );
}

export default ContentDescription;
