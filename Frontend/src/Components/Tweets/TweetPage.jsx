import React from 'react'
import NoTweets from './NoTweets'
import TweetDetail from './TweetDetail'
import CreateTweet from './createTweet'

function TweetPage({tweets, handleTweetCount,handleTweetSubmit, tweeting}) {

    return (
        (tweets && tweets.length > 0) ? (
            <div className="py-4">
                {tweeting ? <CreateTweet handleTweetSubmit={handleTweetSubmit} /> : null}
                {tweets.map((tweet) => (
                    <TweetDetail handleTweetCount={handleTweetCount} tweet={tweet} key={tweet._id} />
                ))}
            </div>
        ) : (
            <NoTweets />
        )
    )
}

export default TweetPage