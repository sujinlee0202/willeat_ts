import { createContext, useEffect, useState } from "react";
import { onAuthStateChange } from "../api/firebase";
import { GoogleUser } from "../types/User";

export interface LoginContextType {
  user: GoogleUser | null;
  setUser: React.Dispatch<React.SetStateAction<GoogleUser | null>> | null;
}

export const loginContext = createContext<LoginContextType>({
  user: null,
  setUser: null
});

interface Props {
  children: React.ReactNode
}

const LoginProvider = ({children}: Props) => {
  const [user, setUser] = useState<GoogleUser | null>(null)

  useEffect(() => {
    onAuthStateChange((user: GoogleUser | null) => {
      setUser(user)
    })
  }, [])

  return (
    <loginContext.Provider value={{user, setUser}}>
      {children}
    </loginContext.Provider>
  )
}

export default LoginProvider