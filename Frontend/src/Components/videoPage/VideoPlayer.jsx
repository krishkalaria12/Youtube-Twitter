import React from "react";

function VideoPlayer() {
  return (
    <div className="relative mb-4 w-full pt-[56%]">
      <div className="absolute inset-0">
        <video className="h-full w-full" controls="" autoPlay="" muted="">
          <source
            src="https://res.cloudinary.com/dfw5nnic5/video/upload/v1695117968/Sample_1280x720_mp4_b4db0s.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}

export default VideoPlayer;
