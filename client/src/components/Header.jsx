import React from 'react'
import {assets} from '../assets/assets.js'
import { useContext } from 'react';
import { AppContent } from '../context/AppContext.jsx'
const Header = () => {

const {userData}= useContext(AppContent)

 

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'><img src={assets.lock_icon}alt=""
    className='w-36 h-36 rounded-full mb-6'/>
    <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hello {userData?userData.name:'Developer'} !<img className='w-8 aspect-sqaure' src={assets.hand_wave} alt=""/></h1>
    <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our Site</h2>
    <p>Experience secure and seamless user authentication<br/> with features like registration, login, and session management.<br/> </p>
    <button className=' flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800  hover:bg-gray-200 transition-all cursor-default'>More Features- Coming Soon...</button>
        </div>
  )
}

export default Header