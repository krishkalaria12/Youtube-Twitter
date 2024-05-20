import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoCard from "../Components/video/VideoCard";
import HomeLayout from "../Layout/HomeLayout";
import NoVideo from "../Components/NoVideo";
import HomeSkeleton from "../Components/HomeSkeleton";
import ServerError from "./ServerError";
import { getAllsearchs } from "../Redux/features/searchSlice";

function SearchResultsPage() {
    const { query } = useParams();
    const dispatch = useDispatch();
    const { searchData, isLoading, isError } = useSelector((state) => state.search);

    useEffect(() => {
        dispatch(getAllsearchs({ query }));
    }, [dispatch, query]);

    return (
        <HomeLayout>
            <h2 className="text-3xl py-4 font-bold text-white ml-4">Search Results for: {query}</h2>
            {isLoading ? (
                <HomeSkeleton />
            ) : isError ? (
                <ServerError />
            ) : (
                <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                    {searchData && searchData.length > 0 ? (
                        searchData.map((video) => <VideoCard key={video._id} video={video} />)
                    ) : (
                        <NoVideo />
                    )}
                </div>
            )}
        </HomeLayout>
    );
}

export default SearchResultsPage;
