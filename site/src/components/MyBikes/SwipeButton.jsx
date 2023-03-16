import React, { useState } from "react";

export const SwipeButton = () => {
  const [isSwiped, setIsSwiped] = useState(false);

  const handleSwipe = () => {
    setIsSwiped(true);
  };

  return (
    <div
      className={`flex h-16 cursor-pointer items-center justify-center rounded-full transition-colors ${
        isSwiped ? "bg-green-500" : "bg-gray-300"
      }`}
      onTouchStart={() => handleSwipe()}
      onMouseDown={() => handleSwipe()}
    >
      <div
        className={`flex h-16 w-16 transform items-center justify-center rounded-full transition-transform ${
          isSwiped ? "translate-x-16" : "translate-x-0"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-white transition-opacity ${
            isSwiped ? "opacity-0" : "opacity-100"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 3a1 1 0 011 1v1.586l3.707-3.707a1 1 0 111.414 1.414L12.414 8H17a1 1 0 110 2H8a1 1 0 01-1-1V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M11 10a1 1 0 01-1-1V7.414l-3.707 3.707a1 1 0 11-1.414-1.414L7.586 6H3a1 1 0 110-2h9a1 1 0 011 1v3a1 1 0 01-1 1z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-white transition-opacity ${
            isSwiped ? "opacity-100" : "opacity-0"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11 3a1 1 0 00-1 1v1.586l-3.707-3.707a1 1 0 00-1.414 1.414L7.586 8H3a1 1 0 000 2h9a1 1 0 001-1V4a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M9 10a1 1 0 001-1V7.414l3.707 3.707a1 1 0 001.414-1.414L12.414 6H17a1 1 0 000-2H8a1 1 0 00-1 1v3a1 1 0 001 1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};
