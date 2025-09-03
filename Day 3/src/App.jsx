import React, { useEffect, useState } from 'react'
import 'animate.css'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'remixicon/fonts/remixicon.css'

const API_KEY = "UrFOv5o9Z6aCXinfqanCi2tDdgHcOYCrpVUyAsTqAqW7pYBeP3TRlwaU"

const App = () => {

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("flower")

  const fetchImage = async () => {
    setLoading(true)
    try {
      const options = {
        headers: {
          Authorization: API_KEY
        }
      }

      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`,
        options
      )

      setPhotos([
        ...photos,
        ...res.data.photos
      ])

    } catch (error) {
      toast.error("failed to fetch images", { position: "top-center" })
    }

    finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    setPage(page + 1)
  }

  const search = (e) => {
    e.preventDefault()
    const q = e.target[0].value.trim()
    setPhotos([])
    setQuery(q)
    setPage(1)
  }

  useEffect(() => {
    fetchImage()
    // eslint-disable-next-line
  }, [page, query])

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4 gap-8 animate__animated animate__fadeIn'>
      
      {/* Heading */}
      <h1 className='text-3xl sm:text-4xl font-bold text-indigo-600 text-center'>
        📷 Image Gallery
      </h1>

      {/* Search Form */}
      <form 
        onSubmit={search} 
        className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 w-full sm:w-auto"
      >
        <input 
          placeholder='Search Image here'
          className='p-3 bg-white rounded-lg sm:rounded-l-lg sm:rounded-r-none w-full sm:w-[300px] md:w-[400px] focus:outline-indigo-500' 
        />
        <button 
          className='bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-600 text-white font-black py-3
          px-6 sm:px-8 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:scale-105 transition-transform w-full sm:w-auto'
        >
          Search
        </button>
      </form>

      {/* No results */}
      {photos.length === 0 && !loading && 
        <h1 className='text-xl sm:text-2xl md:text-3xl font-semibold text-gray-600 text-center'>
          Search result not found
        </h1>
      }

      {/* Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full sm:w-11/12 md:w-9/12'>
        {photos.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow hover:shadow-lg transition">
            <img 
              src={item.src.medium} 
              alt={item.alt} 
              className='rounded-t-lg h-[200px] object-cover w-full hover:scale-110 transition-transform duration-300' 
            />
            <div className='p-3'>
              <h1 className='text-base md:text-lg text-gray-600 font-medium text-center capitalize'>
                {item.photographer}
              </h1>
              <a 
                target='_blank' 
                rel="noopener noreferrer"
                href={item.src.original} 
                className='mt-3 block bg-green-400 cursor-pointer py-2 font-bold rounded-lg text-center hover:scale-105 transition-transform duration-300'
              >
                <i className='ri-download-line mr-1'>Download</i>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Loader */}
      {loading &&
        <i className='ri-loader-line text-4xl text-gray-400 animate-spin' />
      }

      {/* Load More button */}
      {photos.length > 1 &&
        <button 
          className='bg-rose-500 py-3 px-12 sm:px-16 rounded-lg font-medium text-white cursor-pointer 
          hover:scale-105 transition-transform duration-300'
          onClick={loadMore}
        >
          Load More
        </button>
      }

      <ToastContainer />
    </div>
  )
}

export default App
