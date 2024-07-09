import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase'
const Profile = () => {
  const fileRef = useRef(null)
  const { currentUser } = useSelector((state) => state.user)
  const [image, setImage] = useState(undefined);
  const [imagePercent, setimagePercent] = useState(0);
  const [imageError, setimageError] = useState(false);
  const [formData, setformData] = useState({});

  console.log(formData);


  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on('state_Changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Uploading is ' + Math.round(progress) + '% done')
      setimagePercent(Math.round(progress))
    },
      (error) => {
        setimageError(true)
      },
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setformData({ ...formData, profilePicture: downloadURL })
        })
    )
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
        <img src={currentUser.profilePicture} alt="profile pic" className='h-24 w-24 self-center cursor-pointer rounded-full object-cover hover:opacity-70' onClick={() => fileRef.current.click()} />
        <p className='text-center'>{imageError ? (<span className='text-red-800'> Error uploading image</span>) : imagePercent > 0 && imagePercent < 100 ? (<span className='text-slate-700'>{"Uploading  " + imagePercent + "....."}</span>) : imagePercent === 100 ? (<span className='text-slate-700'>Image Uploaded successfully</span>) : ""}</p>
        <input defaultValue={currentUser.username} type='text' id='username' placeholder='username' className='bg-slate-100 rounded-lg p-3' />
        <input defaultValue={currentUser.email} type='email' id='email' placeholder='email' className='bg-slate-100 rounded-lg p-3' />
        <input type='password' id='password' placeholder='password' className='bg-slate-100 rounded-lg p-3' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
        <div className='flex justify-between mt-5'>
          <span className='text-red-700 cursor-pointer'>Delete account</span>
          <span className='text-red-700 cursor-pointer'>Sign Out</span>
        </div>
      </form>
    </div>
  )
}

export default Profile