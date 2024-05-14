// SubscribedCard.jsx

import React from "react";

function SubscribedCard({ handleDeleteSubscribedChannel, channel }) {
    console.log(channel);

    if (!channel) {
        return null; // Return null or handle the case where channel is undefined
    }

    const { fullName, username, AvatarUrl, subscribersCount } = channel;

    return (
        <div className="flex w-full justify-between">
            <div className="flex items-center gap-x-2">
                <div className="h-14 w-14 shrink-0">
                    <img
                        src={AvatarUrl}
                        alt={username}
                        className="h-full w-full rounded-full"
                    />
                </div>
                <div className="block">
                    <h6 className="font-semibold text-gray-100">{fullName}</h6>
                    <p className="text-sm text-gray-300">{subscribersCount} Subscribers</p>
                </div>
            </div>
            <div className="block">
              <button
                onClick={() => handleDeleteSubscribedChannel(channel._id)}
                className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out sm:w-auto">
                  <span className="block">Subscribed</span>
              </button>
            </div>
        </div>
    );
}

export default SubscribedCard;
