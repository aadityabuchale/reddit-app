import React, { useEffect } from 'react'
import styles from "./Premium.module.css"
import premiumBanner from "../../Assets/premiumHero.jpg"
import premiumTitle from "../../Assets/RedditPemium.png"
import Button from '../Button/Button'
import pre1 from "../../Assets/premium-ad-free1.png"
import pre2 from "../../Assets/premium-avatars2.png"
import pre3 from "../../Assets/premium-lounge3.png"
import pre4 from "../../Assets/premium-app-icons4.png"
import { useDispatch, useSelector } from 'react-redux'
import { closeAuthentication, openAuthentication, setAside, setPremium, setWarningMessages, startLoading } from '../../MyStore/action'
import { useNavigate } from 'react-router-dom'

function Premium() {
    const { messages } = useSelector((state)=>state.WarningSetter)
    const { userToken, user } = useSelector((state)=>state.UserSetter)
    const { isDark } = useSelector((state)=>state.UISetter)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(setAside(false))
        window.scrollTo({top: 0,behavior: 'smooth'})
        document.title= "Reddit Premium - Enjoy Exclusive Features and VIP Status"
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
        }
    },[])

    useEffect(()=>{
        if(user){
            dispatch(closeAuthentication())
        }
    },[user])

    const addSubscription = ()=>{
        if(!userToken){
            dispatch(startLoading())
            dispatch(openAuthentication("login"))
            return
        }
        navigate("/")
        dispatch(setPremium(true))
        dispatch(setWarningMessages([...messages, {message: "Premium Subscription Added.", timestamp: Date.now(), color: "#46d160", emoji: "happy"}]))
    }
  return (
    <div className={styles.premium} style={{backgroundColor: isDark.backgroundColor}}>
        <div style={{backgroundImage: `url(${premiumBanner})`}} className={styles.bannerDiv}>
            <div className={styles.bannerContainer}>
                <img src={premiumTitle} />
                <p className={styles.premiumTitle}>Help support Reddit and get VIP treatment and exclusive access.</p>
                <div className={styles.buttons}>
                    <Button bc="transparent" c="#fff" b="1px solid #fff" br="50px" p="10px 0" w="50%" fs="1rem" fw="500" mw="225px" onClick={()=>addSubscription()}>$5.99/Month</Button>
                    <Button bc="#ff4500" c="#fff" p="8px 10px" br="50px" fs="1rem" fw="500" w="50%" mw="225px" onClick={()=>addSubscription()}>$49.99/Year<Button bc="#fff" m="0 10px" p="4px 10px" br="50px" c="#ff4500" fw="bold" fs="0.875rem">Save 30%</Button></Button>
                </div>
                <p className={styles.premiumterms}>Subscriptions automatically renew</p>
            </div>
        </div>
        <div className={styles.premiumJoin}>
            <p className={styles.premiunJoinTitle} style={{color: isDark.color}}>Join Reddit Premium Today</p>
            <div className={styles.premiumAdsContainer}>
                <div className={styles.premiumAds} style={{backgroundColor: isDark.childbackgroundColor || "#f6f7f8"}}>
                    <img src={pre1}/>
                    <p style={{color: isDark.color || "#1C1C1C"}}>Ad-free Browsing</p>
                    <p style={{color: isDark.childColor || "#878A8C"}}>Enjoy redditing without interruptions from ads</p>
                </div>
                <div className={styles.premiumAds} style={{backgroundColor: isDark.childbackgroundColor || "#f6f7f8"}}>
                    <img src={pre2}/>
                    <p style={{color: isDark.color || "#1C1C1C"}}>Exclusive Avatar Gear</p>
                    <p style={{color: isDark.childColor || "#878A8C"}}>Outfit your avatar with the best gear and accessories</p>
                </div>
                <div className={styles.premiumAds} style={{backgroundColor: isDark.childbackgroundColor || "#f6f7f8"}}>
                    <img src={pre3}/>
                    <p style={{color: isDark.color || "#1C1C1C"}}>Members Lounge</p>
                    <p style={{color: isDark.childColor || "#878A8C"}}>Discover all the illuminati secrets in r/lounge</p>
                </div>
                <div className={styles.premiumAds} style={{backgroundColor: isDark.childbackgroundColor || "#f6f7f8"}}>
                    <img src={pre4}/>
                    <p style={{color: isDark.color || "#1C1C1C"}}>Custom App Icons*</p>
                    <p style={{color: isDark.childColor || "#878A8C"}}>Change your app icon to something more your style</p>
                </div>
            </div>
            <div className={styles.buttons}>
                <Button bc="transparent" c="#ff4500" b="1px solid #ff4500" br="50px" p="10px 0" w="50%" fs="1rem" fw="500" mw="225px" onClick={()=>addSubscription()}>$5.99/Month</Button>
                <Button bc="#ff4500" c="#fff" p="8px 10px" br="50px" fs="1rem" fw="500" w="50%" mw="225px" onClick={()=>addSubscription()}>$49.99/Year<Button bc="#fff" m="0 10px" p="4px 10px" br="50px" c="#ff4500" fw="bold" fs="0.875rem">Save 30%</Button></Button>
            </div>
            <p style={{color: isDark.childColor || "#7c7c7c"}} className={styles.premiumMessage}>Subscriptions automatically renew</p>
            <p style={{color: isDark.childColor || "#7c7c7c"}} className={styles.premiumMessage}>* Custom app icons are only available through a paid Reddit Premium subscription.</p>
        </div>
    </div>
  )
}

export default Premium