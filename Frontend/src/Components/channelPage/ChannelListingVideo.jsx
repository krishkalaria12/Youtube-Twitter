import React from "react";
import ChannelEmptyVideo from "./ChannelEmptyVideo";
import ChannelVideos from "./ChannelVideos";

function ChannelListingVideo({videos}) {
  return (
    videos.length==0 ? <ChannelEmptyVideo /> : <ChannelVideos videos={videos} />
  );
}

export default ChannelListingVideo;
