import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../Layout/HomeLayout";
import VideoCard from "../Components/video/VideoCard";
import { getAllVideos } from "../Redux/features/VideoSlice";
import { getAllsearchs } from "../Redux/features/searchSlice";
import NoVideo from "../Components/NoVideo"

function HomePage() {
  const dispatch = useDispatch();
  const { searchData, isLoading, isError } = useSelector((state) => state.search);
  const { videosData, loading, error } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(getAllVideos());
    dispatch(getAllsearchs())
  }, [dispatch]);

  return (
    <HomeLayout>
      {(loading || isLoading) ? (
        <p>Loading...</p>
      ) : (error || isError) ? (
        <NoVideo />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
          {videosData && videosData.length > 0 ? (
            videosData.map((video) => <VideoCard key={video._id} video={video} />)
          ) : (
            <NoVideo />
          )}
        </div>
      )}
    </HomeLayout>
  );
}

export default HomePage;
