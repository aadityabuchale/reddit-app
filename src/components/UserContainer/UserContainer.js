import React, { useState } from 'react'
import styles from "./UserContainer.module.css"
import AsideOption from '../AsideMenu/AsideOption'
import ExampleStrapiSwitch from '../Switch/Switch'
import AsideOptiontitle from '../AsideMenu/AsideOptiontitle'
import { FaRegCircleUser } from 'react-icons/fa6'
import { CgOptions } from 'react-icons/cg'
import { CgCommunity } from "react-icons/cg"
import { FiLogIn } from "react-icons/fi"
import { MdOutlinePolicy } from 'react-icons/md'
import { BsExclamationCircle } from "react-icons/bs"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import { GoTelescope } from "react-icons/go"
import { TbPremiumRights } from "react-icons/tb"
import { MdOutlineCampaign } from "react-icons/md"
import { TbTargetArrow } from "react-icons/tb"
import { HiOutlineShoppingBag } from "react-icons/hi"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { closeUserContainer, createCommunity, openAuthentication, removeUser, setTheme, setWarningMessages, startLoading } from '../../MyStore/action'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useFirebaseAuth from '../../firebase/useFirebaseAuth'

function UserContainer() {
    const { user, isOnline, isPremium, authType } = useSelector((state)=>state.UserSetter)
    const { messages } = useSelector((state)=>state.WarningSetter)
    const { isDark } = useSelector((state)=>state.UISetter)
    const { signOutUser } = useFirebaseAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userRef = useRef()
    const [isFirst, setIsFirst] = useState(false)
    const [isDrop, setIsDrop] = useState([])

    useEffect(()=>{
        if(!isFirst){
            setIsFirst(true)
            return
        }
        if(userRef?.current && isFirst){
            window.addEventListener("click", (e)=>{
                if(userRef?.current && !userRef?.current.contains(e.target)){
                    dispatch(closeUserContainer())
                }
            })
        }

        return ()=>{
            window.removeEventListener("click", ()=>{})
        }
    },[userRef.current])

    const pageBuilding = ()=>dispatch(setWarningMessages([...messages, {message: "Page Building under progress...", timestamp: Date.now(), color: "#ff4500", emoji: "sad"}]))

  return (
    <div className={styles.UserContainer} style={{padding: !user && "10px 0", backgroundColor: isDark ? isDark.backgroundColor : "#fff", color: isDark.color}} ref={userRef}>
        {   user ?
            <>
                <AsideOption hbc="transparent" icon={<FaRegCircleUser />} br="0" c={isDark.childColor || "#576f76"} bc="transparent" cu="auto">My Stuff</AsideOption>
                <AsideOption hbc={isDark.childbackgroundColor} br="0" p="0 30px 0 50px" d="flex" jc="space-between" cw="100%" cfw="500">Online Status <ExampleStrapiSwitch isChecked={isOnline} type="online"/> </AsideOption>
                <AsideOption hbc={isDark.childbackgroundColor} br="0" p="0 30px 0 50px" cfw="500" onClick={()=>{navigate(`/user/${user?.name}/${user?._id}`),dispatch(closeUserContainer())}}>Profile</AsideOption>
                <AsideOption hbc={isDark.childbackgroundColor} br="0" p="0 30px 0 50px" cfw="500" onClick={()=>dispatch(setWarningMessages([...messages, {message: "Features Coming Soon...", timestamp: Date.now(), color: "#ff4500", emoji: "sad"}]))}>Style Avatar</AsideOption>
                <AsideOption hbc={isDark.childbackgroundColor} br="0" p="0 30px 0 50px" cfw="500" onClick={()=>{authType ? dispatch(setWarningMessages([...messages, {message: "Password cannot be changed.", timestamp: Date.now(), color: "#ff4500", emoji: "sad"}])) : dispatch(openAuthentication("password"))}}>Change Password</AsideOption>
                <hr className={styles.border}></hr>
                <AsideOption hbc="transparent" icon={<CgOptions />} br="0" c={isDark.childColor || "#576f76"} bc="transparent" cu="auto">View Options</AsideOption>
                <AsideOption hbc={isDark.childbackgroundColor} br="0" p="0 30px 0 50px" d="flex" jc="space-between" cw="100%" cfw="500">Dark Mode <ExampleStrapiSwitch isChecked={isDark} type="theme"/> </AsideOption>
                <hr className={styles.border}></hr>
                <AsideOption hbc={isDark.childbackgroundColor} br="0" cfw="500" icon={<CgCommunity />} onClick={()=>{dispatch(createCommunity(true)),dispatch(closeUserContainer())}}>Create a Community</AsideOption>
                <AsideOption hbc={isDark.childbackgroundColor} br="0" cfw="500" icon={<MdOutlineCampaign />} onClick={()=>dispatch(setWarningMessages([...messages, {message: "Features Coming Soon...", timestamp: Date.now(), color: "#ff4500", emoji: "sad"}]))}>Advertise on Reddit</AsideOption>
                <AsideOption hbc={isDark.childbackgroundColor} br="0" cfw="500" icon={<TbPremiumRights />} onClick={()=> {
                    if(!isPremium){
                        navigate("/premium")
                        dispatch(closeUserContainer())
                    }
                    else{
                        dispatch(setWarningMessages([...messages, {message: "Already a Premium Member.", timestamp: Date.now(), color: "#46d160", emoji: "happy"}]))
                    }
                }}>Premium</AsideOption>
                <AsideOptiontitle icon={<GoTelescope />} c={isDark.color || "#000"} fw="500" br="0" current="explore" open={isDrop} setOpen={()=>{
                    dispatch(setWarningMessages([...messages, {message: "Coming Soon...", timestamp: Date.now(), color: "#ff4500", emoji: "sad"}]))
                }}>Explore</AsideOptiontitle>
                {
                    isDrop.includes("explore") &&
                    <>
                        <AsideOptiontitle c={isDark.color || "#000"} current="gaming" br="0" p="0 15px 0 50px" fw="500" open={isDrop} setOpen={()=>{
                            if(isDrop.includes("gaming")){
                                setIsDrop(()=>isDrop.filter((e)=>{
                                    return e !== "gaming"
                                }))
                            }
                            else{
                                setIsDrop((prev)=>[...prev, "gaming"])
                            }
                        }}>Gaming</AsideOptiontitle>
                        {isDrop.includes("gaming") && <div className={styles.subtopicDiv}>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Valheim</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Minecraft</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Pokimane</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Call of Duty: Warzone</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Escape from tarkov</AsideOption>
                            <hr className={styles.border}></hr>
                        </div>}
                        <AsideOptiontitle c={isDark.color || "#000"} current="sports" br="0" p="0 15px 0 50px" fw="500" open={isDrop} setOpen={()=>{
                            if(isDrop.includes("sports")){
                                setIsDrop(()=>isDrop.filter((e)=>{
                                    return e !== "sports"
                                }))
                            }
                            else{
                                setIsDrop((prev)=>[...prev, "sports"])
                            }
                        }}>Sports</AsideOptiontitle>
                        {isDrop.includes("sports") && <div className={styles.subtopicDiv}>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">NFL</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">NBA</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Megan Anderson</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Atlanta Hawks</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Bostan Celtics</AsideOption>
                            <hr className={styles.border}></hr>
                        </div>}
                        <AsideOptiontitle c={isDark.color || "#000"} current="buisness" br="0" p="0 15px 0 50px" fw="500" open={isDrop} setOpen={()=>{
                            if(isDrop.includes("buisness")){
                                setIsDrop(()=>isDrop.filter((e)=>{
                                    return e !== "buisness"
                                }))
                            }
                            else{
                                setIsDrop((prev)=>[...prev, "buisness"])
                            }
                        }}>Buisness</AsideOptiontitle>
                        {isDrop.includes("buisness") && <div className={styles.subtopicDiv} >
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">GameStop</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Moderna</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Pfizer</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Johnson & Johnson</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">AstraZeneca</AsideOption>
                            <hr className={styles.border}></hr>
                        </div>}
                        <AsideOptiontitle c={isDark.color || "#000"} current="crypto" br="0" p="0 15px 0 50px" fw="500" open={isDrop} setOpen={()=>{
                            if(isDrop.includes("crypto")){
                                setIsDrop(()=>isDrop.filter((e)=>{
                                    return e !== "crypto"
                                }))
                            }
                            else{
                                setIsDrop((prev)=>[...prev, "crypto"])
                            }
                        }}>Crypto</AsideOptiontitle>
                        {isDrop.includes("crypto") && <div className={styles.subtopicDiv}>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Cardano</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Dogecoin</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Algorand</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Bitcoin</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Litecoin</AsideOption>
                            <hr className={styles.border}></hr>
                        </div>}
                        <AsideOptiontitle c={isDark.color || "#000"} current="television" br="0" p="0 15px 0 50px" fw="500" open={isDrop} setOpen={()=>{
                            if(isDrop.includes("television")){
                                setIsDrop(()=>isDrop.filter((e)=>{
                                    return e !== "television"
                                }))
                            }
                            else{
                                setIsDrop((prev)=>[...prev, "television"])
                            }
                        }}>Television</AsideOptiontitle>
                        {isDrop.includes("television") && <div className={styles.subtopicDiv} >
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">The Real Housewives of Atlanta</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">The Bachelor</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Sister Wives</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">90 Day Fiance</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Wife Swap</AsideOption>
                            <hr className={styles.border}></hr>
                        </div>}
                        <AsideOptiontitle c={isDark.color || "#000"} current="celebrity" br="0" p="0 15px 0 50px" fw="500" open={isDrop} setOpen={()=>{
                            if(isDrop.includes("celebrity")){
                                setIsDrop(()=>isDrop.filter((e)=>{
                                    return e !== "celebrity"
                                }))
                            }
                            else{
                                setIsDrop((prev)=>[...prev, "celebrity"])
                            }
                        }}>Celebrity</AsideOptiontitle>
                        {isDrop.includes("celebrity") && <div className={styles.subtopicDiv} >
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Kim Kardashian</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Doja Cat</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Anya Taylor Curtis</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Natalie Portman</AsideOption>
                            <AsideOption hbc={isDark.childbackgroundColor} br="0">Tom Hiddlesston</AsideOption>
                            <hr className={styles.border}></hr>
                        </div>}
                        <hr className={styles.border}></hr>
                    </>
                }
                <AsideOption hbc={isDark.childbackgroundColor} br="0" cfw="500" icon={<AiOutlineQuestionCircle />} onClick={()=>dispatch(setWarningMessages([...messages, {message: "Team Reddit Clone happy to help you.", timestamp: Date.now(), color: "#46d160", emoji: "happy"}]))}>Help Center</AsideOption>
                <AsideOptiontitle icon={<BsExclamationCircle />} c={isDark.color || "#000"} fw="500" br="0" current="more" open={isDrop} setOpen={()=>{
                    if(isDrop.includes("more")){
                        setIsDrop(()=>isDrop.filter((e)=>{
                            return e !== "more"
                        }))
                    }
                    else{
                        setIsDrop((prev)=>[...prev, "more"])
                    }
                }}>More</AsideOptiontitle>
                {
                    isDrop.includes("more") && 
                    <>
                        <Link to="https://apps.apple.com/in/app/reddit/id1064216828" target="_blank" style={{color: isDark.color || "#000"}}><AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500">Reddit iOS</AsideOption></Link>
                        <Link to="https://play.google.com/store/apps/details?id=com.reddit.frontpage" target="_blank" style={{color: isDark.color || "#000"}}><AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500">Reddit Android</AsideOption></Link>
                        <AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500" onClick={pageBuilding}>Rereddit</AsideOption>
                        <AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500" onClick={pageBuilding}>Best Communities</AsideOption>
                        <AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500" onClick={pageBuilding}>Communities</AsideOption>
                        <AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500" onClick={pageBuilding}>About Reddit</AsideOption>
                        <AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500" onClick={pageBuilding}>Blog</AsideOption>
                        <AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500" onClick={pageBuilding}>Careers</AsideOption>
                        <AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500" onClick={pageBuilding}>Press</AsideOption>
                        <AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500" onClick={pageBuilding}>Visit Old Reddit</AsideOption>
                        <hr className={styles.border}></hr>
                    </>
                }
                <AsideOptiontitle icon={<MdOutlinePolicy />} c={isDark.color || "#000"} fw="500" br="0" current="terms" open={isDrop} setOpen={()=>{
                    if(isDrop.includes("terms")){
                        setIsDrop(()=>isDrop.filter((e)=>{
                            return e !== "terms"
                        }))
                    }
                    else{
                        setIsDrop((prev)=>[...prev, "terms"])
                    }
                }}>Terms & Policies</AsideOptiontitle>
                {
                    isDrop.includes("terms") && 
                    <>
                        <AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500" onClick={pageBuilding}>User Agreement</AsideOption>
                        <AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500" onClick={pageBuilding}>Privacy Policy</AsideOption>
                        <AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500" onClick={pageBuilding}>Content Policy</AsideOption>
                        <AsideOption br="0" p="0 30px 0 50px" hbc={isDark.childbackgroundColor} cfw="500" onClick={pageBuilding}>Moderator Code of Conduct</AsideOption>
                        <hr className={styles.border}></hr>
                    </>
                }
                <AsideOption br="0" cfw="500" hbc={isDark.childbackgroundColor} icon={<FiLogIn />} onClick={()=>{
                    dispatch(closeUserContainer())
                    dispatch(removeUser())
                    sessionStorage.removeItem("AuthCredentials")
                    dispatch(setTheme(false))
                    signOutUser()
                    navigate("/")
                }}>Log Out</AsideOption>
                <p className={styles.copyright} style={{color: isDark ? isDark.childColor : "#434343" }}>Reddit, Inc. &copy; 2023. All rights reserved.</p>
            </>
            :
            <>
                <AsideOption icon={<FiLogIn />} br="0" cfw="400" h="50px" onClick={()=>{
                    dispatch(closeUserContainer())
                    dispatch(openAuthentication("login"))
                    dispatch(startLoading())
                }}>Log In / Sign Up</AsideOption>
                <AsideOption icon={<TbTargetArrow />} br="0" cfw="400" h="50px" onClick={()=>dispatch(setWarningMessages([...messages, {message: "Features Coming Soon...", timestamp: Date.now(), color: "#ff4500", emoji: "sad"}]))}>Advertise on Reddit</AsideOption>
                <AsideOption icon={<HiOutlineShoppingBag />} br="0" cfw="400" h="50px" onClick={()=>dispatch(setWarningMessages([...messages, {message: "Shop was closed will Notify you once Opened", timestamp: Date.now(), color: "#ff4500", emoji: "sad"}]))}>Shop Collectible Avatars</AsideOption>
            </>
        }
    </div>
  )
}

export default UserContainer