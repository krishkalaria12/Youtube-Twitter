// ChannelDetail.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../Helper/axiosInstance";
import ChannelCover from "../Components/channelPage/ChannelCover";
import ChannelDescription from "../Components/channelPage/ChannelDescription";
import ChannelHeading from "../Components/channelPage/ChannelHeading";
import ChannelListingVideo from "../Components/channelPage/ChannelListingVideo";
import HomeLayout from "../Layout/HomeLayout";
import { useParams } from 'react-router-dom';
import TweetPage from "../Components/Tweets/TweetPage";
import { decodeToken } from "../utils/decodeToken";
import toast from "react-hot-toast";
import PlayListPage from "../Components/Playlists/PlayListPage";
import ContentPageLoadingSkeleton from "../Components/ContentPageLoadingSkeleton";

function ChannelDetail() {
    const { channelId } = useParams();
    const [loading, setLoading] = useState(true);
    const [selectedHeading, setSelectedHeading] = useState("Videos");

    const userId = decodeToken()._id;
    
    const [channelDetails, setChannelDetails] = useState({});
    const [channelTweets, setChannelTweets] = useState([]);
    const [channelPlaylists, setChannelPlaylists] = useState([]);


    const getChannelStats = async () => {
        try {
            const res = await axiosInstance.get(`/users/channel/${channelId}`);
            if (res.data.data.length !== 0) {
                setChannelDetails(res.data.data[0]);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getChannelTweets = async () => {
        try {
            const res = await axiosInstance.get(`/tweet/user/${channelId}`);
            if (res.data.data.length !== 0) {
                setChannelTweets(res.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleTweetCount = async(tweetId) => {
        try {
            const res = await axiosInstance.post(`/likes/toggle/t/${tweetId}`);
            if (res.data.data.length !== 0) {
                getChannelTweets();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const toggleSubscription = async () => {
        try {
            const res = await axiosInstance.post(`/subscriptions/c/${channelId}`);
            if (res.data) {
                setChannelDetails((prevDetails) => ({
                    ...prevDetails,
                    isSubscribed: !prevDetails.isSubscribed,
                    subscribersCount: prevDetails.isSubscribed ? prevDetails.subscribersCount - 1 : prevDetails.subscribersCount + 1
                }));
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to Subscribe the Channel, Try Again Later")
        }
    }

    const getChannelPlaylists = async () => {
        try {
            const res = await axiosInstance.get(`/playlist/user/${channelId}`);
            if (res.data.data) {
                setChannelPlaylists(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getChannelStats();
        getChannelPlaylists();
        getChannelTweets();
    }, [channelId]);


    const handleSelectHeading = (heading) => {
        setSelectedHeading(heading);
    };

    if (loading) {
        return (
            <HomeLayout>
                <ContentPageLoadingSkeleton />
            </HomeLayout>
        )
    }

    const renderContent = () => {
        switch (selectedHeading) {
            case "Videos":
                return <ChannelListingVideo channel={true} videos={channelDetails.videos} />;
            case "Playlist":
                return <PlayListPage playlists={channelPlaylists} />;
            case "Tweets":
                return <TweetPage tweets={channelTweets} handleTweetCount={handleTweetCount} />;
            default:
                return null;
        }
    };

    return (
        <HomeLayout>
            <ChannelCover title={channelDetails.title} coverImage={channelDetails.coverImage?.url} />
            <div className="px-4 pb-4">
                <ChannelDescription toggleSubscription={toggleSubscription} channelDetails={channelDetails} />
                <ChannelHeading selectedHeading={selectedHeading} onSelectHeading={handleSelectHeading} />
                {renderContent()}
            </div>
        </HomeLayout>
    );
}

export default ChannelDetail;
