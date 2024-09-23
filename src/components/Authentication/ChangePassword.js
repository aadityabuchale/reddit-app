import React, { useEffect, useState } from 'react'
import styles from "./Auth.module.css"
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { closeAuthentication, setWarningMessages } from '../../MyStore/action'
import { AiOutlineClose } from "react-icons/ai"
import Button from '../Button/Button'
import useAuth from '../../useHooks/useAuth'
import { ThreeDots } from 'react-loader-spinner'
import { authError as AuthError } from '../../MyStore/action'

function ChangePassword() {
    const { user, userToken, authError } = useSelector((state)=>state.UserSetter)
    const { messages } = useSelector((state)=>state.WarningSetter)
    const { isDark }  = useSelector((state)=>state.UISetter)
    const { changePassword } = useAuth()
    const dispatch = useDispatch()
    const [currPass, setCurrPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const [isError, setIsError] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        if(currPass === newPass){
            setIsError("New Password should be distint from old!")
        }
        setIsError("")
        setIsSubmit(true)
        changePassword(user.name, user.email, currPass, newPass, userToken)
    }

    useEffect(()=>{
        if(isSubmit){
            if(authError){
                setIsError(authError)
                setIsSubmit(false)
                dispatch(AuthError(""))
            }
        }
    },[authError])

    useEffect(()=>{
        if(isSubmit){
            sessionStorage.setItem("AuthCredentials", JSON.stringify({data: user, token: userToken}))
            dispatch(closeAuthentication())
            dispatch(setWarningMessages([...messages, {message: "Password changed Successfully.", timestamp: Date.now(), color: "#46d160", emoji: "happy"}]))
        }
    },[userToken])

  return (
    createPortal(
        <div className={styles.authDiv} style={{backgroundColor: isDark.backgroundColor, color: isDark.color, border: isDark && `1px solid ${isDark.borderColor}`}}>
            <div className={styles.closeDiv} onClick={()=>{dispatch(closeAuthentication())}}><AiOutlineClose className={styles.closeBtn} /></div>
            <div className={styles.wrapper} style={{justifyContent: "space-between", padding: "20px 0"}}>
                <div>
                    <p style={{fontSize: "1.25rem", fontWeight: "500", marginBottom: "5px"}}>Welcome Back! {user.name}</p>
                    <p style={{fontSize: "0.87rem", marginBottom: "25px"}}>Worried about account privacy, tell us the oldpassword and newpassword we’ll reset your password..</p>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <div className={styles.inputContainer} style={{border: currPass && "1px solid #ddd", backgroundColor: isDark.childbackgroundColor}}>
                            <label style={{color: isDark.childColor ,fontSize: currPass && "0.75rem", top: currPass && "0"}} htmlFor="Oldpassword">Old Password</label>
                            <input style={{color: isDark.color}} value={currPass} onChange={(e)=>setCurrPass(e.target.value)} type="password" id="Old password" />
                        </div>
                        <div className={styles.inputContainer} style={{border: newPass && "1px solid #ddd", backgroundColor: isDark.childbackgroundColor}}>
                            <label style={{color: isDark.childColor ,fontSize: newPass && "0.75rem", top: newPass && "0"}} htmlFor="NewPassword">New Password</label>
                            <input style={{color: isDark.color}} value={newPass} onChange={(e)=>setNewPass(e.target.value)} type="password" id="NewPassword" />
                        </div>
                        {isError && <div className={styles.error}>{isError}</div>}
                    </form> 
                </div>
                <Button m="10px 0" w="100%" h="40px" br="50px" c="#fff" fs="1rem" fw="500" bc="#D93A00" hbc="#D03A00" dis={!currPass || !newPass} onClick={(e)=>handleSubmit(e)}>{isSubmit ? <ThreeDots height={10} color='#fff' width="100%"/> : "Continue"}</Button>
            </div>
        </div>
        , document.getElementById("reddit_portal"))
  )
}

export default ChangePassword