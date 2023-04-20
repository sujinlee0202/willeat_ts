import { useContext, useState } from 'react'
import { login, logout } from '../../api/firebase'
import { loginContext } from '../../context/loginContext'

const Login = () => {
  const {user, setUser} = useContext(loginContext)
  const [openMenu, setOpenMenu] = useState(false)

  const onClickLogin = () => {
    login().then((user) => setUser && setUser(user))
  }

  const onClickLogout = () => {
    logout().then(() => setUser && setUser(null))
    setOpenMenu(false)
  }

  const onClickOpenMenuModal = () => {
    setOpenMenu(prev => !prev)
  }

  return (
    <>
      <div className='absolute top-4 right-4 flex gap-2'>
        {!user && <button onClick={onClickLogin} className='w-36 bg-orange-400 px-2 py-1 rounded-xl text-white hover:bg-orange-600'>Login</button>}
        {user 
          && user.photoURL 
          && <img src={user.photoURL} alt='google user' className='w-8 h-8 rounded-full' onClick={onClickOpenMenuModal}/>}
      </div>
      {user && openMenu &&  (
        <div className='absolute top-16 right-4 bg-white w-36 p-2 rounded-xl border text-sm flex flex-col gap-1'>
          {user && user.isAdmin && <button className='w-full pb-1 border-b hover:text-orange-600 hover:font-bold'>맛집 추가하기</button>}
          {user && <button onClick={onClickLogout} className='w-full hover:text-orange-600 hover:font-bold'>Logout</button>}
        </div>
      )}
    </>
  )
}

export default Login