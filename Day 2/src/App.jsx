import React, { useEffect, useState } from 'react'
import "remixicon/fonts/remixicon.css"
import "animate.css"
import { toast, ToastContainer } from 'react-toastify'

 const data = [
    {
      label: "Illustration",
      value: "illustration",
      url: "https://api.dicebear.com/7.x/avataaars/svg?seed="
    },

    {
      label: "Cartoon",
      value: "cartoon",
      url: "https://api.dicebear.com/7.x/adventurer/svg?seed="
    },

    {
      label: "Sketchy",
      value: "sketchy",
      url: "https://api.dicebear.com/7.x/croodles/svg?seed="
    },

    {
      label: "Robots",
      value: "robots",
      url: "https://api.dicebear.com/7.x/bottts/svg?seed="
    },

    {
      label: "Art",
      value: "art",
      url: "https://api.dicebear.com/7.x/pixel-art/svg?seed="
    },

    {
      label: "Male",
      value: "male",
      url: "https://randomuser.me/api/portraits/men"
    },

    {
      label: "Female",
      value: "female",
      url: "https://randomuser.me/api/portraits/women"
    },




  ]
const App = () => {

  const [src,setSrc] = useState(null)
  const [option,setOption]= useState("male")

  const genrateNumforPerson = ()=>{
   const r=  Math.floor(Math.random()*99)
   return r
  }

  const genrateAvatar= ()=>{

   const obj= data.find((item)=>item.value === option)
   const url = obj.url

   if(option === "male" || option === "female")
   {
    const imageUrl = `${url}/${genrateNumforPerson()}.jpg`
    setSrc(imageUrl)

   }
else {
   const uniqueValue = Date.now()
   const imageUrl = `${url}${uniqueValue}`
  setSrc(imageUrl);
   
}

   
    
  }

  const onOptionChange=(e)=>{
    const value = e.target.value
    setOption(value)
    genrateAvatar()
  }

  const download = (url)=>{
    const a = document.createElement("a")
    a.href = url
    a.download=`${Date.now()}.jpg`
    a.click()
    a.remove()
  }

  const copy = (url)=>{
    navigator.clipboard.writeText(url)
    toast.success("Image url copied" ,{position :"top-center"})
  }

  useEffect(()=>{
    genrateAvatar()
  },[option])

 


  return (
    <div className='animate__animated animate__fadeIn overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
    flex items-center justify-center  text-white '>
      <div className='animate__animated animate__slideInUp animate__faster gap-6 flex flex-col justify-center items-center w-full max-w-md  rounded-2xl shadow-xl backdrop-blur-xl border-slate-700 py-10'>
        <img src={src || '/avt.jpg'}
          className='w-32 h-32 rounded-full border-4 bg-slate-700 shadow-lg object-cover ' alt="" />

        <div className='text-center'>

          <h1 className='font-bold  text-3xl tracking-wide '>Avatar Generator</h1>
          <h1 className='text-slate-300'>Genrate unlimited avatars for your website</h1>
        </div>

        <div className='w-full space-y-6 '>
          <select className='bg-slate-900/60 w-full p-3 rounded-xl  ' value={option}
          onChange={onOptionChange} >
            {
              data.map((item, index) => (
                <option value={item.value} key={index}>{item.label} </option>
              ))
            }
          </select>

          <div className='bg-slate-900/60 w-full p-3 rounded-xl '>

           {src}

          </div>
        </div>

        <div className='flex w-full gap-4'>
          <button onClick={genrateAvatar}
           className=' flex-1 bg-gradient-to-r from-rose-500 to-orange-600 font-medium rounded-lg py-2 hover:scale-105
         transition-transform '>

            <i className='ri-arrow-right-up-line mr-1'></i>
            Change

          </button>

          <button onClick={()=>download(src)}
           className=' flex-1 bg-gradient-to-r from-green-500 to-cyan-600 font-medium rounded-lg py-2 hover:scale-105
         transition-transform '>

            <i className='ri-download-line mr-1'></i>
            Download

          </button>

          <button
          onClick={()=>copy(src)}
           className=' flex-1 bg-gradient-to-r from-orange-500 to-amber-600 font-medium rounded-lg py-2 hover:scale-105
         transition-transform '>

            <i className='ri-file-copy-line mr-1'></i>
            Copy

          </button>
        </div>



      </div>

    <ToastContainer/>
    
    </div>
  )
}

export default App