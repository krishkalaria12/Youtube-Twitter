import React from "react";
import { Link } from "react-router-dom";

function VideoCard({ video }) {

  function secondsToMinutesSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = parseInt(seconds % 60);
    return minutes + ":" + remainingSeconds;
  }

  function formatDateTime(dateString) {
    var date = new Date(dateString);
    var currentDate = new Date();
    var timeDiff = currentDate - date;
    var secondsDiff = Math.floor(timeDiff / 1000);
    var minutesDiff = Math.floor(secondsDiff / 60);
    var hoursDiff = Math.floor(minutesDiff / 60);
    var daysDiff = Math.floor(hoursDiff / 24);
    var monthsDiff = Math.floor(daysDiff / 30);
    var yearsDiff = Math.floor(monthsDiff / 12);

    if (yearsDiff >= 1) {
        return yearsDiff + " year" + (yearsDiff > 1 ? "s" : "");
    } else if (monthsDiff >= 1) {
        return monthsDiff + " month" + (monthsDiff > 1 ? "s" : "");
    } else if (daysDiff >= 1) {
        return daysDiff + " day" + (daysDiff > 1 ? "s" : "");
    } else if (hoursDiff >= 1) {
        return hoursDiff + " hour" + (hoursDiff > 1 ? "s" : "");
    } else if (minutesDiff >= 1) {
        return minutesDiff + " minute" + (minutesDiff > 1 ? "s" : "");
    } else {
        return secondsDiff + " second" + (secondsDiff > 1 ? "s" : "");
    }
  }

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
          <p className="text-sm text-gray-200">{video.ownerDetails.username}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
