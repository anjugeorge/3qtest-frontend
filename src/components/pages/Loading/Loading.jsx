import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <img src="/assets/loading.gif" className="w-24" />
    </div>
  );
};

export default Loading;
