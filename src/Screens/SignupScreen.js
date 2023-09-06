import React, { useRef } from 'react'
import './SignupScreen.css'
import { auth } from '../firebase'

function SignupScreen() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const register = (evt) => {
        evt.preventDefault()
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        }).catch((error) => {
            alert(error.message)
        })
    }

    const login = (evt) => {
        evt.preventDefault()
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
            .then((authUser)=>{
            console.log(authUser)
        })
            .catch((error)=>{
            alert(error.message)
        })
    }

    return(
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <input type="text" ref={emailRef} name="email" placeholder="Your Email" />
                <input type="password" ref={passwordRef} name="password" placeholder="Your Password" />
                <button onClick={login}>Sign In</button>
                <h4>
                    <span className="signupScreen__greytext">Don't have an account?{' '}</span>
                    <span onClick={register} className="signupScreen__signupLink">Sign Up now.</span>
                </h4>
            </form>
        </div>
    )
}

export default SignupScreen
