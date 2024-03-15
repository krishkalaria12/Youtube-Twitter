// SearchResultsPage.js
import React from "react";
import { useSelector } from "react-redux";
import VideoCard from "../Components/video/VideoCard";
import HomeLayout from "../Layout/HomeLayout";
import NoVideo from "../Components/NoVideo";
import { useParams } from "react-router-dom";

function SearchResultsPage({ match }) {
    const { query } = useParams();
  const { searchData } = useSelector((state) => state.search);

  return (
    <HomeLayout>
      <h2 className="text-3xl py-4 font-bold text-white ml-4">Search Results for: {query}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
        {searchData && searchData.length > 0 ? (
          searchData.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        ) : (
          <NoVideo />
        )}
      </div>
    </HomeLayout>
  );
}

export default SearchResultsPage;
