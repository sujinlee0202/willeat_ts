import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { GoogleUser } from "../types/User";
import { Place } from "../types/Place";
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APP_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app)

// database에 user 추가
const addUser = async (user: GoogleUser) => {
  return set(ref(database, `user/${user.uid}`), {
    id: user.uid,
    name: user.displayName,
    email: user.email,
  })
}

// google login
export const login = async () => {
  return signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    addUser(user)
    return user
  })
}

// google logout
export const logout = async () => {
  return signOut(auth).then(() => {})
}

// user state 변경 시 호출
export const onAuthStateChange = (callback: (user: GoogleUser | null) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null
    callback(updatedUser)
  })
}

// user가 admin인지 판별
const adminUser = async (user: GoogleUser) => {
  return get(ref(database, 'admin')).then((snapshot) => {
    if(snapshot.exists()) {
      const admin = snapshot.val()
      const isAdmin = admin.includes(user.uid)
      return {...user, isAdmin} 
    }
    return user
  })
}

// db에 place 추가
export const addNewPlace = (place: Place, url: string[]) => {
  const id = uuidv4()
  return set(ref(database, `place/${id}`), {
    ...place,
    id: id,
    imageUrl: url,
    title: place.title,
    category: place.category,
    description: place.description,
  })
}