import React from "react";
import formatDateTime from "../../utils/CreatedAt";

function CommentCard({comment}) {
  return (
    <div>
      <div className="flex gap-x-4">
        <div className="mt-2 h-11 w-11 shrink-0">
          <img
            src={comment.owner[0].avatar.url}
            alt={comment.owner[0].username}
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="block">
          <p className="flex items-center text-gray-200">
            {comment.owner[0].username}
            <span className="text-sm ml-2">{formatDateTime(comment.createdAt)} ago</span>
          </p>
          <p className="text-sm text-gray-200">@{comment.owner[0].username}</p>
          <p className="mt-3 text-gray-300 text-sm">
            {comment.content}
          </p>
        </div>
      </div>
      <hr className="my-4 border-white" />
    </div>
  );
}

export default CommentCard;
