import React, { useEffect, useRef, useState } from 'react'
import styles from "./Message.module.css"
import Drawer from "@mui/joy/Drawer";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import { AiOutlineClose } from "react-icons/ai"
import { IoIosArrowDown } from "react-icons/io"
import { IoSend } from "react-icons/io5"
import openAi from "../../Assets/Community Icons/CommunityIcon_openAi.png"
import user1 from  "../../Assets/User Icons/profileIcon_icon1.png"
import user2 from  "../../Assets/User Icons/profileIcon_icon2.png"
import user3 from  "../../Assets/User Icons/profileIcon_icon3.png"
import user4 from  "../../Assets/User Icons/profileIcon_icon4.png"
import user5 from  "../../Assets/User Icons/profileIcon_icon5.png"
import user6 from  "../../Assets/User Icons/profileIcon_icon6.png"
import user7 from  "../../Assets/User Icons/profileIcon_icon7.png"
import user8 from  "../../Assets/User Icons/profileIcon_icon8.png"
import user9 from  "../../Assets/User Icons/profileIcon_icon9.png"
import user10 from  "../../Assets/User Icons/profileIcon_icon10.png"
import { useDispatch, useSelector } from 'react-redux';
import { closeMessage } from '../../MyStore/action';

const userLogo = [user1, user2, user3, user3, user4, user5, user6, user7, user8, user9, user10]

function Message() {
    const { isDark } = useSelector((state)=>state.UISetter)
    const { user } = useSelector((state)=>state.UserSetter)
    const dispatch = useDispatch()
    const isFirstRender = useRef(false)
    const [isOpen, setIsOpen] = useState(true);
    const [userMes, setUserMes] = useState([])
    const [isHover, setIsHover] = useState(false)
    const [input, setInput] = useState('')

    function fetchMsg(del){
        let delay = Math.floor((Math.random()*60000)+3000)
        let time = setTimeout(()=>{
            fetch(`https://dummyjson.com/quotes/${Math.floor((Math.random()*99)+1)}`)
            .then((response)=>response.json())
            .then((res)=>setUserMes((prev)=>[...prev, {...res, createdAt: Date.now(), logo: userLogo[(Math.floor(Math.random()*(userLogo.length-1)))]}]))
            clearTimeout(time)
            fetchMsg(delay)
        }, del)
    }

    useEffect(()=>{
        fetchMsg(2500)
    },[])

    function handleSubmit(e){
        e.preventDefault()
        setUserMes((prev)=>[...prev, {author: user.name, quote: input, createdAt: Date.now(), logo: user7}])
        setInput("")
    }

    useEffect(()=>{
        if(isFirstRender.current === false){
            isFirstRender.current = true
            return
        }
        dispatch(closeMessage())
    },[window.location.pathname])

    return (
      <React.Fragment>
        <ButtonGroup
          variant="outlined"
          sx={{
            position: "fixed",
            bottom: "0",
            right: "50px",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <Button sx={{
            width: "125px", 
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: isDark.color || "#fff",
            borderColor: isDark.borderColor,
            color: isDark.switchColor

          }} onClick={() => setIsOpen(true)}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
          >Chat{isHover && <AiOutlineClose style={{color: isDark.switchColor || "#777"}} onClick={()=>dispatch(closeMessage())}/>}</Button>
        </ButtonGroup>
        <Drawer
            sx={{ 
                position: "unset",
                '& .MuiDrawer-backdrop': { display: "none", backgroundColor: "transparent", backdropFilter: "blur(0)"},
                '& .MuiDrawer-content' : {width : "630px", height: "510px" ,right: "50px" ,borderRadius: "15px 15px 0 0"},
            }}
            anchor="bottom" open={isOpen}
        >
                <div className={styles.messageContainer} style={{backgroundColor: isDark ? "#000" : "#fff",boxShadow: isDark ? `0 0 1px 0.5px ${isDark.color}` : "0 0 1px 0.5px rgba(0, 0, 0, 0.2)" , color: isDark.color}}>
                    <div className={styles.messagegroups} style={{borderRight: isDark ? `1px solid ${isDark.switchColor}` : "1px solid #ddd"}}>
                        <div className={styles.messagegroupsHead} style={{borderBottom: isDark ? `1px solid ${isDark.switchColor}` : "1px solid #ddd"}}>
                            <div style={{color: isDark.color || "#000" ,fontWeight: "700", fontSize: "1.1rem"}}>Chats</div>
                        </div>
                        <div className={styles.messagegroupDiv}>
                            <div className={styles.messageChannel} style={{backgroundColor: isDark.childbackgroundColor || "#ddd"}}>
                                <div className={styles.channelNames}>
                                    <img src={openAi} />
                                    <div className={styles.channelTitle}>
                                        <p>General</p>
                                        <p>r/OpenAi</p>
                                    </div>
                                </div>
                                <div className={styles.messageTime}>
                                    <p>1:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.messages}>
                        <div className={styles.messagesTitle} style={{borderBottom: isDark ? `1px solid ${isDark.switchColor}` : "1px solid #ddd"}}>
                            <div className={styles.titleName} style={{color: isDark.color || "#000"}}>General</div>
                            <div className={styles.messageSettings}>
                                <IoIosArrowDown style={{color: isDark.childColor}} className={`${styles.SettingsIcon} ${ isDark ? styles.darkHover : styles.lightHover}`} onClick={()=>setIsOpen(false)}/>
                                <AiOutlineClose style={{color: isDark.childColor}} className={`${styles.SettingsIcon} ${ isDark ? styles.darkHover : styles.lightHover}`} onClick={()=>dispatch(closeMessage())}/>
                            </div>
                        </div>
                        <div className={styles.messagestab}>
                            {
                                userMes.sort((a,b)=>b.createdAt - a.createdAt).map((mes, idx)=>(
                                    <div key={idx} className={`${styles.messagetile} ${ isDark ? styles.darkHover : styles.lightHover}`}>
                                        <div className={styles.userDiv}>
                                            <img src={mes.logo} />
                                        </div>
                                        <div className={styles.userMessage}>
                                            <p style={{color: isDark.color || "#000"}}>{mes.author} <span>{new Date(mes.createdAt).toLocaleTimeString()}</span></p>
                                            <p style={{color: isDark.color || "#000"}}>{mes.quote}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.messageInput} style={{borderTop: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd", color: isDark.childColor}}>
                            <div className={styles.inputContainer} style={{backgroundColor: isDark.backgroundColor || "#ddd"}}><form style={{width: "100%"}} onSubmit={(e)=>handleSubmit(e)}><input value={input} onChange={(e)=>setInput(e.target.value)} style={{color: isDark.color}} placeholder='Message'/></form></div>
                            <div className={`${styles.messageSend} ${ isDark ? styles.darkHover : styles.lightHover}`} onClick={(e)=>handleSubmit(e)}><IoSend /></div>
                        </div>
                    </div>
                </div>
        </Drawer>
      </React.Fragment>
    );
}

export default Message