import React, { useState, useEffect } from 'react';
import HomeLayout from '../Layout/HomeLayout';
import axiosInstance from '../Helper/axiosInstance';
import VideoCard from "../Components/video/VideoCard";
import NoVideo from "../Components/NoVideo";

function WatchHistory() {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axiosInstance.get("/users/history");
                const res = await response;
                console.log(res);
                setVideos(res.data.data);
            } catch (error) {
                setIsError(true);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchVideos();
    }, []);

    if (isLoading) {
        return (
            <HomeLayout>
                <h1 className='font-bold text-3xl'>Loading</h1>
            </HomeLayout>
        );
    }

    if (isError) {
        return (
            <HomeLayout>
                <h1 className='font-bold text-3xl'>Something went wrong</h1>
            </HomeLayout>
        );
    }

    console.log(videos);

    return (
        <HomeLayout>
            <h1 className='font-bold text-3xl mx-4 mt-6'>Watch History</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {videos && videos.length > 0 ? (
                    videos.map((video) => <VideoCard history={true} key={video._id} video={video.videoDetails} />)
                ) : (
                    <NoVideo />
                )}
            </div>
        </HomeLayout>
    );
}

export default WatchHistory;
