import React from 'react';

function VideoLoadingSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <div className="w-full max-w-screen-lg p-4">
                <div className="bg-gray-800 aspect-w-16 aspect-h-9 mb-4"></div>
                
                {/* Video details skeleton */}
                <div className="bg-gray-800 p-4 mb-4">
                    {/* Title skeleton */}
                    <div className="w-3/4 h-8 mb-4 bg-gray-700 rounded"></div>

                    {/* Description skeleton */}
                    <div className="w-full h-16 mb-4 bg-gray-700 rounded"></div>

                    {/* Action buttons skeleton */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-700 rounded-full mr-2"></div>
                            <div className="w-20 h-6 bg-gray-700 rounded"></div>
                        </div>
                        <div className="w-20 h-6 bg-gray-700 rounded"></div>
                    </div>
                </div>
                
                {/* Comment section skeleton */}
                <div className="bg-gray-800 p-4 mb-4">
            {/* Title skeleton */}
            <div className="w-1/3 h-6 mb-4 bg-gray-700 rounded"></div>

            {/* Comments skeleton */}
            <div className="grid grid-cols-1 gap-2">
                {/* Comment skeleton */}
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-700 rounded-full mr-2"></div>
                    <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
                </div>
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-700 rounded-full mr-2"></div>
                    <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
                </div>
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-700 rounded-full mr-2"></div>
                    <div className="w-2/3 h-4 bg-gray-700 rounded"></div>
                </div>
            </div>
        </div>
                
                {/* Related videos skeleton */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded shadow"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VideoLoadingSkeleton;
