// SubscribedChannels.jsx

import React, { useState, useEffect } from 'react';
import SubscribedCard from '../Components/subscribedPage/subscribedCard';
import HomeLayout from '../Layout/HomeLayout';
import axiosInstance from '../Helper/axiosInstance';
import NoChannelSubscribed from '../Components/subscribedPage/NoChannelSubscribed';
import toast from 'react-hot-toast';

function SubscribedChannels() {
    const [subscribedChannels, setSubscribedChannels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchSubscribedChannels = async () => {
            try {
                const response = await axiosInstance.get("subscriptions/subscriptions");
                console.log(response);
                setSubscribedChannels(response.data.data);
            } catch (error) {
                setIsError(true);
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchSubscribedChannels();
    }, []);

    const handleDeleteSubscribedChannel = async (id) => {
        try {
            await axiosInstance.post(`/subscriptions/c/${id}`);
            setSubscribedChannels(subscribedChannels.filter((channel) => channel._id!== id));
            toast.success('Channel unsubscribed successfully');
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return (
            <HomeLayout>
                <h1 className='font-bold text-3xl'>Loading</h1>
            </HomeLayout>
        )
    }

    console.log(subscribedChannels);

    return (
        <HomeLayout>
            <h1 className='font-bold text-3xl mx-4 mb-6 mt-6'>Subscribed Channels</h1>
            <div
                className={`${
                subscribedChannels.length > 0
                    ? "grid grid-cols-2 gap-4 items-start p-4 w-full justify-center"
                    : "flex items-center justify-center min-w-full min-h-[80%]"
                }`}>
                {Array.isArray(subscribedChannels) && subscribedChannels.length > 0 ? (
                    subscribedChannels.map((channel) => (
                        <SubscribedCard
                            key={channel._id}
                            channel={channel}
                            handleDeleteSubscribedChannel={handleDeleteSubscribedChannel}
                        />
                    ))
                ) : (
                    <NoChannelSubscribed />
                )}
            </div>
        </HomeLayout>
    )
}

export default SubscribedChannels;
