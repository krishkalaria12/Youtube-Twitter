import React, { useState } from 'react';
import formatDateTime from '../../utils/CreatedAt';
import secondsToMinutesSeconds from '../../utils/Duration';
import { Link } from 'react-router-dom';

function PlaylistVideoCard({ video, onRemove }) {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemove = async () => {
        setIsRemoving(true);
        try {
            await onRemove(video._id);
        } catch (error) {
            console.error('Failed to remove video:', error);
        } finally {
            setIsRemoving(false);
        }
    };

    return (
        <div className="border bg-gray-800 text-white rounded-md p-2 mb-2">
            <div className="w-full max-w-3xl gap-x-4 sm:flex">
                <div className="relative mb-2 w-full sm:mb-0 sm:w-5/12">
                    <Link to={`/watch/${video._id}`}>
                        <div className="w-full pt-[56%]">
                            <div className="absolute inset-0">
                                <img
                                    src={video.thumbnail.url}
                                    alt={video.title}
                                    className="h-full w-full object-cover rounded-md"
                                />
                            </div>
                            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                                {secondsToMinutesSeconds(video.duration)}
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="flex gap-x-2 px-2 sm:w-7/12 sm:px-0">
                    <div className="w-full">
                        <h6 className="mb-1 font-semibold sm:max-w-[75%]">{video.title}</h6>
                        <p className="flex text-sm text-gray-400 sm:mt-3">
                            {video.views} Views · {formatDateTime(video.createdAt)} ago
                        </p>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={handleRemove}
                            className={`ml-4 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded ${isRemoving ? 'cursor-not-allowed' : ''}`}
                            disabled={isRemoving}
                        >
                            {isRemoving ? 'Removing...' : 'Remove'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaylistVideoCard;
