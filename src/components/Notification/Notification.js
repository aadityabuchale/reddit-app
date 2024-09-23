import React from 'react'
import styles from "./Notification.module.css"
import Button from "../Button/Button"
import logo from "../../Assets/default_avatar.png"
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeNotification } from '../../MyStore/action'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Notification() {
  const { isNotify, isDark } =  useSelector((state)=>state.UISetter)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notifyRef = useRef()
  const [isFirst, setIsFirst] = useState(false)

  useEffect(()=>{
    if(!isFirst){
      setIsFirst(true)
      return
    }
    if(notifyRef?.current && isFirst){
      window.addEventListener("click", (e)=>{
        if(notifyRef?.current && !notifyRef?.current.contains(e.target)){
          dispatch(closeNotification())
        }
      })
    }

    return ()=>{
      window.removeEventListener("click", ()=>{})
    }

  },[notifyRef.current])

  return (
    <div className={styles.notification} ref={notifyRef} style={{top: `${isNotify.top}px`, left: `${isNotify.left}px`, backgroundColor: isDark.backgroundColor || "#fff", color: isDark.color}}>
        <div className={styles.notificationTitle}>
            <div>Notifications</div>
        </div>
        <div className={styles.notificationContent}>
            <img src={logo} />
            <p>You don&apos;t have any activity yet</p>
            <p style={{color: isDark.childColor || "#434343"}}>That&apos;s ok, maybe you just need the right inspiration. Try posting in r/CasualConversation , a popular community for discussion.</p>
            <Button m="15px 0 0 0" p="10px 20px" br="25px" bc={isDark.color || "#0079d3"} hbc={isDark.color || "#0079d3"} c={isDark.switchColor || "#fff"} fs="0.9rem" fw="500" onClick={()=>{navigate('/r/BlueprintBarn'), dispatch(closeNotification())}}>Visit r/BlueprintBarn</Button>
        </div>
    </div>
  )
}

export default Notification