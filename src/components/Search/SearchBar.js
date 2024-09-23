import React, { useEffect, useState } from 'react'
import styles from "./SearchBar.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../useHooks/useFetch'
import { setPosts } from '../../MyStore/action'

function SearchBar({ pos, setIsFocus }) {
    const postDetail  = useSelector((state)=>state.DataSetter)
    const searchDetail = useSelector((state)=>state.SearchSetter)
    const { user } = useSelector((state)=>state.UserSetter)
    const { isDark } = useSelector((state)=>state.UISetter)
    const { fetchPostbyChannel } = useFetch()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [post, setPost] = useState(postDetail?.popularPosts?.filter((e)=> e.images !== null).splice(0,4))
    const [index, setIndex] = useState("")

    useEffect(()=>{
        if(postDetail?.mainChannels && !postDetail?.popularPosts){
            let idx = Math.floor(Math.random()*(postDetail?.mainChannels?.length-1))
            fetchPostbyChannel(postDetail.mainChannels[idx]._id,"popularPosts")
            setIndex(idx)
        }
        setPost(postDetail?.popularPosts?.filter((e)=> e.images !== null).splice(0,4))
    },[postDetail, user])


    useEffect(()=>{
        if(!index) return
        dispatch(setPosts("popularPostChannel", postDetail.mainChannels[index]))
    },[index])
    
return (
    <div className={styles.searchbar} style={{width: pos.width, top: pos.bottom, left: window.innerWidth > 500 && pos.left, backgroundColor: isDark.backgroundColor || "#fff", borderBottom: isDark ? `1px solid ${isDark.borderColor}` :"1px solid #ddd", borderRight: isDark ? `1px solid ${isDark.borderColor}` :"1px solid #ddd", borderLeft: isDark ? `1px solid ${isDark.borderColor}` :"1px solid #ddd"}}>
        {
            searchDetail?.searchUsers?.length>0 && 
            <div>
                <div className={styles.searchTypeTitle} style={{color: isDark.childColor || "#576f76"}}>Peoples</div>
                {
                    searchDetail?.searchUsers?.splice(0,4).map((user, idx)=>(
                        <div key={idx} className={`${styles.searchPopularCommunity} ${isDark ? styles.darkHover : styles.lighteHover}`} style={{borderBottom: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd"}} onClick={()=>{setIsFocus(false), navigate(`/user/${user.name}/${user._id}`)}}>
                            <div className={styles.searchPopularChannelName}>
                                <img src={user.profileImage}/>
                                <p>r/{user.name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        }
        {
            searchDetail?.searchCommunities?.length>0 && 
            <div>
                <div className={styles.searchTypeTitle} style={{color: isDark.childColor || "#576f76"}}>Communities</div>
                {
                    searchDetail?.searchCommunities?.splice(0,4).map((channel, idx)=>(
                        <div key={idx} className={`${styles.searchPopularCommunity} ${isDark ? styles.darkHover : styles.lighteHover}`} style={{borderBottom: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd"}} onClick={()=>{setIsFocus(false), navigate(`/r/${channel.name}`)}}>
                            <div className={styles.searchPopularChannelName}>
                                <img src={channel.image}/>
                                <p>r/{channel.name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        }
        {post &&
            <div>
                <div className={styles.searchTypeTitle} style={{color: isDark.childColor || "#576f76"}}>Trending Today</div>
                {
                    post.map((post, idx)=>(
                        <div key={idx} className={`${styles.searchPopular} ${isDark ? styles.darkHover : styles.lighteHover}`} style={{borderBottom: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd"}} onClick={()=>{setIsFocus(false), navigate(`/r/${postDetail.popularPostChannel.name}/comments/${post._id}`)}}>
                            <div className={styles.searchPopularChannelName}>
                                <img src={postDetail?.popularPostChannel?.image}/>
                                <p>r/{postDetail?.popularPostChannel?.name}</p>
                            </div>
                            <div className={styles.popularPostContent}>
                                <p style={{color: isDark.childColor}}>{post.content}</p>
                                <img src={post.images[0]}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        }
    </div>
  )
}

export default SearchBar