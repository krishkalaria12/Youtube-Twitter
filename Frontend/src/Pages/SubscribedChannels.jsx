// SubscribedChannels.jsx

import React, { useState, useEffect } from 'react';
import SubscribedCard from '../Components/subscribedPage/subscribedCard';
import HomeLayout from '../Layout/HomeLayout';
import axiosInstance from '../Helper/axiosInstance';
import NoChannelSubscribed from '../Components/subscribedPage/NoChannelSubscribed';
import toast from 'react-hot-toast';
import ServerError from './ServerError';

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

    const renderSkeleton = () => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded shadow">
                        <div className="w-24 h-6 bg-gray-700 rounded animate-pulse"></div>
                        <div className="mt-2 w-20 h-4 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                ))}
            </div>
    );

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
                {renderSkeleton()}
            </HomeLayout>
        )
    }

    if (isError) {
        return (
            <HomeLayout>
                <ServerError />
            </HomeLayout>
        )
    }

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
