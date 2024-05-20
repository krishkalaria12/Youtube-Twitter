import React from 'react'

function Button({onclick, label, submitting}) {
    return (
        <button onClick={onclick} disabled={submitting} className={`${!submitting ? "bg-purple-500 " : "bg-purple-300"} w-full py-2 px-4 font-bold text-lg rounded button blue text-white hover:scale-110 cursor-pointer duration-100 ease-in`}>{label}</button>
    )
}

export default Button