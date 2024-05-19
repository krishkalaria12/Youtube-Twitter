import React, { useState } from 'react';

function AddVideoModal({ videos, onClose, onAddVideo }) {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
    };

    const handleAddVideo = async () => {
        if (selectedVideo) {
            setIsSubmitting(true);
            await onAddVideo(selectedVideo._id);
            setIsSubmitting(false);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40">
            <div className="relative w-full max-w-lg bg-gray-900 rounded-lg shadow-lg p-6 text-white">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Add Video to Playlist</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {videos.length > 0 ? (
                        videos.map((video) => (
                            <div
                                key={video._id}
                                className={`flex items-center p-2 border rounded cursor-pointer transition-all ${
                                    selectedVideo && selectedVideo._id === video._id ? 'border-purple-500 bg-purple-900' : 'border-gray-700'
                                }`}
                                onClick={() => handleVideoSelect(video)}
                            >
                                <img
                                    src={video.thumbnail.url}
                                    alt={video.title}
                                    className="w-16 h-16 object-cover mr-4 rounded"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                                    <p className="text-sm text-gray-400">Views: {video.views}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <p className="text-lg font-semibold text-gray-400 mb-2">No videos available to add.</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                    )}
                </div>
                {videos.length > 0 && (
                    <button
                        onClick={handleAddVideo}
                        className={`mt-4 w-full py-2 rounded text-white ${selectedVideo ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-600 cursor-not-allowed'}`}
                        disabled={!selectedVideo || isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Add Video'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default AddVideoModal;
