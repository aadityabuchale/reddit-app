import React from 'react'
import styles from "./Main.module.css"
import Posts from '../Posts/Posts'
import Community from '../Community/Community'
import { useDispatch, useSelector } from 'react-redux'
import LogoLoader from '../LogoLoader/LogoLoader'
import useFetch from "../../useHooks/useFetch"
import { useEffect } from 'react'
import { startFetching, stopFetching } from '../../MyStore/action'
import CreatePostinfo from '../CreatePost/CreatePostinfo'
import HomeAds from '../HomeAds/HomeAds'
import Button from '../Button/Button'

function Main() {
    const { isFetching, isDark, isAside, pageNum }  = useSelector((state)=>state.UISetter)
    const { user, userToken } = useSelector((state)=>state.UserSetter)
    const postDetail = useSelector((state)=>state.DataSetter)
    const dispatch = useDispatch()
    const { fetchPost, fetchChannel, fetchPostbyPage } = useFetch()

    useEffect(()=>{
      document.title  = "Reddit - Dive into anything"
      window.scrollTo({top: 0,behavior: 'smooth'})
      if(postDetail?.mainPosts && postDetail?.mainChannels){
        return
      }
      dispatch(startFetching())
      fetchPost("", "mainPosts")
      fetchChannel("", "mainChannels")
    },[])

    useEffect(()=>{
        if(postDetail?.mainPosts && postDetail?.mainChannels){
          dispatch(stopFetching())
        }
    },[postDetail])

    useEffect(() => {
      let isFetching = false; 
    
      const handleScroll = () => {
        if (!isFetching && (document.body.scrollHeight - (window.innerHeight + window.scrollY)) < 100) {
          if(pageNum === "null") return
          isFetching = true; 
          fetchPostbyPage("mainPosts", postDetail?.mainPosts)
          setTimeout(() => {
            isFetching = false; 
          }, 1500);
        }
      };
    
      window.addEventListener("scroll", handleScroll);
    
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [postDetail]);
    
  return (
    <div className={styles.main} style={{backgroundColor: user ? isDark ? "#000" : "#DAE0E6" : "#fff"}}>
        {
            isFetching ?
            <LogoLoader />
            :
            userToken ?
            <>
              <CreatePostinfo Posts={postDetail.mainPosts} type="post"/>
              <div className={styles.homeAdsContainer} style={{display: isAside && window.innerWidth < 950 && "none"}}>
                <HomeAds />
                <Button w="calc(100% - 176px)" m="50px 88px 0 88px" p="7px 15px" c={isDark.switchColor || "#fff"} fs="0.875rem" fw="500" br="50px" bc={isDark.color || "#006cbf"} hbc={isDark.color || "#006cbfdd"} po="sticky" ptype="top" ppx="92vh" onClick={()=>window.scrollTo({top: 0,behavior: 'smooth'})}>Back to Top</Button>
              </div>
            </> :
            <>
              <Posts Posts={postDetail?.mainPosts}/>
              <Community channel={postDetail?.mainChannels}/>
            </>
        }
    </div>
  )
}

export default Main