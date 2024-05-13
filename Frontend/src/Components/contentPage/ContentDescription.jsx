import React from "react";

function ContentDescription({fullName, username, avatar, subscribersCount, videosCount}) {
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
    </div>
  );
}

export default ContentDescription;
