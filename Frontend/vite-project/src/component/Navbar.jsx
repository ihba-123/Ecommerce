import React, { useContext, useState } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import FuzzySearch from './FuzzySearch';
import  { ContextApi } from '../context/ContextApi';
import FavModal from './FavModal';
const Navbar = () => {
  const {favorites} = useContext(ContextApi)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);  // example count
  const [showModal , setShowModal] = useState(false)


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="shadow-md tracking-wide relative z-50 bg-white">
      {/* Top Navigation */}
      <section className="flex items-center justify-between py-3 px-4 lg:px-10 border-b border-gray-200">
        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-32 lg:w-40"
          />
        </a>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex items-center w-full max-w-md mx-6">
         <FuzzySearch/>
        </div>

        {/* Right Section (Icons, Sign In) */}
        <div className="flex items-center space-x-3.5 lg:space-x-5.5 flex-shrink-0">
          {/* Like */}
          <button onClick={()=> setShowModal(true)} className="relative text-gray-600 hover:text-black cursor-pointer transition-colors">
            <FaHeart onClick={()=><FavModal/>} className="text-xl"  />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 rounded-full">
              {favorites.length}
            </span>
          </button>

        <FavModal showModal={showModal}
        setShowModal={setShowModal}/>

          {/* Cart */}
          <div className="relative text-gray-600 hover:text-black cursor-pointer transition-colors">
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 rounded-full">
              {cartCount}
            </span>
          </div>

          {/* Sign In */}
          <button className="cursor-pointer text-sm px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-all">
            Sign In
          </button>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-2xl text-gray-700 focus:outline-none"
          >
            ☰
          </button>
        </div>
      </section>

      {/* Mobile View: Search Bar under Logo */}
      <div className="lg:hidden w-full px-4 mt-2">
        <FuzzySearch/>
      </div>

      {/* Desktop Bottom Nav */}
      <nav className="hidden lg:flex items-center justify-center bg-[#333] text-white text-sm py-3 space-x-6">
        {['New', 'Brands', 'Makeup', 'Hair', 'Tools & Brushes', 'Bath & Body', 'Clean Body', 'Gifts'].map((item) => (
          <a key={item} href="#" className="hover:text-yellow-300 transition-all">
            {item}
          </a>
        ))}
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} bg-black bg-opacity-40 backdrop-blur-sm`}
        onClick={toggleMenu}
      />

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-72 max-w-full h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 space-y-6">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-4">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-28"
            />
            <button onClick={toggleMenu} className="text-2xl text-gray-600">
              ✕
            </button>
          </div>

          {/* Mobile Nav Links */}
          <ul className="space-y-5 text-[15px] font-medium">
            {['New', 'Brands', 'Makeup', 'Hair', 'Tools & Brushes', 'Bath & Body', 'Clean Body', 'Gifts'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block text-gray-800 hover:text-pink-600 transition-all"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>  
        </div>
      </div>
    </header>
  );
};

export default Navbar;