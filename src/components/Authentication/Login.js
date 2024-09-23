import React, { useEffect, useState } from 'react'
import styles from "./Auth.module.css"
import { createPortal } from 'react-dom'
import google from "../../Assets/Google-logo.png"
import github from "../../Assets/GitHub_logo.png"
import Button from "../Button/Button"
import { AiOutlineClose } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { closeAuthentication, openAuthentication, stopLoading } from '../../MyStore/action'
import useAuth from '../../useHooks/useAuth'
import { ThreeDots } from  "react-loader-spinner"
import LogoLoader from '../LogoLoader/LogoLoader'
import useFirebaseAuth from '../../firebase/useFirebaseAuth'

function Login() {
    const { isLoading } = useSelector((state)=>state.UISetter)
    const { authError, user } = useSelector((state)=>state.UserSetter)
    const dispatch = useDispatch()
    const { logIn } = useAuth()
    const { signInwithGoogle, signInwithGithub } = useFirebaseAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isError, setIsError] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)

    let handleSubmit = ()=>{
        if(!email || !password){
            setIsError(!email? "Enter a Valid Email" : "Enter a Valid Password")
            return
        }
        if(!isValidEmail){
            setIsError("Enter a Valid Email")
            return
        }
        setIsError('')
        setIsSubmit(true)
        logIn(email, password)
    }

    let handleOnChange = ( email ) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( re.test(email) ) {
            setIsValidEmail(true)
        }
        else {
            setIsValidEmail(false)
        }
    }

    useEffect(()=>{
        if(isSubmit){
            if(authError){
                setIsError(authError)
                setIsSubmit(false)
            }
            if(user){
                setIsError("")
                let time = setTimeout(()=>{
                    dispatch(closeAuthentication())
                    clearTimeout(time)
                },500)
            }
        }
    },[authError, user])
    
    useEffect(()=>{
        handleOnChange(email)
    },[email])

    useEffect(()=>{
        let timer = setTimeout(()=>{
            dispatch(stopLoading())
        },2000)

        return ()=>{
            clearTimeout(timer)
        }
    },[])

    return (
        createPortal(
            <div className={styles.authDiv}>
                {
                    isLoading ? 
                    <LogoLoader />
                    :
                    <>
                        <div className={styles.closeDiv} onClick={()=>dispatch(closeAuthentication())}><AiOutlineClose className={styles.closeBtn} /></div>
                        <div className={styles.wrapper}>
                            <div className={styles.formType}>Log In</div>
                            <p className={styles.terms}>By continuing, you are setting up a Reddit account and agree to our <Link to="https://www.redditinc.com/policies/user-agreement" target='_blank'>User Agreement</Link> and <Link to="https://www.reddit.com/policies/privacy-policy" target='_blank'>Privacy Policy</Link>.</p>
                            <div className={styles.socialAuth}>
                                <div className={styles.authtab} onClick={signInwithGoogle}>
                                    <img src={google}></img>
                                    <p>Continue with Google</p>
                                </div>
                                <div className={styles.authtab} onClick={signInwithGithub}>
                                    <img src={github}></img>
                                    <p>Continue with Github</p>
                                </div>
                            </div>
                            <div className={styles.seperator}>OR</div>
                            <form>
                                <div className={styles.inputContainer} style={{border: isValidEmail ? "1px solid #0079d3" : email && "1px solid #ddd"}}>
                                    <label style={{fontSize: email && "0.75rem", top: email && "0"}} htmlFor="email">Email</label>
                                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" id="email" />
                                    {isValidEmail && <MdDone className={styles.emailValidTick}/>}
                                </div>
                                <div className={styles.inputContainer} style={{border: password && "1px solid #ddd"}}>
                                    <label style={{fontSize: password && "0.75rem", top: password && "0"}} htmlFor="password">Password</label>
                                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" />
                                </div>
                                {isError && <div className={styles.error}>{isError}</div>}
                            </form>
                            <Button m="10px 0" w="100%" h="40px" br="50px" c="#fff" fs="1rem" fw="500" bc="#D93A00" hbc="#D03A00" onClick={handleSubmit}>{isSubmit ? user ? <MdDone style={{fontSize: "1.5rem"}}/> : <ThreeDots height={10} color='#fff' width="100%"/> :"Log In"}</Button>
                            <div className={styles.switchForm}>New to Reddit? <Link to="#" onClick={()=>dispatch(openAuthentication("signup"))}>Sign Up</Link></div>
                        </div>
                    </>
                }
            </div>
            , document.getElementById("reddit_portal"))
    )
}

export default Login