import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sign_in = () => {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errormsg, setErrorMessage] = useState(false)
  const navigate=useNavigate()

  const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) {
        setError(true)
        setErrorMessage(data.message)
        setLoading(false)
        return;
      }
      navigate('/')
    } catch (error) {
      setError(true)
      setErrorMessage(data.message)
      setLoading(false)
    }
    setErrorMessage("Welcome to world of secrets")
    setLoading(false)
  }
  return (
    <div className=' max-w-lg m-auto my-20'>
      <h1 className='text-center text-3xl font-bold my-2 '>Sign-in</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 '>
          <input className='bg-slate-200 p-2 rounded-lg' id='email' type='email' placeholder='email' onChange={HandleChange} required />
          <input className='bg-slate-200 p-2 rounded-lg' id='password' type='password' placeholder='password' onChange={HandleChange} required />
          <button className='bg-slate-700 p-2 rounded-md text-white' disabled={loading}>{loading ? "...Laoding" : "Sign in"}</button>
        </div>
      </form>
      <div>
      <div className="flex gap-2">
        <p>Dont Have an account?</p>
        <Link to={'/sign_up'}><span className="text-blue-400">Sign-up</span></Link>
      </div>
        <p>{errormsg}</p>
      </div>
    </div>
  )
}

export default Sign_in