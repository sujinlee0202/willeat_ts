import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { getPlace } from "../../api/firebase"
import PlaceCard from "../PlaceCard"
import PlaceDetail from "../PlaceDetail"
import { Place } from "../../types/Place"
import { AiOutlineClose, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'

const SideBar = () => {
  const [place, setPlace] = useState([])
  const [openPlaceDetail, setOpenPlaceDetail] = useState(false)
  const [close, setClose] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getPlace().then((item: any) => setPlace(item))
  }, [])

  const onClickHome = () => setOpenPlaceDetail(false)

  const onClickPlaceCard = (place: Place) => {
    setOpenPlaceDetail(true)
    navigate(`/search/${place.id}`, {
      state: {place}
    })
  }

  const onClickCloseDetail = () => setOpenPlaceDetail(false)
  const onClickCloseButton = () => setClose(prev => !prev)

  return (
    <nav className={`absolute top-0 left-0 z-10 w-96 bg-white h-full flex flex-col items-center border-r
      transition-all duration-500 ease-in-out ${close && (openPlaceDetail ? '-left-[768px]' : '-left-[384px]')}`}>
      <div className="w-full border-b flex items-center justify-center h-24 py-4">
        <Link to='/' className='text-orange-400 font-bold text-4xl p-1' onClick={onClickHome}>WillEat</Link>
      </div>
      <ul className="flex flex-col w-full overflow-y-scroll">
        {place.map((place: Place) => <PlaceCard key={place.id} place={place} onClickPlaceCard={() => onClickPlaceCard(place)} />)}
      </ul>
      {openPlaceDetail && (
        <>
          <PlaceDetail />
          <button 
            className={`w-10 h-10 absolute border border-l-0 bg-white top-4 left-[768px] flex items-center justify-center rounded-r-lg hover:bg-blue-50 `}
            onClick={onClickCloseDetail}
          >
            <AiOutlineClose />
          </button>
        </>
      )}
      <button 
        className={`h-12 absolute top-1/2 ${openPlaceDetail ? 'left-[768px]' : 'left-[384px]'} bg-white hover:bg-blue-50 
          z-20 border border-l-0 rounded-r-lg px-0.5 py-1 -translate-y-1/2`}
        onClick={onClickCloseButton}
      >
        {close ? <AiOutlineRight className="text-sm" /> : <AiOutlineLeft className="text-sm" />}
      </button>
    </nav>
  )
}

export default SideBar