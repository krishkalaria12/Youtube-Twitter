import React from "react";
import ChannelEmptyVideo from "./ChannelEmptyVideo";
import ChannelVideos from "./ChannelVideos";

function ChannelListingVideo({videos, channel=false}) {
  return (
    videos.length==0 ? <ChannelEmptyVideo /> : <ChannelVideos channel={channel} videos={videos} />
  );
}

export default ChannelListingVideo;
