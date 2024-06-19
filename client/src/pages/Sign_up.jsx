import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import OAuth from '../components/OAuth.jsx'

const Sign_up = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      setError(true);
      return
    }
    navigate('/Sign_in')
  }
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-center font-semibold py-10 text-3xl '>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3'>
          <input type='text' placeholder='username' id="username" className=' bg-slate-200 rounded-lg p-2' onChange={handleChange} />
          <input type='email' placeholder='email' id="email" className='bg-slate-200 rounded-lg p-2' onChange={handleChange} />
          <input type='password' placeholder='password' id="password" className='bg-slate-200 rounded-lg p-2' onChange={handleChange} />
          <button className='bg-slate-700  px-4 py-1 rounded-md text-white hover:opacity-80' >{loading ? "Loading..." : "Signup"}</button>
         <OAuth />
        </div>
      </form>
      <div className="flex gap-2">
        <p>Have an account?</p>
        <Link to={'/sign_in'}><span className="text-blue-400">Sign-In</span></Link>
      </div>
      <p>{error && "Something went wrong!!..."}</p>
    </div>
  )
}

export default Sign_up