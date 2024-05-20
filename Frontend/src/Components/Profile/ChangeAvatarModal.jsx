import React, { useState } from 'react';

function ChangeAvatarModal({ onClose, onSave }) {
    const [avatar, setAvatar] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleSave = async () => {
        setIsSubmitting(true);
        await onSave(avatar);
        setIsSubmitting(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40">
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-white w-full max-w-md">
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Change Avatar</h2>
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="w-full p-2 bg-gray-800 rounded text-white mb-4"
                />
                <div className="flex justify-end">
                    <button 
                        onClick={onClose} 
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg mr-2"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave} 
                        className={`bg-purple-500 text-white px-4 py-2 rounded-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangeAvatarModal;
