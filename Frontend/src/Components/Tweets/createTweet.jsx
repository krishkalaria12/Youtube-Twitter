import React, { useState } from 'react';

function CreateTweet({ handleTweetSubmit }) { 
    const [tweetContent, setTweetContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setTweetContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (tweetContent.trim()) {
            setIsSubmitting(true);
            handleTweetSubmit(tweetContent);
            setTweetContent('');
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-md">
            <textarea
                value={tweetContent}
                onChange={handleInputChange}
                placeholder="What's happening?"
                className="flex-grow w-full sm:w-2/3 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="3"
            />
            <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 ${!isSubmitting ? "bg-purple-500 text-white" : "bg-purple-300 text-gray-400"} rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500`}
            >
                {isSubmitting? 'Posting...' : 'Post'}
            </button>
        </form>
    );
}

export default CreateTweet;
