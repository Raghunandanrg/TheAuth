import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth.jsx'

const Sign_in = () => {
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.user)

  const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart())
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data);
      if (!res.ok) {
        dispatch(signInFailure(data))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error))
    }
  }
  return (
    <div className=' max-w-lg m-auto my-20'>
      <h1 className='text-center text-3xl font-bold my-2 '>Sign-in</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 '>
          <input className='bg-slate-200 p-2 rounded-lg' id='email' type='email' placeholder='email' onChange={HandleChange} required />
          <input className='bg-slate-200 p-2 rounded-lg' id='password' type='password' placeholder='password' onChange={HandleChange} required />
          <button className='bg-slate-700 p-2 rounded-md text-white' disabled={loading}>{loading ? "...Laoding" : "Sign in"}</button>
          <OAuth />
        </div>
      </form>
      <div>
        <div className="flex gap-2">
          <p>Dont Have an account?</p>
          <Link to={'/sign_up'}><span className="text-blue-400">Sign-up</span></Link>
        </div>
        <p>{error.message}</p>
      </div>
    </div>
  )
}

export default Sign_in