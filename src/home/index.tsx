import { useEffect } from 'react'
import { initMap } from '../api/naver-map'

const Home = () => {
  useEffect(() => {
    // 첫 시작 시 현재 위치를 기준으로 naver map 로드
    const success = (pos: any) => {
      let crd = pos.coords
      initMap(crd.latitude, crd.longitude)
    }

    navigator.geolocation.getCurrentPosition(success)
  }, [])

  return (
    <div id='map' className='w-full h-[100vh]'></div>
  )
}

export default Home