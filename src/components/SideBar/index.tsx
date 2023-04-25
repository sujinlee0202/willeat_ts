import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { getPlace } from "../../api/firebase"
import PlaceCard from "../PlaceCard"

const SideBar = () => {
  const [place, setPlace] = useState([])

  useEffect(() => {
    getPlace().then((item: any) => setPlace(item))
  }, [])

  return (
    <div className='absolute top-0 left-0 z-10 w-96 bg-white h-full flex flex-col items-center'>
      <div className="w-full border-b flex items-center justify-center h-24">
        <Link to='/' className='text-orange-400 font-bold text-4xl p-1'>WillEat</Link>
      </div>
      <ul className="flex flex-col w-full overflow-y-scroll">
        {place.map((place: any) => <PlaceCard key={place.id} place={place} />)}
      </ul>
    </div>
  )
}

export default SideBar