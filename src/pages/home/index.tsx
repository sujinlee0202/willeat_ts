import { useEffect } from 'react'
import { initMap } from '../../api/naver-map'
import Login from '../../components/Login'
import SideBar from '../../components/SideBar'

const Home = () => {
  useEffect(() => {
    // 첫 시작 시 현재 위치를 기준으로 naver map 로드
    const success = (pos: GeolocationPosition) => {
      let crd = pos.coords
      initMap(crd.latitude, crd.longitude)
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  return (
    <>
      <SideBar />
      <div id='map' className='w-full h-[100vh]'></div>
      <Login />
    </>
  )
}

export default Home