import React from "react";

function Input({ type, label, htmlFor,name, value, onchange }) {
    return (
        <>
            <label htmlFor={htmlFor} className="mb-1 text-base font-semibold inline-block text-gray-300">
                {label}
            </label>
            <input
                id={htmlFor}
                type={type}
                value={value}
                onChange={onchange} 
                name={name}
                placeholder={`Enter your ${label.charAt(0).toUpperCase() + label.slice(1)}`}
                className="mb-4 rounded-lg border text-gray-300 bg-transparent px-3 py-2"
            />
        </>
    );
}

export default Input;
