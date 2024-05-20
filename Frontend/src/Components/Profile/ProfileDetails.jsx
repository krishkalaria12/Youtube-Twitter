import React from 'react';

function ProfileDetails({ user }) {
    return (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Profile Details</h3>
            <div className="text-gray-400">
                <p><strong>Full Name:</strong> {user.fullName}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
        </div>
    );
}

export default ProfileDetails;
