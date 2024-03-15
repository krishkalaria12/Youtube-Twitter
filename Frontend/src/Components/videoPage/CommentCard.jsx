import React from "react";

function CommentCard() {
  return (
    <div>
      <div className="flex gap-x-4">
        <div className="mt-2 h-11 w-11 shrink-0">
          <img
            src="https://images.pexels.com/photos/3532552/pexels-photo-3532552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="lauraw"
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="block">
          <p className="flex items-center text-gray-200">
            Laura Williams · 
            <span className="text-sm">1 minutes ago</span>
          </p>
          <p className="text-sm text-gray-200">@lauraw</p>
          <p className="mt-3 text-gray-300 text-sm">
            This series looks amazing! I&#x27;m especially excited to learn more
            about controlled vs. uncontrolled components. Thanks for sharing!
          </p>
        </div>
      </div>
      <hr className="my-4 border-white" />
    </div>
  );
}

export default CommentCard;
