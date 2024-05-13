import React from "react";

function ChannelCover({coverImage, title}) {
    return (
        <div className="relative min-h-[150px] w-full pt-[16.28%]">
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={coverImage}
                    alt={title}
                />
            </div>
        </div>
    );
}

export default ChannelCover;
