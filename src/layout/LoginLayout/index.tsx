import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginContext } from '../../context/loginContext'

interface Props {
  children: React.ReactNode
  requireAdmin: boolean
}

const LoginLayout = ({children, requireAdmin}: Props) => {
  const {user} = useContext(loginContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(user === undefined) {
      //
    } else if(!user || (requireAdmin && !user.isAdmin)) {
      navigate('/')
    }
  }, [user, navigate, requireAdmin])

  return (
    <>
      {children}
    </>
  )
}

export default LoginLayout