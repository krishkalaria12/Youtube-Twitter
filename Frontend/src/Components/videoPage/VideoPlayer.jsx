import React from "react";
import ReactPlayer from 'react-player'
import VideoJS from "../../utils/VideoJSPlayer";

function VideoPlayer({videoFile, title, thumbnail, addtoWatchHistory}) {

  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: videoFile,
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };


  return (
    <div className="relative mb-4 w-full pt-[56%]">
      <div onClick={addtoWatchHistory} className="absolute inset-0">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
}

export default VideoPlayer;
