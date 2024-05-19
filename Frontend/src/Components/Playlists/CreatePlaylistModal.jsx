import React, { useState } from "react";
import toast from "react-hot-toast";

function CreatePlaylistModal({ togglePlaylistCreation, submitting, handleCreatePlaylist }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnail: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.thumbnail) {
      toast.error("All fields are required");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.thumbnail) {
      data.append("thumbnail", formData.thumbnail);
    }

    handleCreatePlaylist(data);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-transparent z-40">
      <div className="relative w-full max-w-sm border bg-black">
        <form className="w-full space-y-5 p-4" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold">Create Playlist</h2>
            <span className="cursor-pointer" onClick={togglePlaylistCreation}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 512 512"
                height={30}
                width={30}
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
          <div className="w-full">
            <label className="inline-block mb-1 pl-1" htmlFor="name">
              Name:{" "}
            </label>
            <input
              type="text"
              placeholder="Enter playlist name"
              className="px-3 py-2 bg-[#0E0F0F] text-white outline-none focus:bg-[#222222] duration-200 border border-slate-600 w-full"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="inline-block mb-1 pl-1" htmlFor="description">
              Description:{" "}
            </label>
            <input
              type="text"
              placeholder="Enter description for your playlist"
              className="px-3 py-2 bg-[#0E0F0F] text-white outline-none focus:bg-[#222222] duration-200 border border-slate-600 w-full"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="inline-block mb-1 pl-1" htmlFor="thumbnail">
              Thumbnail:{" "}
            </label>
            <input
              type="file"
              accept="image/*"
              className="px-3 py-2 bg-[#0E0F0F] text-white outline-none focus:bg-[#222222] duration-200 border border-slate-600 w-full"
              name="thumbnail"
              id="thumbnail"
              onChange={handleChange}
            />
            <div className="mt-2">
              {formData.thumbnail ? (
                <img
                  src={URL.createObjectURL(formData.thumbnail)}
                  alt="Thumbnail preview"
                  className="w-full h-32 object-cover"
                />
              ) : (
                <svg
                  className="w-full h-32 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3v18h18V3H3zm3 3h12v12H6V6zm5 5v5h2v-5h5V9h-5V4h-2v5H6v2h5z"
                  />
                </svg>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`text-sm p-2 w-full text-white hover:scale-110 duration-100 ease-in ${submitting ? "bg-purple-300" : "bg-purple-500"}`}
          >
            {submitting ? "Creating Playlist..." : "Create Playlist"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePlaylistModal;
