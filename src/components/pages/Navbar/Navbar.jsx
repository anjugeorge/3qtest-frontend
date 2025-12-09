import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import Login from "../UserAuth/Login";
import { AuthContext } from "../../../context/AuthContext";
const Navbar = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const [redirectPath, setRedirectPath] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menu, setMenu] = React.useState(false);
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path
      ? "text-orange-800 font-bold"
      : "text-slate-800";
  };
  function openMenu() {
    setMenu(true);
  }
  function closeMenu() {
    setMenu(false);
  }
  const navigate = useNavigate();

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <>
      <div className="container py-6">
        <div className="grid grid-cols-[auto_1fr_auto] ">
          <div className="md:hidden relative inline-block top-2  px-2">
            {menu ? (
              <IoIosCloseCircleOutline onClick={closeMenu} />
            ) : (
              <FaBars onClick={openMenu} />
            )}
          </div>
          <div>
            <a href="/" className="flex">
              <img src="/assets/favicon.ico" className="w-8" />
              <h1 className="text-2xl font-bold italic text-purple-950">
                3QTests
              </h1>
            </a>
          </div>
          <div className="mx-auto my-auto  hidden md:block">
            <ul className="flex flex-nowrap justify-center gap-4 font-roboto text-slate-800 text-[14px]">
              <li className="hover:text-orange-800">
                <a
                  href="/"
                  className={`block px-4 py-2 whitespace-nowrap cursor-pointer ${isActive(
                    "/"
                  )}`}
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/about-us"
                  className={`block px-4 py-2 whitespace-nowrap cursor-pointer hover:text-orange-800 ${isActive(
                    "/about-us"
                  )}`}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/test"
                  className={`block px-4 py-2 whitespace-nowrap cursor-pointer hover:text-orange-800 ${isActive(
                    "/test"
                  )}`}
                >
                  Our Assessments
                </a>
              </li>
              <li>
                <a
                  className={`block px-4 py-2 whitespace-nowrap cursor-pointer hover:text-orange-800 ${isActive(
                    "/personality-assessment"
                  )}`}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    const path = "/personality-assessment";
                    if (isLoggedIn) {
                      navigate(path);
                    } else {
                      setRedirectPath(path);
                      toggleModal();
                    }
                  }}
                >
                  Personality Insights
                </a>
              </li>
              <li>
                <a
                  className={`block px-4 py-2 whitespace-nowrap cursor-pointer hover:text-orange-800 ${isActive(
                    "/career-assessment"
                  )}`}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    const path = "/career-assessment";
                    if (isLoggedIn) {
                      navigate(path);
                    } else {
                      setRedirectPath(path);
                      toggleModal();
                    }
                  }}
                >
                  Career Interests
                </a>
              </li>
            </ul>
          </div>

          <div className="ml-auto flex flex-col items-center md:flex-row">
            {!isLoggedIn ? (
              <button
                onClick={toggleModal}
                className="mx-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Login
              </button>
            ) : (
              <>
                {" "}
                <span className="truncate max-w-20 md:max-w-full md:me-2 mr-0 text-gray-600 text-[14px]">
                  Hi, {user.name}!
                </span>
                <button
                  onClick={handleLogout}
                  className="mr-0 mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Logout
                </button>
              </>
            )}
          </div>
          {isModalOpen && (
            <Login
              closeModal={closeModal}
              redirectPath={redirectPath}
              setRedirectPath={setRedirectPath}
            />
          )}
        </div>

        <div>
          {menu && (
            <div>
              <div className="absolute start-0 top-16 bg-white  w-full max-h-full z-20 text-white font-bold py-5">
                <ul className="flex flex-col flex-nowrap justify-center gap-4 font-roboto text-slate-800 text-[14px]">
                  <li>
                    <a
                      href="/"
                      className={`block px-4 py-2 whitespace-nowrap cursor-pointer hover:text-orange-800 ${isActive(
                        "/"
                      )}`}
                    >
                      Home
                    </a>
                  </li>

                  <li>
                    <a
                      href="/about-us"
                      className={`block px-4 py-2 whitespace-nowrap cursor-pointer hover:text-orange-800 ${isActive(
                        "/about-us"
                      )}`}
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/test"
                      className={`block px-4 py-2 whitespace-nowrap cursor-pointer hover:text-orange-800 ${isActive(
                        "/test"
                      )}`}
                    >
                      Our Assessments
                    </a>
                  </li>
                  <li>
                    <a
                      className={`block px-4 py-2 whitespace-nowrap cursor-pointer hover:text-orange-800 ${isActive(
                        "/personality-assessment"
                      )}`}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        const path = "/personality-assessment";
                        if (isLoggedIn) {
                          navigate(path);
                        } else {
                          setRedirectPath(path);
                          toggleModal();
                        }
                      }}
                    >
                      <li className="block"> Personality Insights</li>
                    </a>
                  </li>
                  <li>
                    <a
                      className={`block px-4 py-2 whitespace-nowrap cursor-pointer hover:text-orange-800 ${isActive(
                        "/career-assessment"
                      )}`}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        const path = "/career-assessment";
                        if (isLoggedIn) {
                          navigate(path);
                        } else {
                          setRedirectPath(path);
                          toggleModal();
                        }
                      }}
                    >
                      <li className="block"> Career Interests</li>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
