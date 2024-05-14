import React from "react";
import ReactPlayer from 'react-player'

function VideoPlayer({videoFile, title, thumbnail, addtoWatchHistory}) {
  return (
    <div className="relative mb-4 w-full pt-[56%]">
      <div onClick={addtoWatchHistory} className="absolute inset-0">
        <ReactPlayer 
          config={{ file: { 
            attributes: {
              controlsList: 'nodownload'
            }
          }}}
          controls playing width='100%' height='100%' light={thumbnail} className="w-full" url={videoFile} />
      </div>
    </div>
  );
}

export default VideoPlayer;
