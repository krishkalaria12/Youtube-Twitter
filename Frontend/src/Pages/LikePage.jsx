import React, {useState, useEffect} from 'react'
import HomeLayout from '../Layout/HomeLayout'
import axiosInstance from '../Helper/axiosInstance';
import VideoCard from "../Components/video/VideoCard";
import NoVideo from "../Components/NoVideo"

function LikePage() {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
                try {
                    const response = await axiosInstance.get("/likes/videos");
                    const res = await response;
                    console.log(res);
                    setVideos(res.data.data);
                } catch (error) {
                    setIsError(true);
                    console.log(error);
                }
                finally {
                    setIsLoading(false);
                }
            };
        fetchVideos();
        },
    []);

    if (isLoading) {
        return (
            <HomeLayout>
                <h1 className='font-bold text-3xl'>Loading</h1>;
            </HomeLayout>
        )
    }

    if (isError) {
        return (
            <HomeLayout>
                <h1 className='font-bold text-3xl'>Something went wrong</h1>;
            </HomeLayout>
        )
    }

    return (
        <HomeLayout>
            <h1 className='font-bold text-3xl mx-4 mt-6'>Liked Videos</h1>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
                {videos && videos.length > 0 ? (
                    videos.map((video) => <VideoCard key={video._id} video={video} />)
                ) : (
                    <NoVideo />
                )}
        </div>
        </HomeLayout>
    )
}

export default LikePage