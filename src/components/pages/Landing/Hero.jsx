import React from "react";

const Hero = () => {
  return (
    <>
      <div className="relative  w-full min-h-[500px] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover maskVideo"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/3qtest-banner.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-20 left-0 flex flex-col space-y-5 w-full h-full items-center  font-roboto">
          {" "}
          <h1 className="text-5xl font-bold text-center text-slate-800 ">
            Discover Who You are
          </h1>
          <p className="text-2xl md:text-3xl leading-loose md:w-1/2 text-center px-5 text-slate-800 ">
            Seek your reflection and head straight to the door of success with
            3Q Test
          </p>
          {/*<a href="/assessment">
            <button className="bg-purple-900 hover:bg-purple-950  w-48 h-10 text-white text-[14px] font-bold rounded-lg">
              Start Test
            </button>
          </a>*/}
        </div>
      </div>
    </>
  );
};

export default Hero;
