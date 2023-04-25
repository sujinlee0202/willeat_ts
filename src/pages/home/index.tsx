import { useEffect } from 'react'
import { initMap } from '../../api/naver-map'
import Login from '../../components/Login'
import SideBar from '../../components/SideBar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <SideBar />
      <Outlet />
      <Login />
    </>
  )
}

export default Home