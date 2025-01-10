import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();
  const [state, setState] = useState('Sign Up');
  // to get backend url frrom context
  const { backendUrl, setIsLoggedin ,getUserData} = useContext(AppContent)
  const [name, setName] = useState('')
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')


  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === 'Sign Up') {
        const {data} = await axios.post(backendUrl + '/api/auth/register', { name, email, password })
        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        }
        else {
          toast.error(data.message)
        }
      }
      else {
        const {data} = await axios.post(backendUrl + '/api/auth/login', { email, password })
        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        }
        else {
          toast.error(error.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200  to-purple-400'>
      <img onClick={() => navigate('/')} src={assets} alt="" className='absolute left-5sm:left-20 top-5 w-28sm:w-32 cursor-pointer' />
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>
          {state === 'Sign Up' ? 'Create  Account' : 'Login '}
        </h2>
        <p className='text-center text-sm mb-3'>
          {state === 'Sign Up' ? 'Create your Account' : 'Login to your Account!'}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.person_icon} alt="" />
            <input
              onChange={e => setName(e.target.value)}
              value={name}
              className='bg-transparent outline-none' type="text" placeholder='Enter  Name' required />

          </div>)}

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={e => setemail(e.target.value)}
              value={email}
              className='bg-transparent outline-none' type="email" placeholder='Enter Email' required />

          </div>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              className='bg-transparent outline-none' type="password" placeholder='Enter Password' required />

          </div>
          {state != 'Sign Up' && (<p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password?</p>)}
          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>
            {state}
          </button>
        </form>
        {state === 'Sign Up' ? (<p className=' text-gray-400 text-center text-xs mt-4'>Already have an Account?
          <span
            onClick={() => setState('Login')}
            className='text-blue-400 cursor-pointer underline'>Login here</span>
        </p>) : (<p className=' text-gray-400 text-center text-xs mt-4'>Dont't have an Account?
          <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer underline'> Sign Up</span>
        </p>)}


      </div>
    </div>
  )
}

export default Login