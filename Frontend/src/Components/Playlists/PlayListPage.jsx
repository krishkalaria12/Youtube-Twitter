import React from 'react'
import NoPlaylists from './NoPlaylists'
import PlayListCard from './PlayListCard'

function PlayListPage({playlists}) {
    return (
        playlists.length > 0 ? (
            <div className="grid gap-4 pt-2 sm:grid-cols-1 lg:grid-cols-2">
                {playlists.map((playlist) => (
                    <PlayListCard key={playlist._id} playlist={playlist} />
                ))}
            </div>
        ) : (
            <NoPlaylists />
        )
    )
}

export default PlayListPage