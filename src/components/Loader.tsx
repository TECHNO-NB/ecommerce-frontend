import React from "react";
import { FidgetSpinner } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <div className="fixed flex h-[80vh] w-[100vw] z-100  sm:h-[100vh] items-center justify-center ">
      <FidgetSpinner
        visible={true}
        height="100"
        width="100"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
      />
    </div>
  );
};

export default Loader;
