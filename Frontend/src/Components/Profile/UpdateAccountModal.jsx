import React, { useState } from 'react';

function UpdateAccountModal({ user, onClose, onSave }) {
    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async () => {
        setIsSubmitting(true);
        await onSave({ fullName, email });
        setIsSubmitting(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40">
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-white w-full max-w-md">
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Update Account</h2>
                <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Full Name</label>
                    <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded text-white"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

export default UpdateAccountModal;
