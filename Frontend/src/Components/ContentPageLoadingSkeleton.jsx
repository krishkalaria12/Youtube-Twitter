import React from 'react';

function ContentPageLoadingSkeleton() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-6xl">
                {/* ContentDescription skeleton */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-8">
                    {/* Avatar skeleton */}
                    <div className="w-16 h-16 bg-gray-700 rounded-full mb-4 animate-pulse"></div>

                    <div className="flex flex-col flex-grow">
                        {/* Full name skeleton */}
                        <div className="w-full h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>

                        {/* Username skeleton */}
                        <div className="w-full h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>

                        {/* Subscribers count skeleton */}
                        <div className="w-1/4 h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>

                        {/* Videos count skeleton */}
                        <div className="w-1/4 h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
                    </div>
                </div>

                {/* ChannelHeading skeleton */}
                <div className="w-1/4 h-6 bg-gray-700 rounded mb-8 animate-pulse"></div>

                {/* Tabs skeleton */}
                <div className="flex gap-4 mb-8">
                    <div className="w-1/4 h-8 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-1/4 h-8 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-1/4 h-8 bg-gray-700 rounded animate-pulse"></div>
                </div>

                {/* ChannelListingVideo skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Video 1 skeleton */}
                    <div className="w-full bg-gray-700 rounded animate-pulse">
                        <div className="aspect-w-16 aspect-h-9"></div>
                    </div>

                    {/* Video 2 skeleton */}
                    <div className="w-full bg-gray-700 rounded animate-pulse">
                        <div className="aspect-w-16 aspect-h-9"></div>
                    </div>

                    {/* Video 3 skeleton */}
                    <div className="w-full bg-gray-700 rounded animate-pulse">
                        <div className="aspect-w-16 aspect-h-9"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentPageLoadingSkeleton;
