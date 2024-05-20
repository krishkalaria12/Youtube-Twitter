import React, { useEffect, useState } from 'react';
import HomeLayout from "../Layout/HomeLayout";
import axiosInstance from '../Helper/axiosInstance';
import ChannelCover from "../Components/channelPage/ChannelCover";
import ChannelHeading from "../Components/channelPage/ChannelHeading";
import ChannelListingVideo from "../Components/channelPage/ChannelListingVideo";
import ContentDescription from '../Components/contentPage/ContentDescription';
import PlayListPage from '../Components/Playlists/PlayListPage';
import TweetPage from '../Components/Tweets/TweetPage';
import { decodeToken } from '../utils/decodeToken';
import CreatePlaylistModal from '../Components/Playlists/CreatePlaylistModal';
import toast from 'react-hot-toast';
import ContentPageLoadingSkeleton from '../Components/ContentPageLoadingSkeleton';

function ContentPage() {
    const [isChannelLoading, setIsChannelLoading] = useState(true);
    const [selectedHeading, setSelectedHeading] = useState("Videos");
    
    const [channelStats, setChannelStats] = useState({});
    const [channelVideos, setChannelVideos] = useState([]);
    const [channelTweets, setChannelTweets] = useState([]);
    const [channelPlaylists, setChannelPlaylists] = useState([]);

    const [togglePlaylistCreation, setTogglePlaylistCreation] = useState(false);
    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);

    const channelId = decodeToken()._id;

    const fetchChannelVideos = async () => {
        try {
            const resStats = await axiosInstance.get("/dashboard/stats");
            const resVideos = await axiosInstance.get("/dashboard/videos");
            if (resStats.data.data && resVideos.data.data) {
                console.log("Stats:", resStats.data.data);
                console.log("Videos:", resVideos.data.data);
                setChannelStats(resStats.data.data);
                setChannelVideos(resVideos.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsChannelLoading(false);
        }
    }

    const getChannelTweets = async () => {
        try {
            const res = await axiosInstance.get(`/tweet/user/${channelId}`);
            if (res.data.data.length !== 0) {
                setChannelTweets(res.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsChannelLoading(false);
        }
    };

    const handleTweetCount = async (tweetId) => {
        try {
            const res = await axiosInstance.post(`/likes/toggle/t/${tweetId}`);
            if (res.data.data.length !== 0) {
                getChannelTweets();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleTweetSubmit = async (tweetContent) => {
        try {
            const content = {
                content: tweetContent
            }
            const res = await axiosInstance.post(`/tweet/`, content);
            if (res.data.data.length !== 0) {
                getChannelTweets();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getChannelPlaylists = async () => {
        try {
            const res = await axiosInstance.get(`/playlist/user/${channelId}`);
            if (res.data.data) {
                setChannelPlaylists(res.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsChannelLoading(false);
        }
    }

    const handleSelectHeading = (heading) => {
        setSelectedHeading(heading);
    };

    const createPlaylistToggle = () => {
        setTogglePlaylistCreation((prev) => !prev);
    }

    const handleCreatePlaylist = async (formdata) => {
        try {
            setIsCreatingPlaylist(true);
            const res = await axiosInstance.post("/playlist/", formdata);
            if (res.data.data) {
                console.log(res);
                getChannelPlaylists();
            }
        } catch (error) {
            console.log(error);
            toast.error("Couldn't Create Playlist! Try again Later")
        } finally {
            setIsCreatingPlaylist(false);
            setTogglePlaylistCreation(false);
        }
    }

    useEffect(() => {
        fetchChannelVideos();
        getChannelPlaylists();
        getChannelTweets();
    }, []);

    if (isChannelLoading) {
        return (
            <HomeLayout>
                <ContentPageLoadingSkeleton />
            </HomeLayout>
        )
    }

    const renderContent = () => {
        switch (selectedHeading) {
            case "Videos":
                return <ChannelListingVideo videos={channelVideos} />;
            case "Playlist":
                return <PlayListPage playlists={channelPlaylists} />;
            case "Tweets":
                return <TweetPage handleTweetSubmit={handleTweetSubmit} tweeting={true} tweets={channelTweets} handleTweetCount={handleTweetCount} />;
            default:
                return null;
        }
    };

    return (
        <HomeLayout>
            {channelStats.user && (
                <ChannelCover coverImage={channelStats.user.coverImage?.url} title={channelStats.user.fullName} />
            )}
            <div className="px-4 pb-4">
                {channelStats.user && (
                    <ContentDescription 
                        createPlaylistToggle={createPlaylistToggle}
                        avatar={channelStats.user.avatar} 
                        fullName={channelStats.user.fullName} 
                        username={channelStats.user.username} 
                        subscribersCount={channelStats.totalSubscribers} 
                        videosCount={channelStats.totalVideos} 
                    />
                )}
                <ChannelHeading selectedHeading={selectedHeading} onSelectHeading={handleSelectHeading} />
                {renderContent()}
            </div>
            {
                togglePlaylistCreation && <CreatePlaylistModal handleCreatePlaylist={handleCreatePlaylist} submitting={isCreatingPlaylist} togglePlaylistCreation={createPlaylistToggle} />
            }
        </HomeLayout>
    )
}

export default ContentPage;
