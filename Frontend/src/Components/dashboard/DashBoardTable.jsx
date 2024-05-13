import React from 'react'
import DashBoardVideoCard from './DashBoardVideoCard'

function DashBoardTable({handleEditVideo, videos, isToggling, handleCheckboxToggle, handleDeleteClick }) {

    return (
        <div className="w-full overflow-auto">
          <table className="w-full min-w-[1200px] border-collapse border text-white">
            <thead>
              <tr>
                <th className="border-collapse border-b p-4">Status</th>
                <th className="border-collapse border-b p-4">Status</th>
                <th className="border-collapse border-b p-4">Uploaded</th>
                <th className="border-collapse border-b p-4">Rating</th>
                <th className="border-collapse border-b p-4">Date uploaded</th>
                <th className="border-collapse border-b p-4" />
              </tr>
            </thead>
            <tbody>
              {
                videos.map((video) => (
                  <DashBoardVideoCard handleEditVideo={handleEditVideo} isToggling={isToggling} handleCheckboxToggle={handleCheckboxToggle} handleDeleteClick={handleDeleteClick} key={video.id} video={video} />
                ))
              }
            </tbody>
          </table>
        </div>
    )
}

export default DashBoardTable