/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the footer component for the application.
 */

export const Footer = () => {
  return (
    <footer className="bg-gray-900 rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          <a href="/" className="hover:underline">
            DJMixes
          </a>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/about" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="/login" className="hover:underline me-4 md:me-6">
              Login
            </a>
          </li>
          <li>
            <a href="/register" className="hover:underline">
              Register
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
