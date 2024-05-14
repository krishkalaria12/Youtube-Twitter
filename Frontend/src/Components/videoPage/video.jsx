import React, {useState} from 'react'
import RelatedVideoCard from "./RelatedVideoCard"
import CommentSection from './CommentSection'
import VideoDetails from "./VideoDetails"
import VideoPlayer from "./VideoPlayer"
import axiosInstance from '../../Helper/axiosInstance'
import toast from 'react-hot-toast'

function Video({video, videoId}) {
  const [comments, setComments] = useState(video?.video?.comments || []);
  const [isSubscribed, setIsSubscribed] = useState(video?.video?.owner?.isSubscribed || false);
  const [subscribersCount, setSubscribersCount] = useState(video?.video?.owner?.subscribersCount || 0);
  const [TotalLikes, setTotalLikes] = useState(video?.video?.likesCount || 0);
  const [isLiked, setIsLiked] = useState(video?.video?.isLiked || false);
  const [historyId, setHistoryId] = useState(videoId);

  const handleCommentSubmit = async(newComment, videoId) => {
    const res = await axiosInstance.post(`/comment/v/${videoId}`, { content: newComment })

    if (res?.data.success) {
      toast.success(res.data.message)
      setComments([...comments, res.data.data]);
    }
  };

  const handleToggleSubscription = async (channelId) => {
    try {
      const res = await axiosInstance.post(`/subscriptions/c/${channelId}`);

      if (res?.data.success) {
        toast.success(res.data.message);
        setIsSubscribed(res.data.data.subscribed)
        if (res.data.data.subscribed) {
          setSubscribersCount(subscribersCount+1);
        } else {
          setSubscribersCount(subscribersCount-1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLikesCount = async (videoId) => {
    try {
      const res = await axiosInstance.post(`/likes/toggle/v/${videoId}`);

      if (res?.data.success) {
        toast.success(res.data.message);
        setIsLiked(res.data.data.isLiked)
        if (res.data.data.isLiked) {
          setTotalLikes(TotalLikes+1);
          setIsLiked(res.data.data.isLiked);
        } else {
          setTotalLikes(TotalLikes-1);
          setIsLiked(res.data.data.isLiked);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addtoWatchHistory = async () => {
    try {
      const resHistory = await axiosInstance.post(`/video/watch-history/v/${historyId}`);
      const resView = await axiosInstance.post(`/video/view/v/${historyId}`);
    }
    catch(error) {
      console.log(error);
    }
  }

  if (!video) {
    return <h1 className='font-bold text-3xl'>Loading</h1>;
  }

  return (
    <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <div className="col-span-12 w-full">
          <VideoPlayer addtoWatchHistory={addtoWatchHistory} title={video.video.title} thumbnail={video.video.thumbnail.url} videoFile={video.video.videoFile.url} />
          <VideoDetails videoId={video.video._id} handleLikesCount={handleLikesCount} subscribersCount={subscribersCount} toggleSubscription={handleToggleSubscription} subscribed={isSubscribed} owner={video.video.owner} description={video.video.description} isLiked={isLiked} likesCount={TotalLikes} title={video.video.title} createdAt={video.video.createdAt} />
          <CommentSection videoId={video.video._id} onCommentSubmit={handleCommentSubmit} comments={comments} />
        </div>
        <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
          {video.allVideos && video.allVideos.map((videoDetails) => (
            <RelatedVideoCard videoId={videoDetails._id} avatar={videoDetails.ownerDetails.avatar.url} key={videoDetails._id} createdAt={videoDetails.createdAt} duration={videoDetails.duration} thumbnail={videoDetails.thumbnail.url} title={videoDetails.title} owner={videoDetails.ownerDetails.username} views={videoDetails._v} />
          ))}
        </div>
      </div>
  )
}

export default Video