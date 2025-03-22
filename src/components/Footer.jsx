import React from 'react';

function Footer() {
  return (
    <>
      <footer className="text-sm p-3 px-4 md:px-8 mt-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="lg:text-left mb-3 lg:mb-0">
            <ul className="flex flex-wrap justify-center lg:justify-start space-x-2 lg:space-x-4">
              <li className="list-none lg:after:content-['·'] lg:after:mx-2">
                <a href="#" className="text-gray-800 hover:text-gray-600">FAQ</a>
              </li>
              <li className="list-none lg:after:content-['·'] lg:after:mx-2">
                <a href="#" className="text-gray-800 hover:text-gray-600">Support</a>
              </li>
              <li className="list-none">
                <a href="#" className="text-gray-800 hover:text-gray-600">Contact us</a>
              </li>
            </ul>
          </div>

          <div className="mb-3 lg:mb-0">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <i className="gd-twitter-alt"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <i className="gd-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <i className="gd-github"></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center lg:text-right">
            &copy; 2019 Graindashboard. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;