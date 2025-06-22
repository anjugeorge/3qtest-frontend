import React from "react";

const ContactUs = () => {
  return (
    <>
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {" "}
            <h1 className="text-3xl text-center md:text-start font-semibold">
              Contact Us
            </h1>
            <p className="py-5">
              Drop your message here and we will get back to you soon!!
            </p>
          </div>

          <div className="mx-auto">
            <div className=" ">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Name"
                  ></input>
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Email"
                  ></input>
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="email"
                  >
                    Message
                  </label>
                  <input
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="message"
                    type="text"
                    placeholder="Message"
                  ></input>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
