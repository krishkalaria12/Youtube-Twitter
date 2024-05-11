import React, { useEffect, useState } from "react";
import axiosInstance from "../Helper/axiosInstance";
import ChannelCover from "../Components/channelPage/ChannelCover";
import ChannelDescription from "../Components/channelPage/ChannelDescription";
import ChannelHeading from "../Components/channelPage/ChannelHeading";
import ChannelListingVideo from "../Components/channelPage/ChannelListingVideo";
import HomeLayout from "../Layout/HomeLayout";
import {useParams} from 'react-router-dom';

function ChannelDetail() {
    const {channelId} = useParams();

    const [channelDetails, setChannelDetails] = useState([]);
    const [Loading, setLoading] = useState(true);

    const getChannelStats = async () => {
        try {
            const res = await axiosInstance.get(`/users/channel/${channelId}`);
            if (res.data.data.length!=0) {
                setChannelDetails(res.data.data[0]);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    console.log(channelDetails);

    useEffect(() => {
        getChannelStats();
    },[])

    if (Loading) {
        return <h1 className='font-bold text-3xl'>Loading</h1>;
    }

    return (
        <HomeLayout>
            <ChannelCover title={channelDetails.title} coverImage={channelDetails.coverImage} />
            <div className="px-4 pb-4">
                <ChannelDescription channelDetails={channelDetails} />
                <ChannelHeading />
                <ChannelListingVideo videos={channelDetails.videos} />
            </div>
        </HomeLayout>
    );
}

export default ChannelDetail;
