import React, { useEffect } from 'react'
import { clickPlaceMap } from '../../api/naver-map'
import { useLocation } from 'react-router-dom'
import { convertGeo } from '../../api/tmap'

const SearchPlacePage = React.memo(() => {
  const { mapx, mapy } = useLocation().state.place

  useEffect(() => {
    convertGeo(mapx, mapy)
    .then(res => res.data)
    .then(item => clickPlaceMap(item.coordinate.lat, item.coordinate.lon))
  }, [mapx, mapy])

  return (
    <div id='map' className='w-full h-full'></div>
  )
})

export default SearchPlacePage