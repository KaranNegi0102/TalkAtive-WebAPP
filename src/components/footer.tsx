import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-4 px-4 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
