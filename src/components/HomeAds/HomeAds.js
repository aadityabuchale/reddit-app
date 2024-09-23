import React from 'react'
import styles from "./HomeAds.module.css"
import premumlogolight from "../../Assets/Premium Embelem.png"
import premumlogodark from "../../Assets/Premium Embelem dark.png"
import banner from "../../Assets/home-banner.png"
import bannerLogo from "../../Assets/snoo-home.png"
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { createCommunity, setWarningMessages } from '../../MyStore/action'
import { useNavigate } from 'react-router-dom'

function HomeAds() {
    const { isPremium } = useSelector((state)=>state.UserSetter)
    const { messages } = useSelector((state)=>state.WarningSetter)
    const { isDark } = useSelector((state)=>state.UISetter)
    const dispatch = useDispatch()
    const navigate = useNavigate()

  return (
    <>
        <div className={styles.premiumContainer} style={{backgroundColor: isDark.backgroundColor || "#fff", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #bbb", color: isDark.color}}>
            <div className={styles.premiumTitle}>
                <img src={isDark ? premumlogodark : premumlogolight}/>
                <div>
                    <p>Reddit Premium</p>
                    <p>The best Reddit experience</p>
                </div>
            </div>
            <div>
                <Button m="10px" w="calc(100% - 20px)" c="#fff" bc="#ff4500" p="5px 10px" br="50px" fs="1rem" fw="500" onClick={()=> !isPremium ? navigate("/premium") : dispatch(setWarningMessages([...messages, {message: "Already a Premium Member.", timestamp: Date.now(), color: "#46d160", emoji: "happy"}]))}>{isPremium ? "Hello! Prime Member" : "Try Now"}</Button>
            </div>
        </div>
        <div className={styles.HomeContainer} style={{backgroundColor: isDark.backgroundColor || "#fff", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #bbb", color: isDark.color}}>
            <div style={{backgroundImage: `url(${banner})`}} className={styles.banner}></div>
            <div className={styles.bannername}>
                <img src={bannerLogo}/>
                <p>Home</p>
            </div>
            <div className={styles.bannerMessage} style={{color: isDark.childColor || "#1C1C1C"}}>
                <p>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
            </div>
            <hr style={{borderColor: isDark.borderColor || "#ddd"}}></hr>
            <Button w="calc(100% - 20px)" m="5px 10px" p="7px 15px" c={isDark.switchColor || "#fff"} bc={isDark.color || "#006cbf"} hbc={isDark.color || "#006cbfdd"} br="50px" fs="0.9rem" fw="500" onClick={()=>navigate("/submit")}>Create Post</Button>
            <Button w="calc(100% - 20px)" m="10px 10px 15px 10px" p="6px 15px" c={isDark.color || "#006cbf"} bc="transparent" hbc="rgba(0,121,211,0.05)" br="50px" fs="0.9rem" fw="500" b={isDark ? `1px solid ${isDark.color}` : "1px solid #006cbf"} onClick={()=>dispatch(createCommunity(true))}>Create Community</Button>
        </div>
        <div className={styles.userAgreement} style={{backgroundColor: isDark.backgroundColor || "#fff", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #bbb", color: isDark.color}}>
            <div style={{color: isDark.color || "#1A1A1B"}}>
                <div>
                    <p>User Agreement</p>
                    <p>Privacy Policy</p>
                </div>
                <div>
                    <p>Content Policy</p>
                    <p>Moderator Code of Conduct</p>
                </div>
            </div>
            <hr style={{borderColor: isDark.borderColor || "#ddd"}}></hr>
            <div style={{color: isDark.color || "#1A1A1B"}}>
                <div>
                    <p>English</p>
                    <p>Français</p>
                    <p>Italiano</p>
                </div>
                <div>
                    <p>Deutsch</p>
                    <p>Español</p>
                    <p>Português</p>
                </div>
            </div>
            <hr style={{borderColor: isDark.borderColor || "#ddd"}}></hr>
            <div style={{color: isDark.color || "#1A1A1B"}}>
                <p>Reddit, Inc. © 2023. All rights reserved.</p>
            </div>
        </div>
    </>
  )
}

export default HomeAds