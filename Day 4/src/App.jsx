import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import 'animate.css'
import getYouTubeID from 'get-youtube-id'
import { toast, ToastContainer } from 'react-toastify'

const urlModel = [
  { width: 120, height: 90, url: "https://img.youtube.com/vi", fileName: "default.jpg" },
  { width: 320, height: 180, url: "https://img.youtube.com/vi", fileName: "mqdefault.jpg" },
  { width: 480, height: 360, url: "https://img.youtube.com/vi", fileName: "hqdefault.jpg" },
  { width: 640, height: 480, url: "https://img.youtube.com/vi", fileName: "sddefault.jpg" },
  { width: 1280, height: 720, url: "https://img.youtube.com/vi", fileName: "maxresdefault.jpg" },
]

const App = () => {
  const [url, setUrl] = useState("")
  const [thumbnails, setThumbnails] = useState([])

  const fetchThumbnail = (e) => {
    e.preventDefault()
    const videoId = getYouTubeID(url)

    if (videoId) {
      const model = urlModel.map((item) => ({
        ...item,
        url: `${item.url}/${videoId}/${item.fileName}`
      }))
      setThumbnails(model)
    } else {
      toast.error("Please provide a valid YouTube URL", { position: "top-center" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-black">
          Youtube Thumbnail Downloader
        </h1>
        <form
          className="flex flex-col md:flex-row gap-4 mt-8 justify-center"
          onSubmit={fetchThumbnail}
        >
          <input
            type="url"
            required
            className="bg-white p-3 rounded-lg w-full md:w-[450px]"
            placeholder="Enter YouTube video URL"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="p-3 rounded-lg bg-indigo-600 text-white font-medium flex items-center justify-center">
            <i className="ri-search-line mr-1"></i>
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-9/12 mx-auto mt-12">
        {thumbnails.map((item, index) => (
          <div className="bg-white rounded-lg shadow" key={index}>
            <img
              src={item.url}
              alt=""
              className="w-full h-[200px] md:h-[250px] object-cover rounded-t-lg"
            />
            <div className="bg-white p-3 rounded-b-xl">
              <h1 className="text-lg md:text-xl font-medium">
                {item.width} × {item.height}
              </h1>
              <a href={item.url} target="_blank" rel="noreferrer">
                <button className="p-2 md:p-3 rounded-lg bg-green-500 text-white font-medium w-full mt-3 flex items-center justify-center">
                  <i className="ri-download-line mr-1"></i>
                  Download
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  )
}

export default App
