import { Link } from "react-router-dom"
const Sign_up = () => {
  return (
    <div className='max-w-lg mx-auto'>
    <h1 className='text-center font-semibold py-10 text-3xl '>Sign up</h1>
   <div className='flex flex-col gap-3'> 
    <input type='text' placeholder='username' className=' bg-slate-200 rounded-lg p-2' />
    <input type='text' placeholder='email' className='bg-slate-200 rounded-lg p-2' />
    <input type='password' placeholder='password' className='bg-slate-200 rounded-lg p-2' />
    <button className='bg-red-500  px-4 py-1 rounded-lg text-white hover:opacity-80'>Submit</button>
    <div className="flex gap-2">
      <p>Have an account?</p>
      <Link to={'/sign_in'}><span className="text-blue-400">Sign-In</span></Link>
    </div>
    </div>
    
  </div>
  )
}

export default Sign_up