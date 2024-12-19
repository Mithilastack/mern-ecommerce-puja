import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <>
      <footer className="bg-black text-white">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col ">
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-lg mb-3">
                MENU
              </h2>
              <ul>
                <li>Features</li>
                <li className="mt-1">News Blog</li>
                <li className="mt-1">Info Center</li>
                <li className="mt-1">Login</li>
              </ul>
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-lg mb-3">
                COMPANY
              </h2>
              <ul className="list-none mb-10">
                <li className="mt-1">About Us</li>
                <li className="mt-1">Privacy Policy</li>
                <li className="mt-1">Terms & Condition</li>
                <li className="mt-1">Login</li>
              </ul>
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-lg mb-3">
                CONTACT
              </h2>
              <ul className="list-none mb-10">
                <li className="mt-1">Contact Sales</li>
                <li className="mt-1">+9122222222</li>
                <li className="mt-1">News Blog</li>
                <li className="mt-1">+4747884444</li>
              </ul>
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-lg mb-3">
                TECH SUPPORT
              </h2>
              <ul className="list-none mb-10">
                <li className="mt-1">contact support</li>
                <li className="mt-1">Info Center</li>
                <li className="mt-1">Activate</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-600 text-white">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col items-center">
            <p className="text-sm text-center">
              © 2024 - All rights reserved by <a href="https://mithilastack.com/" >MithilaStack</a>
            </p>
            {/* <p className="inline-flex mt-4 justify-center">
              <span className="mr-2">
                <FaFacebook size={30} />
              </span>
              <span className="mr-2">
                <FaInstagramSquare size={30} />
              </span>
              <span className="mr-2">
                <FaTwitter size={30} />
              </span>
            </p> */}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
