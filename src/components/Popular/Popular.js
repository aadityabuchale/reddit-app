import React, { useEffect, useState } from 'react'
import styles from "./Popular.module.css"
import Main from '../Main/Main'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../useHooks/useFetch'
import { closeAuthentication, openAuthentication, setPosts, startLoading } from '../../MyStore/action'

function Popular() {
    const postDetail = useSelector((state)=>state.DataSetter)
    const { user } = useSelector((state)=>state.UserSetter)
    const { isDark, isAside, isAuth } = useSelector((state)=>state.UISetter)
    const { fetchPostbyChannel } = useFetch()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [postChannel, setPostChannel] = useState("")

    useEffect(()=>{
        dispatch(setPosts("popularPosts", null))
        window.scrollTo({top: 0,behavior: 'smooth'})
    },[])

    useEffect(()=>{
        if(postDetail?.mainChannels && !postDetail?.popularPosts){
            let idx = Math.floor(Math.random()*(postDetail?.mainChannels?.length-1))
            fetchPostbyChannel(postDetail.mainChannels[idx]._id,"popularPosts")
            setPostChannel(postDetail.mainChannels[idx])
        }
    },[postDetail, user])

    useEffect(()=>{
        if(postChannel){
            dispatch(setPosts("popularPostChannel", postChannel))
        }
    }, [postChannel])

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
    <div className={styles.popular} style={{backgroundColor: user ? isDark ? "#000" : "#DAE0E6" : "#fff"}}>
        <div className={styles.popularDiv} style={{maxWidth: isAside && window.innerWidth > 700 &&  "calc(100vw - 277px)"}}>
            <div className={styles.popularHeading} style={{color: isDark.color}}>Trending Today</div>
            <div className={styles.popularPosts}>
                {   postDetail?.popularPosts?.length > 1 &&
                    postDetail.popularPosts.map((post, idx)=>{
                        if(post.images){
                            return (
                                <div key={idx} className={styles.postDiv} style={{backgroundImage: `url(${post?.images[0]})`}} onClick={()=>navigate(`/r/${postChannel?.name}/comments/${post._id}`)}>
                                    <div className={styles.postDivContainer}>
                                        <p className={styles.postTitle}>{post?.title}</p>
                                        <p className={styles.postContent}>{post?.content}</p>
                                        <div className={styles.channelInfo}>
                                            <img src={postChannel?.image}/>
                                            <p>r/{postChannel?.name}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
        <Main />
    </div>
  )
}

export default Popular