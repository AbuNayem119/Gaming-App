import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './firebase.init'
const provider = new GoogleAuthProvider();

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

  // Set Dark Mode
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const [user, setUser] = useState(null)
  // console.log(user)
  const [loading, setLoading] = useState(true)

  // Create a user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Login user with Google
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  }

  // Log Out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    })
    return () => {
      unsubscribe();
    }
  }, [])

  // Load game data from json
  // const [gamedata, setGamedata] = useState([])

  // useEffect(() => {
  //   fetch('/gamedata.json')
  //     .then(res => res.json())
  //     .then(data => setGamedata(data))
  // }, [])

  const allInfo = {
    // gamedata,
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    loginUser,
    loginWithGoogle,
    logOut,
    darkMode,
    setDarkMode,
    toggleDarkMode
  }

  return (
    <AuthContext.Provider value={allInfo}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {}

export default AuthProvider