import React, { useEffect, useState } from 'react'
import HomeLayout from "../Layout/HomeLayout"
import axiosInstance from '../Helper/axiosInstance';
import ChannelCover from "../Components/channelPage/ChannelCover";
import ChannelHeading from "../Components/channelPage/ChannelHeading";
import ChannelListingVideo from "../Components/channelPage/ChannelListingVideo";
import ContentDescription from '../Components/contentPage/ContentDescription';

function ContentPage() {

    const [channelVideos, setChannelVideos] = useState({});
    const [channelStats, setChannelStats] = useState([]);
    const [isChannelLoading, setIsChannelLoading] = useState(true);

    const fetchChannelVideos = async () => {
        try {
            const resStats = await axiosInstance.get("/dashboard/stats");
            const resVideos = await axiosInstance.get("/dashboard/videos");
            if (resStats && resVideos) {
                setChannelStats(resStats.data.data);
                setChannelVideos(resVideos.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsChannelLoading(false);
        }
    }

    useEffect(() => {
        fetchChannelVideos();
    }, []);

    if (isChannelLoading) {
        return (
            <HomeLayout>
                <p className='font-bold text-3xl'>Loading..</p>
            </HomeLayout>
        )
    }

    return (
        <HomeLayout>
            <ChannelCover coverImage={channelStats.user.coverImage.url} title={channelStats.user.fullName} />
            <div className="px-4 pb-4">
                <ContentDescription avatar={channelStats.user.avatar} fullName={channelStats.user.fullName} username={channelStats.user.username} subscribersCount={channelStats.totalSubscribers} videosCount={channelStats.totalVideos} />
                <ChannelHeading />
                <ChannelListingVideo videos={channelVideos} />
            </div>
        </HomeLayout>
    )
}

export default ContentPage