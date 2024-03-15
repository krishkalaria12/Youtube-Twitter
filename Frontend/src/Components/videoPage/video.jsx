import React from 'react'
import RelatedVideoCard from "./RelatedVideoCard"
import CommentSection from './CommentSection'
import VideoDetails from "./VideoDetails"
import VideoPlayer from "./VideoPlayer"

function video() {
  return (
    <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <div className="col-span-12 w-full">
          <VideoPlayer />
          <VideoDetails />
          <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden"><h6 className="font-semibold">573 Comments...</h6></button>
          <CommentSection />
        </div>
        <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
          <RelatedVideoCard />
          <RelatedVideoCard />
          <RelatedVideoCard />
          <RelatedVideoCard />
          <RelatedVideoCard />
          <RelatedVideoCard />
        </div>
      </div>
  )
}

export default video