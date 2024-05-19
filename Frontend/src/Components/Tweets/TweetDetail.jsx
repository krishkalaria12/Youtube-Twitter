import React from 'react'
import formatDateTime from '../../utils/CreatedAt'

function TweetDetail({tweet, handleTweetCount}) {
    return (
        <div className="flex gap-3 w-full border-b border-gray-700 py-4 last:border-b-transparent">
            <div className="h-14 w-14 shrink-0">
              <img
                src={tweet.ownerDetails.avatar.url}
                alt={tweet.ownerDetails.username}
                className="h-full w-full rounded-full" />
            </div>
            <div className="w-full">
              <h4 className="mb-1 flex items-center gap-x-2">
                <span className="font-semibold">{tweet.ownerDetails.username}</span>
                <span className="inline-block text-sm text-gray-400">{formatDateTime(tweet.createdAt)} ago</span>
              </h4>
              <p className="mb-2">{tweet.content}</p>
              <div className="flex gap-4">
                <button
                    onClick={() => handleTweetCount(tweet._id)}
                  className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]">
                    <span className={`inline-block w-5 ${tweet.isLiked ? 'text-[#ae7aff]' : 'text-white'}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                        </svg>
                      </span>
                      <span>
                        {tweet.likesCount}
                      </span>
                </button>
              </div>
            </div>
          </div>
    )
}

export default TweetDetail