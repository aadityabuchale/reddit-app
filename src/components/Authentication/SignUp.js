import React, { useEffect, useState } from 'react'
import styles from "./Auth.module.css"
import { createPortal } from 'react-dom'
import google from "../../Assets/Google-logo.png"
import github from "../../Assets/GitHub_logo.png"
import Button from "../Button/Button"
import { AiOutlineClose } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { MdDone } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { closeAuthentication, openAuthentication } from '../../MyStore/action'
import useAuth from '../../useHooks/useAuth'
import { ThreeDots } from  "react-loader-spinner"
import useFirebaseAuth from '../../firebase/useFirebaseAuth'

function SignUp() {
    const { authError, user } = useSelector((state)=>state.UserSetter)
    const dispatch = useDispatch()
    const { signUp } = useAuth()
    const { signInwithGoogle, signInwithGithub } = useFirebaseAuth()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [formState, setFormState] = useState("Email")

    let handleOnChange = ( email ) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( re.test(email) ) {
            setIsValidEmail(true)
        }
        else {
            setIsValidEmail(false)
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        setIsError('')
        setIsSubmit(true)
        signUp(name, email, password)
    }

    useEffect(()=>{
        if(isSubmit){
            if(authError){
                setIsError(authError)
                setIsSubmit(false)
            }
            if(user){
                setIsError('')
                let time = setTimeout(()=>{
                    dispatch(closeAuthentication())
                    clearTimeout(time)
                },500)
            }
        }
    },[ authError, user ])

    useEffect(()=>{
        handleOnChange(email)
    },[email])

    let ButtonStyle = {m:"10px 0", w:"100%", h:"40px", br:"50px", c:"#fff", fs:"1rem", fw:"500", bc:"#D93A00", hbc:"#D03A00"}

    return (
        createPortal(
            <div className={styles.authDiv}>
                <div className={styles.closeDiv} onClick={()=>{
                    if(formState==="Email"){
                        dispatch(closeAuthentication())
                    }
                    else{
                        setFormState("Email")
                    }
                    }}>{formState==="Email" ? <AiOutlineClose className={styles.closeBtn} /> : <BiArrowBack className={styles.closeBtn} />}</div>
                {
                    formState==="Email" ?
                    <div className={styles.wrapper}>
                        <div className={styles.formType}>Sign Up</div>
                        <p className={styles.terms}>By continuing, you are setting up a Reddit account and agree to our <Link>User Agreement</Link> and <Link>Privacy Policy.</Link></p>
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
                        <form onSubmit={(e)=>{
                            e.preventDefault()
                            if(!isValidEmail) return
                            setFormState("UserName")
                        }}>
                            <div className={styles.inputContainer} style={{border: isValidEmail ? "1px solid #0079d3" : email && "1px solid #ddd"}}>
                                <label style={{fontSize: email && "0.75rem", top: email && "0"}} htmlFor="email">Email</label>
                                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" id="email" />
                                {isValidEmail && <MdDone className={styles.emailValidTick}/>}
                            </div>
                        </form>
                        <Button {...ButtonStyle} dis={!isValidEmail} onClick={()=>{
                            setFormState("UserName")
                            setIsError('')
                            }}>Continue</Button>
                        <div className={styles.switchForm}>Already a redditor? <Link to="#" onClick={()=>dispatch(openAuthentication("login"))}>Log In</Link></div>
                    </div> 
                    :
                    <div className={styles.wrapper} style={{justifyContent: "space-between", padding: "20px 0"}}>
                        <div>
                            <p style={{fontSize: "1.25rem", fontWeight: "500", marginBottom: "5px"}}>Create your username and password</p>
                            <p style={{fontSize: "0.87rem", marginBottom: "25px"}}>Reddit is anonymous, so your username is what you&apos;ll go by here. Choose wisely—because once you get a name, you can&apos;t change it.</p>
                            <form onSubmit={(e)=>handleSubmit(e)}>
                                <div className={styles.inputContainer} style={{border: name && "1px solid #ddd"}}>
                                    <label style={{fontSize: name && "0.75rem", top: name && "0"}} htmlFor="username">Username</label>
                                    <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="username" />
                                </div>
                                <div className={styles.inputContainer} style={{border: password && "1px solid #ddd"}}>
                                    <label style={{fontSize: password && "0.75rem", top: password && "0"}} htmlFor="password">Password</label>
                                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" />
                                </div>
                                {isError && <div className={styles.error}>{isError}</div>}
                            </form> 
                        </div>
                        <Button {...ButtonStyle} dis={!name || !password} onClick={(e)=>handleSubmit(e)}>{isSubmit ? user ? <MdDone style={{fontSize: "1.5rem"}}/> : <ThreeDots height={10} color='#fff' width="100%"/> : "Continue"}</Button>
                    </div>
                }
            </div>
            , document.getElementById("reddit_portal"))
    )
}

export default SignUp