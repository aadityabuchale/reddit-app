import React, { useEffect, useState } from 'react'
import styles from "./Posts.module.css"
import Post from './Post/Post'
import Button from '../Button/Button'
import { TbLayoutRows } from "react-icons/tb"
import { IoIosArrowDown } from "react-icons/io"
import { PiRows } from "react-icons/pi"
import { PiRowsFill } from "react-icons/pi"
import { MdTableRows } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openAuthentication, startLoading } from '../../MyStore/action'
import { createRef } from 'react'
import { TailSpin } from 'react-loader-spinner'

function Posts({ Posts }) {
    const { user } = useSelector((state)=>state.UserSetter)
    const { pageNum, isDark } = useSelector((state)=>state.UISetter)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sortButton = createRef()
    const [postType, setPostType] = useState("card")
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
    <div className={styles.Posts}>
        <div className={styles.buttons}>
            <Button p="10px 20px" br="40px" fs="0.875rem" hbc="transparent" bc="transparent" hb="1.5px solid #000" b="1px solid #555" onClick={()=>{
                if(user){
                    navigate("/submit")
                }
                else{
                    dispatch(startLoading())
                    dispatch(openAuthentication("login"))
                }
            }}>Create a Post</Button>
            <Button p="0 15px" br="20px" fs="1.2rem" c="#576f76" d="flex" g="2px" ai="center" hbc="#eee" bc={isOpen ? "#eee" : "transparent"} ref={sortButton} onClick={(e)=>{
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
        </div>
        {
            isOpen && 
            <div className={styles.stylecard} style={{top: `${isOpen.top}px`, left: `${isOpen.left}px`}}>
                <p className={styles.title}>View</p>
                <div style={{backgroundColor: postType==="card" && "#ddd"}} onClick={()=>{
                        setIsOpen(false)
                        setPostType("card")
                    }}><PiRowsFill style={{fontSize: "1.2rem"}}/><p>Card</p></div>
                <div style={{backgroundColor: postType==="classic" && "#ddd"}} onClick={()=>{
                        setIsOpen(false)
                        setPostType("classic")
                    }}><MdTableRows style={{fontSize: "1.2rem"}}/><p>Classic</p></div>
            </div>
        }
        {Array.isArray(Posts) && 
            Posts?.map((post, idx)=>(
                <div key={idx}>
                    <Post post={post} postType={postType}/>
                    <hr style={{margin: postType==="classic" && "0", maxWidth: postType==="classic" && "100%"}}></hr>
                </div>
            ))
        }
        {
            pageNum === "null" ?
            <p className={styles.caughtMessage} style={{color: isDark.childColor || "#576f76"}}>You all caught Up!</p> : 
            <TailSpin color='#D93A00' height="40px" wrapperStyle={{justifyContent: "center"}}/>
        }
    </div>
  )
}

export default Posts