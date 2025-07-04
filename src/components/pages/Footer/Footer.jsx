import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactUs from "../ContactUs/ContactUs";
import TermsAndConditions from "../Terms-Conditions/TermsAndConditions";
const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "About Us",
    link: "/about-us",
  },
  {
    id: 3,
    title: "Our Assessments",
    link: "/test",
  },
];
const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(!isModalOpen);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <div>
      {" "}
      <footer className="bg-purple-950 text-white">
        <div className="container py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:mx-auto ">
              <h1 className="lg:text-3xl md:text-2xl text-lg text-start font-bold pb-5">
                3QTest
              </h1>
              <p className=" text-sm/7 text-start text-gray-300">
                3QTest is a Canadian-based company that helps you find the best
                career choice for yourself based on your personality traits.We
                want to help people find their passions and achieve their
                dreams!
              </p>
            </div>
            <div className="lg:mx-auto">
              <h1 className="lg:text-xl md:text-lg text-sm text-start font-bold pb-5">
                Links
              </h1>
              <ul className="text-start text-gray-300 space-y-2 text-sm">
                {NavbarMenu.map((item) => (
                  <li key={item.id}>
                    <a href={item.link}>{item.title}</a>
                  </li>
                ))}
              </ul>
              <div className="text-start text-gray-300 pt-2 text-sm">
                <button onClick={openModal}>Terms and Conditions</button>
                {isModalOpen && <TermsAndConditions closeModal={closeModal} />}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 py-5">
            <div className="">
              <h1 className="lg:text-xl md:text-lg text-sm text-start font-bold pb-5">
                Contact Us
              </h1>
              <div className="mx-auto">
                <div className="">
                  <form className="  pt-6 pb-8 mb-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        for="name"
                      >
                        Name
                      </label>
                      <input
                        className="bg-purple-950  appearance-none border-b-[1px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        className="bg-purple-950  appearance-none border-b-[1px]   w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
                        className=" bg-purple-950  appearance-none border-b-[1px]    w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        type="text"
                        placeholder="Message"
                      ></input>
                    </div>
                    <div className="flex items-center justify-end">
                      <button
                        className="w-full bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
          <div className=" text-gray-300 text-sm text-center mt-5">
            <p className=" mt-5">
              © {new Date().getFullYear()} 3QTest. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
