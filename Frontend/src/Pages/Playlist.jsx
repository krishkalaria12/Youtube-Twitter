import React, { useEffect, useState } from 'react';
import HomeLayout from '../Layout/HomeLayout';
import axiosInstance from '../Helper/axiosInstance';
import { useParams } from 'react-router-dom';
import PlayListDetails from '../Components/Playlists/PlayListDetails';
import PlaylistVideoCard from '../Components/Playlists/PlaylistVideoCard';
import NoVideo from '../Components/NoVideo';
import { decodeToken } from '../utils/decodeToken';
import AddVideoModal from '../Components/Playlists/AddVideoModal';

function PlaylistPage() {
    const { playlistId } = useParams();
    const [playlistDetails, setPlaylistDetails] = useState({});
    const [userVideos, setUserVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const userId = decodeToken()._id;

    const fetchPlaylistVideos = async () => {
        try {
            const res = await axiosInstance.get(`/playlist/${playlistId}`);
            if (res.data.data) {
                setPlaylistDetails(res.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserVideos = async () => {
        try {
            const res = await axiosInstance.get('/video/user/videos');
            if (res.data.data) {
                const filteredVideos = res.data.data.filter(
                    (userVideo) => !playlistDetails.videos.some((playlistVideo) => playlistVideo._id === userVideo._id)
                );
                setUserVideos(filteredVideos);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddVideo = async (videoId) => {
        try {
            await axiosInstance.patch(`/playlist/add/${videoId}/${playlistId}`);
            fetchPlaylistVideos();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveVideo = async (videoId) => {
        try {
            await axiosInstance.patch(`/playlist/remove/${videoId}/${playlistId}`);
            fetchPlaylistVideos();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPlaylistVideos();
    }, [playlistId]);

    useEffect(() => {
        if (isModalOpen) {
            fetchUserVideos();
        }
    }, [isModalOpen]);

    if (loading) {
        return (
            <HomeLayout>
                <p className="font-bold text-3xl">Loading..</p>
            </HomeLayout>
        );
    }

    return (
        <HomeLayout>
            {userId === playlistDetails.owner._id && (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="group/btn mr-1 flex w-full items-center justify-end gap-x-2 m-4 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out sm:w-auto"
                                >
                                    Add Video
                                </button>
                            )}
            <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
                <PlayListDetails playlist={playlistDetails} />
                
                <div className="flex w-full flex-col gap-y-4">
                    {playlistDetails.videos && playlistDetails.videos.length > 0 ? (
                        playlistDetails.videos.map((video, index) => (
                            <PlaylistVideoCard onRemove={handleRemoveVideo} key={index} video={video} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            
                            <NoVideo />
                        </div>
                    )}
                </div>
            </div>
            {isModalOpen && (
                <AddVideoModal
                    videos={userVideos}
                    onClose={() => setIsModalOpen(false)}
                    onAddVideo={handleAddVideo}
                />
            )}
        </HomeLayout>
    );
}

export default PlaylistPage;
