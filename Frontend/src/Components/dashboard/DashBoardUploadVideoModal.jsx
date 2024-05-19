import React, { useState } from "react";

function DashBoardUploadVideoModal({ handleClose, handleUploadVideo }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [videoSize, setVideoSize] = useState("");

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

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    setVideoName(file.name);
    setVideoFile(file);
    setVideoSize(bytesToMB(file.size));
  };

  const bytesToMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);

    handleUploadVideo(formData, videoName, videoSize);
  };

  return (
    <div className="absolute mt-12 inset-0 z-10 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
      <div className="h-full relative overflow-auto border bg-[#121212]">
        <div className="flex items-center sticky bg-black top-0 justify-between border-b p-4">
          <div className="flex items-center space-x-2">
            <span onClick={handleClose}>
              <svg
                className="text-white cursor-pointer"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="23"
                width="23"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M320 320 192 192m0 128 128-128"
                ></path>
              </svg>
            </span>
            <h2 className="text-xl text-gray-200 font-semibold">
              Upload Videos
            </h2>
          </div>
          <button
            className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4">
          <div className="w-full border-2 border-dashed px-4 py-12 text-center">
            {!thumbnail && (
              <span className="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  ></path>
                </svg>
              </span>
            )}
            {thumbnail && (
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="Thumbnail"
                className="mb-4 w-full h-full inline-block"
              />
            )}

            <p className="text-gray-400">
              Your videos will be private until you publish them.
            </p>
            <label
              htmlFor="thumbnail"
              className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-gray-200 shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            >
              <input
                type="file"
                accept="image/*"
                id="thumbnail"
                className="sr-only"
                onChange={handleThumbnailChange}
              />
              Select Thumbnail
            </label>
          </div>
          <div className="w-full">
            <label
              htmlFor="upload-video"
              className="mb-1 text-gray-200 inline-block"
            >
              Video<sup>*</sup>
            </label>
            <input
              id="upload-video"
              type="file"
              accept="video/mp4"
              className="w-full text-gray-200 cursor-pointer border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
              onChange={handleVideoFileChange}
            />
          </div>
          <div className="w-full">
            <label htmlFor="title" className="mb-1 text-gray-200 inline-block">
              Title<sup>*</sup>
            </label>
            <input
              id="title"
              type="text"
              className="w-full border text-white bg-transparent px-2 py-1 outline-none"
              onChange={handleTitleChange}
            />
          </div>
          <div className="w-full">
            <label htmlFor="desc" className="mb-1 text-gray-200 inline-block">
              Description<sup>*</sup>
            </label>
            <textarea
              id="desc"
              className="h-40 w-full resize-none text-white border bg-transparent px-2 py-1 outline-none"
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardUploadVideoModal;
