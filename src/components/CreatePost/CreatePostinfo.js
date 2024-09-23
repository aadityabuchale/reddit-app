import React, { createRef, useState } from 'react'
import styles from "./CreatePostinfo.module.css"
import userLogo from "../../Assets/User Logo Half.png"
import { FiImage } from "react-icons/fi"
import { FiLink } from 'react-icons/fi'
import Button from "../Button/Button"
import { ImFire } from "react-icons/im"
import { MdOutlineVerified } from "react-icons/md"
import { PiRows } from "react-icons/pi"
import { TbLayoutRows } from "react-icons/tb"
import { IoIosArrowDown } from "react-icons/io"
import { PiRowsFill } from "react-icons/pi"
import { MdTableRows } from "react-icons/md"
import PostLogin from '../Posts/Post/PostLogin'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import EmptyPost from '../Posts/EmptyPost/EmptyPost'
import { useDispatch, useSelector } from 'react-redux'
import { setPostType } from '../../MyStore/action'
import { TailSpin } from 'react-loader-spinner'
 
function CreatePostinfo({ Posts, type, channelTheme, channelName, isUser }) {

    const { isOnline } = useSelector((state)=>state.UserSetter)
    const { isDark, pageNum } = useSelector((state)=>state.UISetter)
    const sortButton = createRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [postType, setPosttype] = useState("card")
    const [sortType, setSortType] = useState('hot')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            setIsOpen(false)
        })

        return ()=>{
            window.removeEventListener("scroll", ()=>{})
        }
    },[])

  return (
    <div className={styles.createPostInfo} style={{maxWidth: postType==="card" && "640px"}}>
        <div className={styles.createPost} style={{backgroundColor: isDark.backgroundColor || "#fff", border: isDark ? `1px solid ${isDark.borderColor}`: "1px solid #bbb"}}>
            <div className={styles.logoDiv} style={{backgroundColor: isDark.childbackgroundColor || "#ccc"}}>
                <img src={userLogo}/>
                {isOnline && <p className={styles.onlineDot} style={{border: isDark ? `2px solid ${isDark.backgroundColor}` : "2px solid #fff" }}></p>}
            </div>
            <input placeholder='Create Post' onClick={()=>{navigate("/submit"), dispatch(setPostType("text"))}} style={{backgroundColor: isDark.childbackgroundColor || "#DAE0E644", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid rgba(0, 0, 0, 0.1)"}}/>
            <FiImage onClick={()=>{navigate("/submit"), dispatch(setPostType("image"))}} className={styles.postImameLink} style={{color: isDark.childColor || "#576f76"}}/>
            <FiLink onClick={()=>{navigate("/submit"), dispatch(setPostType("link"))}} className={styles.postImameLink} style={{color: isDark.childColor || "#576f76"}}/>
        </div>
        <div className={styles.sortPosts} style={{backgroundColor: isDark.backgroundColor || "#fff", border: isDark ? `1px solid ${isDark.borderColor}`: "1px solid #bbb"}}>
            <div>
                <Button p="7px 15px" fs="1rem" m="0 15px 0 0" br="50px" c={sortType==="hot"? channelTheme ? `#${channelTheme}` : "#006cbf": isDark.childColor || "#576f76"} bc={sortType==="hot"? isDark.childbackgroundColor || "#eeeeeebb":"transparent"} hbc={isDark.childbackgroundColor || "#eee"} onClick={()=>setSortType('hot')}><ImFire /> Hot </Button>
                <Button p="7px 15px" fs="1rem" m="0 15px 0 0" br="50px" c={sortType==="new"? channelTheme ? `#${channelTheme}` :"#006cbf": isDark.childColor || "#576f76"} bc={sortType==="new"? isDark.childbackgroundColor || "#eeeeeebb":"transparent"} hbc={isDark.childbackgroundColor || "#eee"} onClick={()=>setSortType('new')}><MdOutlineVerified style={{position: 'relative', top: "2px", transform: "scale(1.2)"}}/> New</Button>
            </div>
            <Button p="7px 15px" br="20px" fs="1.2rem" c={isDark.childColor || "#576f76"} d="flex" g="2px" ai="center" hbc={isDark.childbackgroundColor || "#eee"} bc={isOpen ? isDark.childbackgroundColor || "#eee" : "transparent"} ref={sortButton} onClick={(e)=>{
                if(isOpen){
                    setIsOpen(false)
                }
                else{
                    setIsOpen({
                        top: Math.floor(sortButton.current.getBoundingClientRect().bottom)+5,
                        left: Math.floor(sortButton.current.getBoundingClientRect().left)-30
                    })
                }
            }}>{postType==="card"?<PiRows /> :<TbLayoutRows />}<IoIosArrowDown /></Button>
            {
                isOpen && 
                <div className={styles.stylecard} style={{top: `${isOpen.top}px`, left: `${isOpen.left}px`, backgroundColor: isDark.backgroundColor || "#fff", color: isDark.color}}>
                    <p className={styles.title}>View</p>
                    <div className={`${isDark ? styles.darkHover : styles.lighteHover}`} style={{backgroundColor: postType==="card" && (isDark.childbackgroundColor || "#ddd")}} onClick={()=>{
                            setIsOpen(false)
                            setPosttype("card")
                        }}><PiRowsFill style={{fontSize: "1.2rem"}}/><p>Card</p></div>
                    <div className={`${isDark ? styles.darkHover : styles.lighteHover}`} style={{backgroundColor: postType==="classic" && (isDark.childbackgroundColor || "#ddd"), borderRadius: "0 0 10px 10px"}} onClick={()=>{
                            setIsOpen(false)
                            setPosttype("classic")
                        }}><MdTableRows style={{fontSize: "1.2rem"}}/><p>Classic</p></div>
                </div>
            }
        </div>
        {   
            Posts?.length > 0 ?
            Array.isArray(Posts) &&
            Posts?.map((post, idx)=>(
                <PostLogin post={post} postType={postType} type={type} key={idx} isUser={isUser}/>
            ))
            : 
            <EmptyPost username={`r/${channelName}`}/>
        }
        {
            pageNum === "null" || type === "channel" ?
            <p className={styles.caughtMessage} style={{color: isDark.childColor || "#576f76"}}>You all caught Up!</p> : 
            <TailSpin color='#D93A00' height="40px" wrapperStyle={{justifyContent: "center"}}/>
        }
    </div>
  )
}

export default CreatePostinfo