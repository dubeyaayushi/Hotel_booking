// import React from 'react'
// import {Link} from 'react-router-dom'
// import { assets} from '../../assets/assets'
// import { UserButton} from '@clerk/clerk-react'

// const Navbar = () => {
// return (
//     <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300'>
//             <Link to='/'>
//                 <img src={assets.logo} alt='logo' className='h-9 invert opacity-80'/>
//             </Link>
//             <UserButton/>
//     </div>
// )
// }

// export default Navbar


import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300'>
      <Link to='/owner'>
        <img src={assets.logo} alt='Hotel Owner Dashboard' className='h-9 invert opacity-80'/>
      </Link>
      
      {user && (
        <div className="flex items-center gap-2">
          <img 
            src={user.avatar || assets.defaultAvatar} 
            alt="User profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;