import React, { useEffect, useState } from 'react';
import HomeLayout from '../Layout/HomeLayout';
import axiosInstance from '../Helper/axiosInstance';
import ChangePasswordModal from '../Components/Profile/ChangePasswordModal';
import ChangeAvatarModal from '../Components/Profile/ChangeAvatarModal';
import ChangeCoverImageModal from '../Components/Profile/ChangeCoverImageModal';
import UpdateAccountModal from '../Components/Profile/UpdateAccountModal';
import toast from 'react-hot-toast';
import ServerError from './ServerError';

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [isCoverImageModalOpen, setIsCoverImageModalOpen] = useState(false);
    const [isUpdateAccountModalOpen, setIsUpdateAccountModalOpen] = useState(false);

    const fetchUser = async () => {
        try {
            setLoading(true);
            let res = await axiosInstance.get('/users/current-user');
            setUser(res.data.data);
        } catch (error) {
            console.log(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (usernameOrEmail, currentPassword, newPassword) => {
        try {
            await axiosInstance.post('/users/change-password', { usernameOrEmail, currentPassword, newPassword });
            toast.success('Password changed successfully');
        } catch (error) {
            console.log(error);
            toast.error('Failed to change password');
        }
    };

    const handleChangeAvatar = async (avatar) => {
        const formData = new FormData();
        formData.append('avatar', avatar);
        try {
            await axiosInstance.patch('/users/update-avatar', formData);
            fetchUser();
            toast.success('Avatar changed successfully');
        } catch (error) {
            console.log(error);
            toast.error('Failed to change avatar');
        }
    };

    const handleChangeCoverImage = async (coverImage) => {
        const formData = new FormData();
        formData.append('coverImage', coverImage);
        try {
            await axiosInstance.patch('/users/update-cover', formData);
            fetchUser();
            toast.success('Cover image changed successfully');
        } catch (error) {
            console.log(error);
            toast.error('Failed to change cover image');
        }
    };

    const handleUpdateAccount = async (updatedDetails) => {
        try {
            await axiosInstance.patch('/users/update-account', updatedDetails);
            fetchUser();
            toast.success('Account updated successfully');
        } catch (error) {
            console.log(error);
            toast.error('Failed to update account');
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return (
            <HomeLayout>
                <div className="text-3xl font-bold">Loading...</div>
            </HomeLayout>
        );
    }

    if (error) {
        return (
            <HomeLayout>
                <ServerError />
            </HomeLayout>
        );
        
    }

    return (
        <HomeLayout>
            {user && (
                <div className="max-w-4xl mx-auto py-10">
                    <div className="relative">
                        <img
                            src={user.coverImage.url}
                            alt="Cover Image"
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                        <div className="absolute bottom-4 left-4 flex items-center space-x-4">
                            <img 
                                src={user.avatar.url} 
                                alt={user.username} 
                                className="w-24 h-24 rounded-full border-4 border-purple-400"
                            />
                            <div>
                                <h1 className="text-3xl font-bold text-white">{user.fullName}</h1>
                                <p className="text-gray-400">@{user.username}</p>
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 flex space-x-4">
                            <button 
                                onClick={() => setIsUpdateAccountModalOpen(true)}
                                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                            >
                                Edit Profile
                            </button>
                            <button 
                                onClick={() => setIsPasswordModalOpen(true)}
                                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold text-white mb-2">Account Details</h2>
                        <p className="text-gray-400">Email: {user.email}</p>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold text-white mb-2">Change Avatar</h2>
                        <button 
                            onClick={() => setIsAvatarModalOpen(true)}
                            className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                        >
                            Change Avatar
                        </button>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold text-white mb-2">Change Cover Image</h2>
                        <button 
                            onClick={() => setIsCoverImageModalOpen(true)}
                            className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                        >
                            Change Cover Image
                        </button>
                    </div>
                </div>
            )}

            {isPasswordModalOpen && (
                <ChangePasswordModal 
                    onClose={() => setIsPasswordModalOpen(false)} 
                    onChangePassword={handleChangePassword} 
                />
            )}
            {isAvatarModalOpen && (
                <ChangeAvatarModal 
                    onClose={() => setIsAvatarModalOpen(false)} 
                    onSave={handleChangeAvatar} 
                />
            )}
            {isCoverImageModalOpen && (
                <ChangeCoverImageModal 
                    onClose={() => setIsCoverImageModalOpen(false)} 
                    onSave={handleChangeCoverImage} 
                />
            )}
            {isUpdateAccountModalOpen && (
                <UpdateAccountModal 
                    user={user}
                    onClose={() => setIsUpdateAccountModalOpen(false)} 
                    onSave={handleUpdateAccount} 
                />
            )}
        </HomeLayout>
    );
}

export default Profile;
