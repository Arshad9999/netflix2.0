import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './Screens/HomeScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginScreen from "./Screens/LoginScreen";
import { subscribeToUser, firebaseConfigured } from "./firebase";
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./Screens/ProfileScreen";

function App() {
  const user = useSelector(selectUser)
    const dispatch = useDispatch()

  useEffect(()=>{
    const unsubscribe = subscribeToUser((userAuth) => {
        if(userAuth) {
            // logged in
            dispatch(login({
                uid: userAuth.uid,
                email: userAuth.email,
            }))
        } else {
            // Logged out
            dispatch(logout())
        }
    })
      return unsubscribe
  }, [dispatch])

  return (
      <div className="app">
          {!firebaseConfigured && <p role="status">Sign-in is not configured for this learning demo.</p>}
          <Router>
              {!user ? (
                  <LoginScreen />
              ) : (
                  <Routes>
                      <Route path="/profile" element={<ProfileScreen />} />
                      <Route path="/" element={<HomeScreen />} />
                      <Route path="*" element={<p>Page not found. <a href="/">Return home</a></p>} />
                  </Routes>
              )}
          </Router>
      </div>
  );
}

export default App;
