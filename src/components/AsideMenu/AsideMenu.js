import React, { useState } from 'react'
import styles from './AsideMenu.module.css'
import { BsFillArrowUpRightCircleFill } from "react-icons/bs"
import { BiSolidHome } from "react-icons/bi"
import { LuGamepad2 } from "react-icons/lu"
import { IoTennisballOutline } from "react-icons/io5"
import { AiOutlineStock } from "react-icons/ai"
import { BsCurrencyBitcoin } from "react-icons/bs"
import { PiTelevision } from "react-icons/pi"
import { FiStar } from "react-icons/fi"
import { LiaRedditAlien } from "react-icons/lia"
import { MdOutlineCampaign } from "react-icons/md"
import { IoIosHelpCircleOutline } from "react-icons/io"
import { PiBookOpen } from "react-icons/pi"
import { FiTool } from "react-icons/fi"
import { PiMicrophoneStage } from "react-icons/pi"
import { GoPeople } from "react-icons/go"
import { TbCalendarRepeat } from "react-icons/tb"
import { HiOutlineSquaresPlus } from "react-icons/hi2"
import { MdBalance } from "react-icons/md"
import { MdOutlinePrivacyTip } from "react-icons/md"
import { MdOutlinePolicy }  from "react-icons/md"
import AsideOption from './AsideOption'
import AsideOptiontitle from './AsideOptiontitle'
import Button from "../Button/Button"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAside, setWarningMessages } from '../../MyStore/action'

function AsideMenu({ Atype }) {
    const { isDark } = useSelector((state)=>state.UISetter)
    const { messages } = useSelector((state)=>state.WarningSetter)
    const postDetail = useSelector((state)=>state.DataSetter)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isDrop, setIsDrop] = useState([])
    const [seeMore, setSeeMore] = useState(false)
    let AsideOptionStyle = {
        hbc : isDark.childbackgroundColor,
        bl : isDark && `1px solid ${isDark.borderColor}`,
        br : "0 10px 10px 0"
    }
    let SadMessage = {message: "Page Building under progress...", timestamp: Date.now(), color: "#ff4500", emoji: "sad"}
    const closeAside = () => Atype && dispatch(setAside(false))

  return (
    <div className={styles.AsideMenu} style={{backgroundColor: isDark.backgroundColor || "#fff", borderRight: isDark ? `1px solid ${isDark.borderColor}` : "1px solid rgba(0, 0, 0, 0.2)", color: isDark.color}}>
        <div>
            <AsideOption hbc={isDark.childbackgroundColor} icon={<BiSolidHome />} onClick={()=>{navigate("/"), closeAside()}}>Home</AsideOption>
            <AsideOption hbc={isDark.childbackgroundColor} icon={<BsFillArrowUpRightCircleFill />} onClick={()=>{navigate("/r/popular"), closeAside()}}>Popular</AsideOption>
            <hr style={{borderTop: isDark && `0.1px solid ${isDark.borderColor}`}}></hr>
            <AsideOptiontitle c={isDark.childColor} current="recent" open={isDrop} setOpen={()=>{
                if(isDrop.includes("recent")){
                    setIsDrop(()=>isDrop.filter((e)=>{
                        return e !== "recent"
                    }))
                }
                else{
                    setIsDrop((prev)=>[...prev, "recent"])
                }
            }}>RECENT</AsideOptiontitle> 
            <div style={{height: isDrop.includes("recent") ? "auto" : "0px", display: isDrop.includes("recent") ? "initial" : "none", transition: "all ease"}}>
                {
                    postDetail?.recents ? 
                        postDetail?.recents.map((recent, idx)=>(
                            <AsideOption key={idx} d="flex" ai="center" onClick={()=>{navigate(`/r/${recent.name}`), closeAside()}}>
                                <img src={recent.image} className={styles.recentProfile}/>
                                r/{recent.name}
                            </AsideOption>
                        ))
                    :
                    <AsideOption hbc="tranparent" dis={true}>No Recents</AsideOption>
                }
            </div>
            <hr style={{borderTop: isDark && `0.1px solid ${isDark.borderColor}`}}></hr>
            <AsideOptiontitle c={isDark.childColor} current="topic" open={isDrop} setOpen={()=>{
                closeAside()
                dispatch(setWarningMessages([...messages, {message: "Coming Soon...", timestamp: Date.now(), color: "#ff4500", emoji: "sad"}]))
            }}>TOPICS</AsideOptiontitle>
            {isDrop.includes("topic") && <div>
                <AsideOptiontitle icon={<LuGamepad2 />} c={isDark.color || "#000"} current="gaming" open={isDrop} setOpen={()=>{
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
                        <AsideOption {...AsideOptionStyle}>Valheim</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Minecraft</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Pokimane</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Call of Duty: Warzone</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Escape from tarkov</AsideOption>
                    </div>}
                <AsideOptiontitle icon={<IoTennisballOutline />} c={isDark.color || "#000"} current="sports" open={isDrop} setOpen={()=>{
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
                        <AsideOption {...AsideOptionStyle}>NFL</AsideOption>
                        <AsideOption {...AsideOptionStyle}>NBA</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Megan Anderson</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Atlanta Hawks</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Bostan Celtics</AsideOption>
                    </div>}
                <AsideOptiontitle icon={<AiOutlineStock />} c={isDark.color || "#000"} current="buisness" open={isDrop} setOpen={()=>{
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
                        <AsideOption {...AsideOptionStyle}>GameStop</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Moderna</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Pfizer</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Johnson & Johnson</AsideOption>
                        <AsideOption {...AsideOptionStyle}>AstraZeneca</AsideOption>
                    </div>}
                <AsideOptiontitle icon={<BsCurrencyBitcoin />} c={isDark.color || "#000"} current="crypto" open={isDrop} setOpen={()=>{
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
                        <AsideOption {...AsideOptionStyle}>Cardano</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Dogecoin</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Algorand</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Bitcoin</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Litecoin</AsideOption>
                    </div>}
                <AsideOptiontitle icon={<PiTelevision />} c={isDark.color || "#000"} current="television" open={isDrop} setOpen={()=>{
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
                        <AsideOption {...AsideOptionStyle}>The Real Housewives of Atlanta</AsideOption>
                        <AsideOption {...AsideOptionStyle}>The Bachelor</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Sister Wives</AsideOption>
                        <AsideOption {...AsideOptionStyle}>90 Day Fiance</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Wife Swap</AsideOption>
                    </div>}
                <AsideOptiontitle icon={<FiStar />} c={isDark.color || "#000"} current="celebrity" open={isDrop} setOpen={()=>{
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
                        <AsideOption {...AsideOptionStyle}>Kim Kardashian</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Doja Cat</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Anya Taylor Curtis</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Natalie Portman</AsideOption>
                        <AsideOption {...AsideOptionStyle}>Tom Hiddlesston</AsideOption>
                    </div>}
            </div>}
            <hr style={{borderTop: isDark && `0.1px solid ${isDark.borderColor}`}}></hr>
            <AsideOptiontitle c={isDark.childColor} current="resources" open={isDrop} setOpen={()=>{
                if(isDrop.includes("resources")){
                    setIsDrop(()=>isDrop.filter((e)=>{
                        return e !== "resources"
                    }))
                    setSeeMore(false)
                }
                else{
                    setIsDrop((prev)=>[...prev, "resources"])
                }
            }}>RESOURCES</AsideOptiontitle>
            <div style={{height: isDrop.includes("resources") ? "auto" : "0px", display: isDrop.includes("resources") ? "initial" : "none", transition: "all ease"}}>
                <AsideOption hbc={isDark.childbackgroundColor} icon={<LiaRedditAlien />} onClick={()=>{dispatch(setWarningMessages([...messages, SadMessage])), closeAside()}}>About Reddit</AsideOption>
                <AsideOption hbc={isDark.childbackgroundColor} icon={<MdOutlineCampaign />} onClick={()=>{dispatch(setWarningMessages([...messages, SadMessage])), closeAside()}}>Advertise</AsideOption>
                <AsideOption hbc={isDark.childbackgroundColor} icon={<IoIosHelpCircleOutline />} onClick={()=>{dispatch(setWarningMessages([...messages, {message: "Team Reddit Clone happy to help you.", timestamp: Date.now(), color: "#46d160", emoji: "happy"}])), closeAside()}}>Help</AsideOption>
                <AsideOption hbc={isDark.childbackgroundColor} icon={<PiBookOpen />} onClick={()=>{dispatch(setWarningMessages([...messages, SadMessage])), closeAside()}}>Blog</AsideOption>
                <AsideOption hbc={isDark.childbackgroundColor} icon={<FiTool />} onClick={()=>{dispatch(setWarningMessages([...messages, SadMessage])), closeAside()}}>Careers</AsideOption>
                <AsideOption hbc={isDark.childbackgroundColor} icon={<PiMicrophoneStage />} onClick={()=>{dispatch(setWarningMessages([...messages, SadMessage])), closeAside()}}>Press</AsideOption>
                {!seeMore && <Button c={isDark.color} h="30px" p="0 10px" m="10px 0" br="30px" fs="0.75rem" hbc={isDark.childbackgroundColor || "#ddd"} bc="transparent" onClick={()=>setSeeMore(true)}>See more</Button>
                ||
                <>
                    <hr style={{borderTop: isDark && `0.1px solid ${isDark.borderColor}`}}></hr>
                    <AsideOption hbc={isDark.childbackgroundColor} icon={<GoPeople />} onClick={()=>{dispatch(setWarningMessages([...messages, SadMessage])), closeAside()}}>Communities</AsideOption>
                    <AsideOption hbc={isDark.childbackgroundColor} icon={<TbCalendarRepeat />} onClick={()=>{dispatch(setWarningMessages([...messages, SadMessage])), closeAside()}}>Rereddit</AsideOption>
                    <AsideOption hbc={isDark.childbackgroundColor} icon={<HiOutlineSquaresPlus />} onClick={()=>{dispatch(setWarningMessages([...messages, SadMessage])), closeAside()}}>Topics</AsideOption>
                    <hr style={{borderTop: isDark && `0.1px solid ${isDark.borderColor}`}}></hr>
                    <AsideOption hbc={isDark.childbackgroundColor} icon={<MdOutlinePrivacyTip />} onClick={()=>{dispatch(setWarningMessages([...messages, SadMessage])), closeAside()}}>Content Policy</AsideOption>
                    <AsideOption hbc={isDark.childbackgroundColor} icon={<MdBalance />} onClick={()=>{dispatch(setWarningMessages([...messages, SadMessage])), closeAside()}}>Privacy Policy</AsideOption>
                    <AsideOption hbc={isDark.childbackgroundColor} icon={<MdOutlinePolicy />} onClick={()=>{dispatch(setWarningMessages([...messages, SadMessage])), closeAside()}}>User Agreement</AsideOption>
                    <Button c={isDark.color} h="30px" p="0 10px" m="10px 0" br="30px" fs="0.75rem" hbc={isDark.childbackgroundColor || "#ddd"} bc="transparent" onClick={()=>setSeeMore(false)}>See less</Button>
                </>}
            </div>
        </div>
        <p style={{color: isDark.color || "#434343"}} className={styles.copyright}>Reddit, Inc. &copy; 2023. All rights reserved.</p>
    </div>
  )
}

export default AsideMenu