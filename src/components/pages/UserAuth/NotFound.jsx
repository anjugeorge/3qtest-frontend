import React from "react";

const NotFound = () => {
  return (
    <>
      <div className=" flex flex-col   items-center  font-roboto py-10">
        {" "}
        <h1 className="text-5xl font-bold text-center text-slate-800 ">404</h1>
        <p className="text-2xl md:text-3xl leading-loose md:w-1/2 text-center p-5 text-slate-800 ">
          Page Not Found
        </p>
      </div>
    </>
  );
};

export default NotFound;
