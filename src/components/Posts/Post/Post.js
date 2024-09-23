import React, { useEffect, useState } from 'react'
import styles from "./Post.module.css"
import Button from '../../Button/Button'
import { PiArrowFatUp } from "react-icons/pi"
import { PiArrowFatUpFill } from "react-icons/pi"
import { PiArrowFatDown } from "react-icons/pi"
import { PiArrowFatDownFill } from "react-icons/pi"
import { FaRegMessage } from "react-icons/fa6"
import { LuLogOut } from "react-icons/lu"
import { BsDot } from "react-icons/bs"
import { FiLink } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { openAuthentication, setcommentFocus, startLoading } from '../../../MyStore/action'
import { useNavigate } from 'react-router-dom'
import { createRef } from 'react'
import ChannelHover from '../../Hover/ChannelHover'

function Post({post, postType}) {

  const { user } = useSelector((state)=>state.UserSetter)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const joinButton = createRef()
  const upVoteButton = createRef()
  const downVoteButton = createRef()
  const shareButton = createRef()
  const authorButton = createRef()
  const shareLink = createRef()
  const commentButton = createRef()
  const popupRef = createRef()
  const [data, setData] = useState("") 
  const [upVote, setUpVote] = useState(false)
  const [downVote, setDownVote] = useState(false)
  const [isShare, setIsShare] = useState(false)
  const [isUserHover, setIsUserHover] = useState(false)
  const [isPopUpHover, setIsPopUpHover] = useState(true)
  const [showPopUp, setShowPopUp] = useState(false)
  const [timer, setTimer] = useState('')

  useEffect(()=>{
      if(isUserHover){
          if(timer){
              clearTimeout(timer)
          }
          let top
          let left
          if(isUserHover){
              top = authorButton?.current?.getBoundingClientRect().bottom
              left = authorButton?.current?.getBoundingClientRect().left
          }
          setTimer(setTimeout(()=>{
              setShowPopUp({top, left, name: data?.author?.name, image: data?.author?.profileImage , type: "user"})
          },500))
      }
      else{
          if(timer){
              clearTimeout(timer)
          }
          if(!isPopUpHover){
              setShowPopUp(false)
          }
      }
  }, [isPopUpHover, isUserHover])

  useEffect(()=>{
      fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${post._id}`, {
          headers:  {
          'projectId': '2xrb7gmxn2kw'
          }
      })
      .then((response)=>response.json())
      .then((res)=>{
          setData(res.data)
      })
  },[])

  let PostTime = new Date(post.createdAt).getTime()
  let newTime = new Date().getTime()
  let created = (newTime - PostTime)>86400000 ? Math.floor((newTime - PostTime)/86400000) + " Days": Math.floor((newTime - PostTime)/3600000)+ "hr"
  let ButtonStyle = {h:"32px", w:"auto", fs:"0.75rem", p:"0 12px", br:"30px", b:"#ddd", hbc:"#ccc", d:"flex", jc:"center", ai:"center", g:"10px"}

  const onClickHandler = (e)=>{
    if(popupRef?.current?.contains(e.target)){
      navigate(`/user/${data?.author?.name}/${data?.author?._id}`)
    }
    if(joinButton?.current?.contains(e.target)){
      if(!user){
        dispatch(startLoading())
        dispatch(openAuthentication("login"))
      }
    }
    else if(upVoteButton?.current?.contains(e.target)){
      if(!user){
        dispatch(startLoading())
        dispatch(openAuthentication("login"))
      }
    }
    else if(downVoteButton?.current?.contains(e.target)){
      if(!user){
        dispatch(startLoading())
        dispatch(openAuthentication("login"))
      }
    }
    else if(shareButton?.current?.contains(e.target)){
      if(isShare){
        setIsShare("")
        return
      }
      setIsShare({top: Math.floor(shareButton?.current?.getBoundingClientRect().bottom)+10, left: Math.floor(shareButton?.current?.getBoundingClientRect().left)})
    }
    else if(authorButton?.current?.contains(e.target)){
      navigate(`user/${data.author.name}/${data.author._id}`)
    }
    else if(shareLink?.current?.contains(e.target)){
      navigator.clipboard.writeText(window.location.origin+`/r/${data.channel.name}/comments/${data._id}`)
      setIsShare("")
    }
    else if(commentButton?.current?.contains(e.target)){
      dispatch(setcommentFocus(true))
      navigate(`/r/${data.channel.name}/comments/${data._id}`)
    }
    else{
      setIsShare("")
      navigate(`/r/${data.channel.name}/comments/${data._id}`)
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll", ()=>{
      setIsShare("")
      setShowPopUp(false)
    })

    return ()=>{
      window.removeEventListener("scroll", ()=>{})
    }
  },[])

  return (
    <div className={styles.post} onClick={(e)=>onClickHandler(e)} style={{maxWidth: postType === "classic" && "100%"}}>
      <div className={styles.postTitle}>
        <div className={styles.channel}>
          <img src={data?.author?.profileImage}/>
          <p ref={authorButton} onMouseOver={()=>setIsUserHover(true)} onMouseOut={()=>setIsUserHover(false)}>u/{data?.author?.name}</p>
          { 
            post.created && 
              <>
                <BsDot />
                <p>{created+ ".ago"}</p>
              </>
          }
        </div>
        <div className={styles.moreIcons}>
          <Button h="auto" w="auto" c="#ffffff" bc="#0045AC" hbc="#004588" p="4px 12px" br="20px" ref={joinButton}>Join</Button>
        </div>
      </div>
      <div className={styles.content} style={{flexDirection: postType==="classic" && "row"}}>
          <p className={styles.mainContent}>{data?.content}</p>
          {post.image && <img src={post?.image} style={{width: "100%", maxWidth: postType==="classic" ? "150px" : "400px", borderRadius: "10px", margin: postType==="classic" ? "0 0 0 10px" : "10px 0 0 0"}}/>}
      </div>
      <div className={styles.postdetails}>
          <Button {...ButtonStyle}>
            <div onMouseOver={()=>setUpVote(true)} onMouseOut={()=>setUpVote(false)} ref={upVoteButton}>
              {upVote ? <PiArrowFatUpFill style={{transform: "scale(1.4)"}} className={styles.upVote}/> :
              <PiArrowFatUp style={{transform: "scale(1.4)"}} className={styles.upVote}/>}
            </div>
            {data?.likeCount}
            <div onMouseOver={()=>setDownVote(true)} onMouseOut={()=>setDownVote(false)} ref={downVoteButton}>
              {downVote ? <PiArrowFatDownFill style={{transform: "scale(1.4)"}} className={styles.downVote}/>  :
              <PiArrowFatDown style={{transform: "scale(1.4)"}} className={styles.downVote}/>}
            </div>
          </Button>
          <Button {...ButtonStyle} ref={commentButton}>
            <FaRegMessage style={{transform: "scale(1.3)"}}/>
            {data?.commentCount}
          </Button>
          <Button {...ButtonStyle} ref={shareButton}>
            <LuLogOut style={{transform: "rotate(-90deg) scale(1.5)"}}/>
            Share
          </Button>
          {
            isShare && 
            <div ref={shareLink} className={styles.sharePop} style={{top: `${isShare.top}px`, left: `${isShare.left}px`}}><FiLink /> Copy Link</div>
          }
      </div>
      <div ref={popupRef}>
          {showPopUp && <ChannelHover showPopUp={showPopUp} setIsPopUpHover={setIsPopUpHover} />}
      </div>
    </div>
  )
}

export default Post