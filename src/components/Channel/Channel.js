import React from 'react'
import styles from "./Channel.module.css"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../../useHooks/useFetch'
import { useEffect } from 'react'
import { closeAuthentication, openAuthentication, setPosts, setWarningMessages, startFetching, startLoading, stopFetching } from '../../MyStore/action'
import Button from "../Button/Button"
import ChannelInfo from './ChannelInfo'
import CreatePostinfo from '../CreatePost/CreatePostinfo'
import LogoLoader from "../LogoLoader/LogoLoader"
import { useState } from 'react'

function Channel() {
    const postDetail = useSelector((state)=>state.DataSetter)
    const { user } = useSelector((state)=>state.UserSetter)
    const { messages } = useSelector((state)=>state.WarningSetter)
    const { isFetching, isDark, isAside, isAuth } = useSelector((state)=>state.UISetter)
    const { channelName } = useParams()
    const dispatch = useDispatch()
    const { fetchChannelbyName, fetchPostbyChannel, deleteChannel } =  useFetch()
    const [channelTheme, setChannelTheme] = useState('')

    useEffect(()=>{
        if(!postDetail?.singleChannel || (postDetail?.singleChannel?.name !== channelName)){
            dispatch(startFetching())
            fetchChannelbyName(channelName.split("%20").join(" "), "singleChannel")
        }
        else if(!postDetail?.channelPosts){
            fetchPostbyChannel(postDetail.singleChannel._id, "channelPosts")
            dispatch(stopFetching())
        }
        else{
            if(postDetail?.recents){
                if(!postDetail?.recents?.some(user => user.name === channelName.split("%20").join(" "))){
                    if(postDetail?.recents.length >= 5){
                        let newArr = postDetail?.recents.splice(0,4)
                        dispatch(setPosts("recents", [{name: postDetail?.singleChannel?.name, image: postDetail?.singleChannel?.image}, ...newArr]))
                        localStorage.setItem("Recents", JSON.stringify([{name: postDetail?.singleChannel?.name, image: postDetail?.singleChannel?.image}, ...newArr]))
                    }
                    else{
                        dispatch(setPosts("recents", [{name: postDetail?.singleChannel?.name, image: postDetail?.singleChannel?.image}, ...postDetail?.recents]))
                        localStorage.setItem("Recents", JSON.stringify([{name: postDetail?.singleChannel?.name, image: postDetail?.singleChannel?.image}, ...postDetail?.recents]))
                    }
                }
            }
            else{
                dispatch(setPosts("recents", [{name: postDetail?.singleChannel?.name, image: postDetail?.singleChannel?.image}]))
                localStorage.setItem("Recents", JSON.stringify([{name: postDetail?.singleChannel?.name, image: postDetail?.singleChannel?.image}]))
            }
        }
    },[postDetail, user, channelName])

    useEffect(()=>{
        document.title = `${channelName}`
        window.scrollTo({top: 0,behavior: 'smooth'})
    },[])

    useEffect(()=>{
        if(user){
            dispatch(closeAuthentication())
            return
        }
        if(!user && !isAuth){
            setTimeout(() => {
                dispatch(startLoading())
                dispatch(openAuthentication("login"))
            }, 1000);
        }
    },[isAuth, user])

  return (
    <>
        {
            isFetching ?
            <LogoLoader /> :
            <div className={styles.ChannelPage} style={{backgroundColor: isDark.childbackgroundColor, color: isDark.color}}>
                <div className={styles.ChannelPageTheme} style={{backgroundColor: channelTheme && `#${channelTheme}`}}></div>
                <div className={styles.channelName}>
                    <div className={styles.logoDiv}>
                        <img src={postDetail?.singleChannel?.image}/>
                    </div>
                    <div className={styles.nameDiv}>
                        <p>{postDetail?.singleChannel?.name}</p>
                        <p style={{color: isDark.childColor || "#576f76"}}>r/{postDetail?.singleChannel?.name}</p>
                    </div>  
                    <div className={styles.joinButton}>
                        <Button p="5px 15px" c={isDark.switchColor || "#fff"} fs="0.875rem" fw="500" br="50px" bc={isDark ? isDark.color : channelTheme ? `#${channelTheme}` : "#006cbf"} hbc={isDark ? isDark.color : channelTheme ? `#${channelTheme}` : "#006cbfdd"} onClick={()=>user?._id !== postDetail?.singleChannel?.owner?._id ? (navigator.clipboard.writeText(window.location),dispatch(setWarningMessages([...messages, {message: "Link Copied to Clipboard", timestamp: Date.now(), color: "#006cbf", emoji: "happy"}]))) : deleteChannel(postDetail?.singleChannel?._id) }>{user?._id !== postDetail?.singleChannel?.owner?._id ? 'Share': 'Delete'}</Button>
                    </div>
                </div>
                <div className={styles.displayCategory}>
                    <p style={{borderBottom: isDark ? `3px solid ${isDark.color}` : channelTheme && `3px solid #${channelTheme}`}}>Posts</p>
                </div>
                <div className={styles.channelPosts} style={{backgroundColor: isDark ? "#000" : "#DAE0E6"}}>
                    <div className={styles.posts}>
                        <CreatePostinfo Posts={postDetail?.channelPosts} type="channel" channelTheme={channelTheme} channelName={postDetail?.singleChannel?.name}/>
                    </div>
                    <div className={styles.channel} style={{display: isAside && window.innerWidth < 950 && "none"}}>
                        <ChannelInfo channel={postDetail?.singleChannel} type={user?._id !== postDetail?.singleChannel?.owner?._id} channelTheme={channelTheme} setChannelTheme={setChannelTheme}/>
                        <Button p="7px 15px" c={isDark.switchColor || "#fff"} fs="0.875rem" fw="500" br="50px" bc={isDark.color || "#006cbf"} hbc={isDark.color || "#006cbfdd"} po="sticky" ptype="top" ppx="94%" m="100px 0 0 0" onClick={()=>window.scrollTo({top: 0,behavior: 'smooth'})}>Back to Top</Button>
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default Channel