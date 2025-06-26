

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const BookIcon = () => (
  <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/rooms' },
    { name: 'Experience', path: '/' },
    { name: 'About', path: '/' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }
    setIsScrolled(prev => location.pathname !== '/' ? true : prev);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

      {/* Logo */}
      <Link to='/'>
        <img src={assets.logo} alt="logo" className={`h-9 border-none outline-none ${isScrolled && "invert opacity-80"}`} />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
            {link.name}
            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
          </a>
        ))}
        {user && (
          <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`} onClick={() => navigate('/owner')}>
            Dashboard
          </button>
        )}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img src={assets.searchIcon} alt="search" className={`${isScrolled && 'invert'} h-7 transition-all duration-500`}/>
        
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2"
            >
              <img 
                src={user.avatar || assets.defaultAvatar} 
                className="w-8 h-8 rounded-full"
              />
            </button>
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-1 z-50 min-w-[180px]">
                <button 
                  onClick={() => {
                    navigate('/my-bookings');
                    setShowUserDropdown(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  <BookIcon />
                  <span>My Bookings</span>
                </button>
                <button 
                  onClick={() => {
                    logout();
                    setShowUserDropdown(false);
                  }}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={handleLogin} 
            className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <img 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          src={assets.menuIcon} 
          alt="" 
          className={`${isScrolled && "invert"} h-4`}
        />
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {user && (
          <div className="flex flex-col items-center gap-4">
            <img 
              src={user.avatar || assets.defaultAvatar} 
              className="w-16 h-16 rounded-full"
            />
            <button 
              onClick={() => {
                navigate('/my-bookings');
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2"
            >
              <BookIcon />
              <span>My Bookings</span>
            </button>
          </div>
        )}
        
        <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
          <img src={assets.closeIcon} alt="close-menu" className="h-6.5"/>
        </button>

        {navLinks.map((link, i) => (
          <a 
            key={i} 
            href={link.path} 
            onClick={() => setIsMenuOpen(false)}
            className="text-lg"
          >
            {link.name}
          </a>
        ))}
        
        {user && (
          <>
            <button 
              className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
              onClick={() => {
                navigate('/owner');
                setIsMenuOpen(false);
              }}
            >
              Dashboard
            </button>
            <button 
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
            >
              Logout
            </button>
          </>
        )}
        
        {!user && (
          <button 
            onClick={() => {
              handleLogin();
              setIsMenuOpen(false);
            }}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;