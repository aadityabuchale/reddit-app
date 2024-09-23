import React from 'react'
import styles from "./PostLogin.module.css"
import { useState } from 'react'
import { PiArrowFatUpFill } from "react-icons/pi"
import { PiArrowFatUp } from "react-icons/pi"
import { PiArrowFatDownFill } from "react-icons/pi"
import { PiArrowFatDown } from "react-icons/pi"
import { AiOutlineMessage } from 'react-icons/ai'
import { IoMdShareAlt } from 'react-icons/io'
import { GoCircleSlash } from "react-icons/go"
import { useEffect } from 'react'
import { HiPencilSquare } from "react-icons/hi2"
import { useNavigate } from 'react-router-dom'
import { createRef } from 'react'
import { FiLink } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { setcommentFocus } from '../../../MyStore/action'
import ChannelHover from '../../Hover/ChannelHover'
import useFetch from '../../../useHooks/useFetch'

function PostLogin({ post, postType, type, isUser }) {
    const { isDark, isVoted } = useSelector((state)=>state.UISetter)
    const { user } = useSelector((state)=>state.UserSetter)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { addLike, removeLike, deletePost, updatePost } = useFetch()
    const channelname = createRef()
    const username = createRef()
    const shareButton = createRef()
    const shareLink = createRef()
    const upVoteButton = createRef()
    const downVoteButton = createRef()
    const commentButton = createRef()
    const popupRef = createRef()
    const deleteButton = createRef()
    const editButton = createRef()
    const textareaRef = createRef()
    const titleRef = createRef()
    const [upVote, setUpVote] = useState(false)
    const [downVote, setDownVote] = useState(false)
    const [isShare, setIsShare] = useState(false)
    const [data, setData] = useState("")
    const [isChannelHover, setIsChannelHover] = useState(false)
    const [isUserHover, setIsUserHover] = useState(false)
    const [isPopUpHover, setIsPopUpHover] = useState(true)
    const [showPopUp, setShowPopUp] = useState(false)
    const [timer, setTimer] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [input, setInput] = useState("")
    const [title, setTitle] = useState("")

    useEffect(()=>{
        if(isChannelHover || isUserHover){
            if(timer){
                clearTimeout(timer)
            }
            let top
            let left
            if(isChannelHover){
                top = channelname?.current?.getBoundingClientRect().bottom
                left = channelname?.current?.getBoundingClientRect().left
            }
            if(isUserHover){
                top = username?.current?.getBoundingClientRect().bottom
                left = username?.current?.getBoundingClientRect().left
            }
            setTimer(setTimeout(()=>{
                setShowPopUp({top, left, name: isUserHover ? data?.author?.name : data?.channel?.name, image: isUserHover ? data?.author?.profileImage : data?.channel?.image, type: isChannelHover ? "channel" : "user"})
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

    }, [isChannelHover, isPopUpHover, isUserHover])

    useEffect(()=>{
        if(isUser){
            setData(post)
            return
        }
        fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${post._id}`, {
            headers:  {
            'projectID': "2xrb7gmxn2kw"
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            if(res.status === "success"){
                setData(res.data)
            }
            else{
                console.warn(res.message)
            }
        })
        .catch((err)=>console.error(err))
    },[isVoted])

    let postDate = new Date(post.createdAt).getTime()
    let newDate = new Date().getTime()

    let created = (newDate - postDate)>86400000 ? 
      Math.floor((newDate - postDate)/86400000) + " Days": 
      (newDate - postDate)>3600000 ?
      Math.floor((newDate - postDate)/3600000)+ "hr" :
      Math.floor((newDate - postDate)/60000)+ "mins"

    const onClickHandler = (e)=>{
        setIsShare("")
        if(channelname?.current?.contains(e.target) || (showPopUp?.type === "channel" && popupRef?.current?.contains(e.target))){
            navigate(`/r/${data?.channel?.name}`)
        }
        else if(username?.current?.contains(e.target) || (showPopUp?.type === "user" && popupRef?.current?.contains(e.target))){
            navigate(`/user/${data?.author?.name}/${data?.author?._id}`)
        }
        else if(shareButton?.current?.contains(e.target)){
            if(isShare){
                setIsShare("")
                return
            }
            setIsShare({top: Math.floor(shareButton?.current?.getBoundingClientRect().bottom)+10, left: Math.floor(shareButton?.current?.getBoundingClientRect().left)})
        }
        else if(shareLink?.current?.contains(e.target)){
            if(data.author === user._id){
                navigator.clipboard.writeText(window.location)
                setIsShare("")
            }
            else{
                navigator.clipboard.writeText(window.location.origin+`/r/${data?.channel?.name || isUser}/comments/${data._id}`)
                setIsShare("")
            }
            
        }
        else if(upVoteButton?.current?.contains(e.target)){
            addLike(post._id, type==="channel" ? "channel" : "mainpost")
        }
        else if(downVoteButton?.current?.contains(e.target)){
            removeLike(post._id, type==="channel" ? "channel" : "mainpost")
        }
        else if(commentButton?.current?.contains(e.target)){
            dispatch(setcommentFocus(true))
            navigate(`/r/${data?.channel?.name || isUser}/comments/${data._id}`)
        }
        else if(deleteButton?.current?.contains(e.target)){
            deletePost(data._id, data.author)
        }
        else if(textareaRef?.current?.contains(e.target) || titleRef?.current?.contains(e.target)){
            setIsEdit(true)
        }
        else if(editButton?.current?.contains(e.target)){
            setIsEdit(!isEdit)
            if(isEdit){
                if(title && input){
                    updatePost(title, input, data?._id)
                    return
                }
            }
            setInput(data?.content)
            setTitle(data?.title)
        }
        else{
            setIsEdit(false)
            if(data.author === user._id) return
            setIsShare("")
            navigate(`/r/${data?.channel?.name || isUser}/comments/${data._id}`)
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

    useEffect(()=>{
        if(isEdit){
            textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 100)}px`
            titleRef.current.style.height = `${Math.max(titleRef.current.scrollHeight, 10)}px`
        }
    },[input, textareaRef.current, isEdit, titleRef.current])

  return (
    <div className={styles.postContainer} style={{marginBottom: postType==="classic" && "0", border: isDark ? `1px solid ${isDark.borderColor}`: "1px solid #bbb", gridTemplateColumns: isUser && "1fr"}} onClick={(e)=>onClickHandler(e)}>
        <div className={styles.postVoting} style={{backgroundColor: isDark.backgroundColor || "#ffffffcc", color: isDark.childColor, display: isUser && "none"}}>
            <div className={styles.postTitleVoting}>
                <div onMouseOver={()=>setUpVote(true)} onMouseOut={()=>setUpVote(false)} ref={upVoteButton}>
                    {upVote ? <PiArrowFatUpFill style={{transform: "scale(1.4)", top: "5px"}} className={styles.upVote}/> :
                    <PiArrowFatUp style={{transform: "scale(1.4)", top: "5px"}} className={styles.upVote}/>}
                </div>
                <p>{post?.likeCount || data?.likeCount || "0"}</p>
                <div onMouseOver={()=>setDownVote(true)} onMouseOut={()=>setDownVote(false)} ref={downVoteButton}>
                    {downVote ? <PiArrowFatDownFill style={{transform: "scale(1.4)"}} className={styles.downVote}/>  :
                    <PiArrowFatDown style={{transform: "scale(1.4)"}} className={styles.downVote}/>}
                </div>
            </div>
        </div>
        <div className={styles.postDetails} style={{padding: postType==="classic" && "2px 10px", backgroundColor: isDark.childbackgroundColor || "#fff", color: isDark.color}}>
            <div className={styles.posterdetails}>
                {
                    type !== "channel" &&  
                    <>
                        <img src={data?.channel?.image} />
                        <p className={styles.channelname} ref={channelname} onMouseOver={()=>setIsChannelHover(true)} onMouseOut={()=>setIsChannelHover(false)} onClick={(e)=>onClickHandler(e)}>r/{data?.channel?.name}</p>
                    </>
                }
                {data?.author?.name && <p className={styles.authorname} style={{color: isDark.childColor}}>Posted by <span onMouseOver={()=>setIsUserHover(true)} onMouseOut={()=>setIsUserHover(false)} ref={username}>u/{data?.author?.name}</span></p>}
                {post?.createdAt && <p className={styles.createdTimestamp} style={{color: isDark.childColor}}>{created} ago</p>}
            </div>
            <div className={styles.postTitle} style={{marginBottom: postType==="classic" && "2px"}}>
                {!isEdit && <p>{data?.title}</p>}
            </div>
            <div className={styles.postContent} style={{flexDirection: postType==="classic" && "row"}}>
                {post?.images && <img src={post?.images[0]} style={{width: postType==="classic" && "100px", height: postType==="classic" && "100px", borderRadius: postType==="classic" && "5px"}}/>}
                {!isEdit ? <p onClick={()=>{setIsEdit(true), setInput(data?.content)}}>{data?.content}</p> :
                <>
                <textarea style={{color: isDark.color, border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd"}} ref={titleRef} className={styles.changePost} value={title} onChange={(e)=>setTitle(e.target.value)}></textarea>
                <textarea style={{color: isDark.color, border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd"}} ref={textareaRef} className={styles.changePost} value={input} onChange={(e)=>setInput(e.target.value)}></textarea>
                </>}
            </div>
            <div className={styles.postCommentCount}>
                {data.author !== user._id && <p className={`${isDark ? styles.darkHover : styles.lighteHover}`} style={{margin: postType==="classic" && "2px 10px 2px 2px", color: isDark.childColor || "#888"}} ref={commentButton}><AiOutlineMessage style={{position: "relative", top: "3px", fontSize: "1rem"}}/> {data?.commentCount} Comments</p>}
                <p className={`${isDark ? styles.darkHover : styles.lighteHover}`} style={{margin: postType==="classic" && "2px 10px 2px 2px", color: isDark.childColor || "#888"}} ref={shareButton}><IoMdShareAlt style={{position: "relative", top: "3px", fontSize: "1rem"}}/> Share</p>
                {data.author === user._id && <p className={`${isDark ? styles.darkHover : styles.lighteHover}`} style={{margin: postType==="classic" && "2px 10px 2px 2px", color: isDark.childColor || "#888"}} ref={editButton} ><HiPencilSquare style={{position: "relative", top: "3px", fontSize: "1rem"}}/> {isEdit ? "Save" : "Edit"}</p>}
                {data.author === user._id && <p className={`${isDark ? styles.darkHover : styles.lighteHover}`} style={{margin: postType==="classic" && "2px 10px 2px 2px", color: isDark.childColor || "#888"}} ref={deleteButton}><GoCircleSlash style={{position: "relative", top: "3px", fontSize: "1rem"}}/> Remove</p>}
                {
                    isShare && 
                    <div ref={shareLink} className={styles.sharePop} style={{top: `${isShare.top}px`, left: `${isShare.left}px`, backgroundColor: isDark.backgroundColor || "#fff"}}><FiLink /> Copy Link</div>
                }
            </div>
        </div>
        <div ref={popupRef}>
            {showPopUp && <ChannelHover showPopUp={showPopUp} setIsPopUpHover={setIsPopUpHover} />}
        </div>
    </div>
  )
}

export default PostLogin