import React from "react";
import { FidgetSpinner } from "react-loader-spinner";

const VideoLoader: React.FC = () => {
  return (
    <div className="flex justify-center">
      <FidgetSpinner
        visible={true}
        height="60"
        width="100"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
      />
    </div>
  );
};

export default VideoLoader;
