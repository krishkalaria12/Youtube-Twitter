import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideoById } from '../Redux/features/VideoSlice';
import Video from "../Components/videoPage/video"
import NoVideo from "../Components/NoVideo"
import HomeLayout from '../Layout/HomeLayout';

function VideoPageDetail() {
    const { videoId } = useParams();
    const dispatch = useDispatch();
    const { selectedVideo, loading, error } = useSelector((state) => state.video);

    useEffect(() => {
        dispatch(getVideoById(videoId));
    }, [dispatch, videoId]);

    return (
        <HomeLayout>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <NoVideo />
                ) : (
                    selectedVideo && <Video video={selectedVideo} />
                )}
            </div>
        </HomeLayout>
    );
}

export default VideoPageDetail;
