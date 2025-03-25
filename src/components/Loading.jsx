import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = ({ loading }) => {
  return (
    <div className="h-[100vh] flex justify-center items-center z-50 absolute left-[50%]">
      <ClipLoader
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
