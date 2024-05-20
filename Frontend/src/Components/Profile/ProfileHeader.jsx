import React from 'react';

function ProfileHeader({ user, onEdit, onChangePassword }) {
    return (
        <div className="relative mb-8">
            <img src={user.coverImage.url} alt="Cover" className="w-full h-48 object-cover rounded-lg" />
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                    <img src={user.avatar.url} alt="Avatar" className="w-24 h-24 object-cover rounded-full border-4 border-purple-500" />
                    <div className="ml-4">
                        <h2 className="text-3xl font-bold text-white">{user.fullName}</h2>
                        <p className="text-gray-400">@{user.username}</p>
                    </div>
                </div>
                <div>
                    <button onClick={onEdit} className="bg-purple-500 text-white px-4 py-2 rounded-lg mr-2">Edit Profile</button>
                    <button onClick={onChangePassword} className="bg-purple-700 text-white px-4 py-2 rounded-lg">Change Password</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
