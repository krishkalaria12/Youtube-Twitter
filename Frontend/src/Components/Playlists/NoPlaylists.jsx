import React from 'react'

function NoPlaylists() {
    return (
        <div className="flex justify-center p-4">
      <div className="w-full max-w-sm text-center">
        <p className="mb-3 w-full">
          <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
          <img src="/playlist-svgrepo-com (1).svg" alt="" />
          </span>
        </p>
        <h5 className="mb-2 font-semibold">No Playlists available</h5>
        <p>
          This page has yet to create a Playlist. Search another page in order to
          find more playlist.
        </p>
      </div>
    </div>
    )
}

export default NoPlaylists