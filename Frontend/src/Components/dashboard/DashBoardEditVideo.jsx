import React, { useState } from "react";
import toast from "react-hot-toast";

function DashBoardEditVideo({ handleSubmitEditVideo, handleClose, video }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (thumbnail === null) {
        toast.error("Please upload a thumbnail");
        return;
    }
    if (title === "") {
        toast.error("Please enter a title");
        return;
    }
    if (description === "") {
        toast.error("Please enter a description");
        return;
    }
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);

    handleSubmitEditVideo(formData);
  };

  return (
    <div className="fixed mt-5 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-black space-y-2 border h-[30rem] overflow-y-scroll outline-none p-2"
      >
        <div className="sticky left-0 top-0 z-50 flex justify-between items-center border-b border-slate-500 px-3 py-1">
          <div>
            <h2 className="font-bold text-gray-200">Edit Video</h2>
            <p className="text-xs text-gray-200 mb-2">
              Share where you`ve worked on your profile.
            </p>
          </div>
          {/* Close Button */}
          <span onClick={handleClose}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 512 512"
              className="cursor-pointer"
              height={23}
              width={23}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeMiterlimit={10}
                strokeWidth={32}
                d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              />
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M320 320 192 192m0 128 128-128"
              />
            </svg>
          </span>
        </div>

        {/* Form Body */}
        <div className="p-2 grid lg:grid-cols-2 h-full grid-cols-1 gap-5 z-40">
          {/* Thumbnail Input */}
          <div>
            <div className="w-full h-full">
              <label
                htmlFor="thumbnail"
                className="cursor-pointer relative flex flex-col justify-center items-center h-full"
              >
                <label className="inline-block mb-2 pl-1">Thumbnail: </label>
                {thumbnail && <img
                  className="object-contain w-full min-w-xl h-72 min-h-32"
                  src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
                  alt="Thumbnail Preview"
                />}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 512 512"
                  className="hover:text-purple-500 text-center text-white absolute inline-flex justify-center items-center w-full"
                  height={30}
                  width={30}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" />
                </svg>
                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailChange}
                />
              </label>
            </div>
            <span className="text-red-500 text-xs" />
          </div>

          {/* Title and Description Inputs */}
          <div className="flex flex-col justify-between sm:gap-0 gap-2">
            <div className="w-full">
              <label className="inline-block text-white mb-1 pl-1" htmlFor="title">
                Title *
              </label>
              <input
                type="text"
                className="w-full border p-2 text-gray-200 bg-transparent outline-none focus:bg-[#222222]"
                name="title"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <span className="text-red-500 text-xs" />
            <div className="mb-4">
              <label className="text-white">Description *</label>
              <textarea
                rows={4}
                className="focus:bg-[#222222] text-gray-200 text-sm overflow-y-scroll bg-transparent outline-none border w-full mt-1 p-1"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
              />
              <span className="text-red-500 text-xs" />
            </div>
            <div className="flex gap-3">
              <button onClick={handleClose} className="flex-1 border p-2 button blue text-white hover:scale-110 duration-100 ease-in">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="flex-1 bg-purple-500 p-2 font-bold submit blue text-black hover:scale-110 duration-100 ease-in"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DashBoardEditVideo;
