import React from 'react'
import styles from './hover.module.css'
import Button from "../Button/Button"
import { useSelector } from 'react-redux'
import postLogo from "../../Assets/Add Post Logo.png"

function ChannelHover({ showPopUp, setIsPopUpHover }) {
    const { isDark } = useSelector((state)=>state.UISetter)
  return (
    <div className={styles.channelHover} onMouseOver={()=>setIsPopUpHover(true)} onMouseOut={()=>setIsPopUpHover(false)} style={{top: `${showPopUp.top}px`, left: `${showPopUp.left}px`, backgroundColor: isDark.backgroundColor || "#fff", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd", color: isDark.color}}>
        <div className={styles.channelTitle}>
            <img src={showPopUp.image}/>
            <p>{showPopUp.type==="user" ? "u" : "r"}/{showPopUp.name}</p>
        </div>
        {
            showPopUp.type === "user" &&
            <div className={styles.userLogo}>
                <img src={postLogo} />
                <p>{showPopUp.name}</p>
            </div>
        }
        <div className={styles.membersInfo}>
            <div>
                <p>{showPopUp.type==="user" ? "25" : "11 M"}</p>
                <p style={{color: isDark.childColor || "#576f76"}}>{showPopUp.type==="user" ? "Karma" : "Members"}</p>
            </div>
            <div> 
                <p>{showPopUp.type==="user" ? "12" : "2.5 K"}</p>
                <p style={{color: isDark.childColor || "#576f76"}}>{showPopUp.type==="user" ? "Karma" : "Online"}</p>
            </div>
        </div>
        <div className={styles.channelInfo}>This is the official r/{showPopUp.name} page.</div>
        <Button w="100%" p="7px 10px" m="15px 0 5px 0" br="50px" bc={isDark.color || "#006cbf"} c={isDark.switchColor || "#fff"}>{showPopUp.type==="user" ? "Follow" : "View Community"}</Button>
    </div>
  )
}

export default ChannelHover