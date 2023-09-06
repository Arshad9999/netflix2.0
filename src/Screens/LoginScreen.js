import React, {useState} from 'react'
import './LoginScreen.css'
import SignupScreen from "./SignupScreen";

function LoginScreen() {
    const [signIn, setSignIn] = useState(false)
    return (
        <div className="loginScreen">
            <div className="loginScreen__background">
                <img className="loginScreen__logo" src="https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png" alt="Netflix Logo" />
                <button className="loginScreen__button" onClick={() => setSignIn(true)}>Sign In</button>
                <div className="loginScreen__gradient" />
            </div>
            <div className="loginScreen__body">
                {signIn ? (
                    <SignupScreen />
                ) : (
                <>
                    <h1>Unlimited films, TV<br/> programmes and more.</h1>
                    <h3>Watch anywhere. Cancel at any time.</h3>
                    <h4>Ready to watch? Enter your email to create or restart your membership.</h4>

                    <div className="loginScreen__searchform">
                    <form>
                        <input type="search" name="searchbar" />
                        <button className="loginScreen__getStarted">Get Started</button>
                    </form>
                </div>
                </>
                )}
            </div>
        </div>
    )
}

export default LoginScreen
