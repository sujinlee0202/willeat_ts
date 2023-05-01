import { useLocation } from "react-router-dom"
import ImageCarousel from "../ImageCarousel"
import { BiMap, BiTime } from 'react-icons/bi'

const PlaceDetail = () => {
  const location = useLocation()
  const { roadAddress, category, description, imageUrl, review, time, title } = location.state.place

  return (
    <div className='absolute top-0 left-96 z-10 w-96 bg-white h-full flex flex-col items-center border-r overflow-y-auto scrollbar'>
      <div className="w-full h-52 relative">
        {imageUrl && <ImageCarousel url={imageUrl} type='detail' />}
      </div>
      <div className="w-full flex flex-col items-center p-4 gap-1">
        <div className="flex items-center gap-2">
          <p className="font-bold text-xl">{title}</p>
          <p className="text-sm text-gray-400">{category}</p>
        </div>
        <p className="line-clamp-1 shrink-0 w-full text-center text-gray-500">{description}</p>
        <div className="flex items-center shrink-0 gap-2 w-full">
          <BiMap className="shrink-0" />
          <p className="line-clamp-1">{roadAddress}</p>
        </div>
        <div className="flex items-center shrink-0 gap-2 w-full mb-4">
          <BiTime className="shrink-0" />
          <p className="line-clamp-1">{time}</p>
        </div>
        <pre className="whitespace-pre-wrap font-sans pt-4 border-t">
          <div className="relative">
            <p className="mb-2 relative font-bold text-xl z-10 pl-1">리뷰</p>
            <div className="bg-orange-400 w-14 h-2 absolute bottom-0 z-0 opacity-80"></div>
          </div>
          {review}
        </pre>
      </div>
    </div>
  )
}

export default PlaceDetail