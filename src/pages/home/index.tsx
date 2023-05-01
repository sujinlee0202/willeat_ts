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