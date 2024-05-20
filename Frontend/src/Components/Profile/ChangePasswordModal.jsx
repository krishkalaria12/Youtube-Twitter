import React, { useState } from 'react';

function ChangePasswordModal({ onClose, onChangePassword }) {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await onChangePassword(usernameOrEmail, currentPassword, newPassword);
        setIsSubmitting(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40">
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-white w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Change Password</h2>
                <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Username or Email</label>
                    <input
                        type="text"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded text-white"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded text-white"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 mb-1">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded text-white"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className={`bg-purple-500 text-white px-4 py-2 rounded-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Change Password'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangePasswordModal;
