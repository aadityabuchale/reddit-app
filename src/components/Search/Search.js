import React, { useEffect, useRef } from 'react'
import styles from "./Search.module.css"
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import PostLogin from '../Posts/Post/PostLogin'
import ChannelUser from './ChannelUser'
import telescopeIcon from "../../Assets/telescope-snoo.svg"
import { searchSetter } from '../../MyStore/action'
import { useNavigate } from 'react-router-dom'

function Search() {
    const searchDetail = useSelector((state)=>state.SearchSetter)
    const { isDark, isFirst } = useSelector((state)=>state.UISetter)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchResult = useRef()
    
    useEffect(()=>{
        if(searchDetail?.searchPosts?.length > 0){
            dispatch(searchSetter("searchType", "Posts"))
        }
        else if(searchDetail?.searchCommunities?.length > 0){
            dispatch(searchSetter("searchType", "Channel"))
        }
        else if(searchDetail?.searchUsers?.length > 0){
            dispatch(searchSetter("searchType", "User"))
        }
        else{
            dispatch(searchSetter("searchType", "Comments"))
        }
    },[searchDetail?.searchPosts, searchDetail?.searchCommunities, searchDetail?.searchUsers, searchDetail?.searchComments])

    useEffect(()=>{
        if(isFirst){
            navigate("/")
        }
        window.scrollTo({top: 0,behavior: 'smooth'})
    },[])

    let ButtonStyle = { p:"8px 25px", br:"50px", m:"0 10px 0 0", fs:"1.1rem", fw:"500", hbc:isDark.childbackgroundColor || "#eee", c:isDark.color }

  return (
    <div className={styles.searchPage} style={{backgroundColor: isDark ? "#000" : "#DAE0E6"}}>
        <div className={styles.searchPagContainer}>
            <div className={styles.searchViewType}>
                <Button {...ButtonStyle} bc={searchDetail.searchType === "Posts" ? isDark.childbackgroundColor || "#eee" : "transparent"} onClick={()=>dispatch(searchSetter("searchType", "Posts"))}>Posts</Button>
                <Button {...ButtonStyle} bc={searchDetail.searchType === "Comments" ? isDark.childbackgroundColor || "#eee" : "transparent"} onClick={()=>dispatch(searchSetter("searchType", "Comments"))}>Comments</Button>
                <Button {...ButtonStyle} bc={searchDetail.searchType === "Channel" ? isDark.childbackgroundColor || "#eee" : "transparent"} onClick={()=>dispatch(searchSetter("searchType", "Channel"))}>Communities</Button>
                <Button {...ButtonStyle} bc={searchDetail.searchType === "User" ? isDark.childbackgroundColor || "#eee" : "transparent"} onClick={()=>dispatch(searchSetter("searchType", "User"))}>People</Button>
            </div>
            <div className={styles.searchResultContainer} ref={searchResult}>
                <div style={{width: "100%"}}>
                    {
                        searchDetail.searchType === "Posts" && searchDetail?.searchPosts?.length > 0 ?
                        searchDetail?.searchPosts?.map((post)=>(
                            <PostLogin post={post} type="post" postType="classic"/>
                        )) 
                        :
                        searchDetail.searchType === "Comments" && searchDetail?.searchComments?.length > 0 ?
                        searchDetail?.searchComments?.map((comment, idx)=>(
                            <div key={idx} className={styles.searchcommentTile} style={{backgroundColor: isDark.backgroundColor || "#fff", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd", color: isDark.color}}>
                                <p style={{color: isDark.childColor || "#576f76"}}>Commented {(new Date().getTime() - new Date(comment.createdAt).getTime())>86400000 ? 
                                Math.floor((new Date().getTime() - new Date(comment.createdAt).getTime())/86400000) + " Days": 
                                (new Date().getTime() - new Date(comment.createdAt).getTime())>3600000 ?
                                Math.floor((new Date().getTime() - new Date(comment.createdAt).getTime())/3600000)+ "hr" :
                                Math.floor((new Date().getTime() - new Date(comment.createdAt).getTime())/60000)+ "min"} ago</p>{comment.content}</div>
                        )) :
                        searchDetail.searchType === "Channel" && searchDetail?.searchCommunities?.length > 0 ?
                        searchDetail?.searchCommunities?.map((channel, idx)=>(
                            <ChannelUser key={idx} value={channel} type="channel" fullView={true}/>
                        )):
                        searchDetail.searchType === "User" && searchDetail?.searchUsers?.length > 0 ? 
                        searchDetail?.searchUsers?.map((user,idx)=>(
                            <ChannelUser key={idx} value={user} type="user" fullView={true}/>
                        )) :
                        <div className={styles.noSearchResults} style={{backgroundColor: isDark.backgroundColor || "#fff", color: isDark.color, border: isDark ? `1px solid ${isDark.borderColor}` : '1px solid #ddd'}}>
                            <img src={telescopeIcon} />
                            <p>Hm... we couldn&apos;t find any results for “{window.location.search.split("?")[1]}”</p>
                            <p style={{color: isDark.childColor || "#576f76"}}>Double-check your spelling or try different keywords</p>
                        </div>
                    }
                </div>
                <div className={styles.SearhRightSide} style={{display: (searchDetail?.searchCommunities?.length<1 && searchDetail?.searchUsers?.length<1) && "none" }}>
                    <div className={styles.SearchCommunity} style={{display: searchDetail?.searchCommunities?.length<1 && "none", backgroundColor: isDark.backgroundColor || "#fff", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd", color: isDark.color}}>
                        <div>Communities</div>
                        {
                            searchDetail?.searchCommunities?.map((channel, idx)=>{
                                if(idx>5) return
                                else 
                                return <ChannelUser key={idx} value={channel} type="channel"/>
                            })
                        }
                    </div>
                    <div className={styles.SearchCommunity} style={{display: searchDetail?.searchUsers?.length<1 && "none", backgroundColor: isDark.backgroundColor || "#fff", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd", color: isDark.color}}>
                        <div>Peoples</div>
                        {
                            searchDetail?.searchUsers?.map((user,idx)=>{
                                if(idx>5) return
                                else 
                                return <ChannelUser key={idx} value={user} type="user"/>
                            })
                        }
                    </div>
                    {
                        (searchResult?.current?.getBoundingClientRect().height >= window.innerHeight) && <Button m="50px 0 0 0" w="100%" p="7px 20px" br="50px" fs="1rem" fw="500" po="sticky"  ptype="top" ppx="93%" onClick={()=>window.scrollTo({top: 0,behavior: 'smooth'})}>Back to top</Button>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search