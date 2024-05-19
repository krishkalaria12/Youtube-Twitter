// ChannelHeading.jsx
import React from "react";

function ChannelHeading({ selectedHeading, onSelectHeading }) {

  const headings = ["Videos", "Playlist", "Tweets"];

  return (
    <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
      {headings.map((heading) => (
        <li key={heading} className="w-full">
          <button
            className={`w-full px-3 py-1.5 ${
              selectedHeading === heading
                ? "border-b-2 border-[#ae7aff] bg-white text-[#ae7aff]"
                : "border-b-2 border-transparent text-gray-400"
            }`}
            onClick={() => onSelectHeading(heading)}
          >
            {heading}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ChannelHeading;
