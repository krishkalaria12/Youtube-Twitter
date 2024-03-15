import React from 'react'

function Button({onclick, label}) {
    return (
        <button onClick={onclick} className="bg-purple-500 w-full py-2 px-4 font-bold text-lg rounded button blue text-white hover:scale-110 duration-100 ease-in">{label}</button>
    )
}

export default Button