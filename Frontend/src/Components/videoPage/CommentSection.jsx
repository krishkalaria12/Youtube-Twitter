import React, { useState } from "react";
import CommentCard from "./CommentCard";

function CommentSection({ comments, onCommentSubmit, videoId }) {
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            setSubmitting(true);
            onCommentSubmit(newComment, videoId);
            setNewComment("");
            setSubmitting(false);
        }
    };

    return (
        <div className="z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="block">
                    <h6 className="mb-4 text-white font-semibold">{comments.length} Comments</h6>
                    <div className="flex items-start lg:items-center lg:flex-row flex-col lg:space-y-0 space-y-2 justify-between lg:space-x-4">
                        <input
                            type="text"
                            className="w-full max-w-2xl text-white rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                            placeholder="Add a Comment"
                            value={newComment}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`${!submitting ? "bg-[#9872d6] " : "bg-[#7733e4]"} hover:bg-[#854ae4] text-white font-semibold py-2 px-4 rounded inline-block`}
                        >
                            {submitting? "Commenting..." : "Add Comment"}
                        </button>
                    </div>
                </div>
            </form>
            <hr className="my-4 border-white" />
            {comments.length > 0 ? (
                comments.map((comment, index) => <CommentCard key={index} comment={comment} />)
            ) : (
                <h4 className="font-semibold text-xl text-center text-white">No Comments</h4>
            )}
        </div>
    );
}

export default CommentSection;
