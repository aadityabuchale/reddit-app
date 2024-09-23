import React, { useState } from 'react'
import styles from "./PostDetail.module.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import useFetch from '../../../useHooks/useFetch'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose, AiOutlineMessage } from 'react-icons/ai'
import { PiArrowFatDown, PiArrowFatDownFill, PiArrowFatUp, PiArrowFatUpFill } from 'react-icons/pi'
import { closeAuthentication, openAuthentication, setPosts, setcommentFocus, startLoading } from '../../../MyStore/action'
import Button from '../../Button/Button'
import Comments from './Comments'
import ChannelInfo from '../../Channel/ChannelInfo'
import { createRef } from 'react'

function PostDetail() {
    const postDetail = useSelector((state)=>state.DataSetter)
    const { user } = useSelector((state)=>state.UserSetter)
    const { isComment, isDark, isAside, isAuth } = useSelector((state)=>state.UISetter)
    const dispatch = useDispatch()
    const { fetchPost, fetchComment, fetchChannelbyName, createComment, addLike, removeLike } = useFetch()
    const { id } = useParams()
    const navigate = useNavigate()
    const commentInput = createRef()
    const [upVote, setUpVote] = useState(false)
    const [downVote, setDownVote] = useState(false)
    const [upVote1, setUpVote1] = useState(false)
    const [downVote1, setDownVote1] = useState(false)
    const [comment, setComment] = useState("")
    const [channelTheme, setChannelTheme] = useState('')

    useEffect(()=>{
        if(!postDetail?.singlePost || postDetail?.singlePost?._id!==id){
            fetchPost(id, 'singlePost')
        }
        else if(!postDetail?.comments || (postDetail?.comments?.length > 0 && postDetail?.comments[0]?.post!==id)){
            fetchComment(id)
        }
        else if(!postDetail?.singleChannel || postDetail?.singleChannel?.name !== postDetail?.singlePost?.channel?.name){
            fetchChannelbyName(postDetail.singlePost.channel.name, "singleChannel")
        }
    },[postDetail, user, id])

    useEffect(()=>{
        if(isComment){
            commentInput?.current?.focus()
            commentInput?.current?.scrollIntoView({ behavior: "smooth" })
            dispatch(setcommentFocus(false))
            return
        }
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
    <div className={styles.postDetail}>
        <div className={styles.postBarNav}>
            <div className={styles.postBarVoting}>
                <div onMouseOver={()=>setUpVote(true)} onMouseOut={()=>setUpVote(false)} onClick={()=>addLike(id, "singlepost")}>
                    {upVote ? <PiArrowFatUpFill style={{transform: "scale(1.4)"}} className={styles.upVote}/> :
                    <PiArrowFatUp style={{transform: "scale(1.4)"}} className={styles.upVote}/>}
                </div>
                <p>{postDetail?.singlePost?.likeCount}</p>
                <div onMouseOver={()=>setDownVote(true)} onMouseOut={()=>setDownVote(false)} onClick={()=>removeLike(id, "singlepost")}>
                    {downVote ? <PiArrowFatDownFill style={{transform: "scale(1.4)"}} className={styles.downVote}/>  :
                    <PiArrowFatDown style={{transform: "scale(1.4)"}} className={styles.downVote}/>}
                </div>
            </div>
            <div className={styles.postDetailClose} onClick={()=>{
                navigate(-1)
                }}>
                <AiOutlineClose /> Close
            </div>
        </div>
        <div className={styles.postDetails} style={{backgroundColor: isDark ? "#000": "#DAE0E6"}}>
            <div className={styles.postMainDiv} style={{backgroundColor: isDark.backgroundColor || "#fff", color: isDark.color}}>
                <div className={styles.postTitle}>
                    <div className={styles.postTitleVoting} style={{color: isDark.childColor}}>
                        <div onMouseOver={()=>setUpVote1(true)} onMouseOut={()=>setUpVote1(false)} onClick={()=>addLike(id, "singlepost")}>
                            {upVote1 ? <PiArrowFatUpFill style={{transform: "scale(1.4)", top: "5px"}} className={styles.upVote}/> :
                            <PiArrowFatUp style={{transform: "scale(1.4)", top: "5px"}} className={styles.upVote}/>}
                        </div>
                        <p>{postDetail?.singlePost?.likeCount}</p>
                        <div onMouseOver={()=>setDownVote1(true)} onMouseOut={()=>setDownVote1(false)} onClick={()=>removeLike(id, "singlepost")}>
                            {downVote1 ? <PiArrowFatDownFill style={{transform: "scale(1.4)"}} className={styles.downVote}/>  :
                            <PiArrowFatDown style={{transform: "scale(1.4)"}} className={styles.downVote}/>}
                        </div>
                    </div>
                    <div className={styles.postTitleDiv}>
                        <img src={postDetail?.singleChannel?.image}/>
                        <p style={{color: isDark.color || "#000"}} onClick={()=>navigate(`/r/${postDetail?.singleChannel?.name}`)}>r/{postDetail?.singleChannel?.name}</p>
                        <p style={{color: isDark.childColor || "#576f76"}}>Posted by <span onClick={()=>navigate(`/user/${postDetail?.singlePost?.author?.name}`)}>u/{postDetail?.singlePost?.author?.name}</span>. 2 day ago</p>
                    </div>
                </div>
                <div className={styles.postContentDiv}>
                    <p className={styles.postContent} style={{color: isDark.color || "#1C1C1C"}}>{postDetail?.singlePost?.content}</p>
                    <div className={styles.postCommentCount}>
                        <p style={{color: isDark.childColor || "#888"}}><AiOutlineMessage style={{position: "relative", top: "3px", fontSize: "1rem"}}/> {postDetail?.singlePost?.commentCount} Comments</p>
                    </div>
                </div>
                <div className={styles.commentUpload}>
                    <p>Comment as <Link to={`/user/${user?.name}/${user?._id}`}>{user?.name}</Link></p>
                    <textarea value={comment} onChange={(e)=>setComment(e.target.value)} style={{border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #eee", color: isDark.color}} placeholder='What are your thoughts?' ref={commentInput}></textarea>
                    <div style={{backgroundColor: isDark.childbackgroundColor || "#DAE0E6"}}>
                        <Button m="0" p="3px 10px" fs="0.875rem" br="50px" bc={isDark.color || "#006cbf"} hbc={isDark.color || "#006cbfcc"} c={isDark.switchColor || "#fff"} dis={!comment} onClick={()=>{createComment(id,comment),setComment("")}}>Comment</Button>
                    </div>
                </div>
                <div className={styles.commentTitle} style={{color: isDark.color || "#333"}}>
                    <p>Top Comments</p>
                </div>
                <hr className={styles.border} style={{borderTop: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #eee"}}></hr>
                <div className={styles.commentsDiv}>
                    {
                        postDetail?.comments && 
                        postDetail?.comments.map((comment, idx)=>(
                            <Comments value={comment} key={idx} children={comment.children}/>
                        ))
                    }
                </div>
            </div>
            <div className={styles.channelAside} style={{display: isAside && window.innerWidth < 950 && "none"}}>
                <ChannelInfo channel={postDetail?.singleChannel} type={"channelPost"} channelTheme={channelTheme} setChannelTheme={setChannelTheme}/>
                <Button w="calc(100% - 176px)" m="150px 88px 0 88px" p="7px 15px" c={isDark.switchColor || "#fff"} fs="0.875rem" fw="500" br="50px" bc={isDark.color || "#006cbf"} hbc={isDark.color || "#006cbfdd"} po="sticky" ptype="top" ppx="92vh" onClick={()=>{
                    window.scrollTo({top: 0,behavior: 'smooth'})
                }}>Back to Top</Button>
            </div>
        </div>
    </div>
  )
}

export default PostDetail