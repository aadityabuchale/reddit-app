import React from 'react'
import styles from "./User.module.css"
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import Button from "../Button/Button"
import { ImFire } from 'react-icons/im'
import { MdOutlineVerified } from 'react-icons/md'
import userlogo from "../../Assets/Add Post Logo.png"
import { useDispatch, useSelector } from 'react-redux'
import { GiBurningDot } from "react-icons/gi"
import { LuCakeSlice } from 'react-icons/lu'
import { closeAuthentication, openAuthentication, startFetching, startLoading } from '../../MyStore/action'
import LogoLoader from "../LogoLoader/LogoLoader"
import { ThreeDots } from  "react-loader-spinner"
import EmptyPost from '../Posts/EmptyPost/EmptyPost'
import useFetch from '../../useHooks/useFetch'
import CreatePostinfo from '../CreatePost/CreatePostinfo'
 
function User() {
    const { user } = useSelector((state)=>state.UserSetter)
    const postDetail = useSelector((state)=>state.DataSetter)
    const { isFetching, isDark, isAside, isAuth } = useSelector((state)=>state.UISetter)
    const { fetchUser, followUser, unFollowUser, fetchPostbyUser } = useFetch()
    const { userId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userName } = useParams()
    const [userData, setUserData] = useState()
    const [sortType, setSortType] = useState('hot')
    const [theme, setTheme] = useState('')
    const [isloading, setIsLoading] = useState(false)

    useEffect(()=>{
        if(!user) return
        fetchUser(userId)
        fetchPostbyUser(userId, "userPosts")
        dispatch(startFetching())
        document.title = `${userName+" (u/"+userName+")"} - Reddit`
        window.scrollTo({top: 0,behavior: 'smooth'})
    },[user, userId])

    useEffect(()=>{
        setUserData(postDetail?.userDetails)
        setIsLoading(false)
    },[postDetail])

    useEffect(()=>{
        if(user){
            dispatch(closeAuthentication())
            return
        }
        if(!user && !isAuth){
            setTimeout(() => {
                dispatch(startLoading())
                dispatch(openAuthentication("login"))
            }, 1000)
        }
    },[isAuth, user])

    const handlefollow = ()=>{
        if(isloading){
            return
        }
        if(userData?._id === user?._id){
            navigate('/submit')
        }
        else{
            if(userData?.isFollowed){
                unFollowUser(userId)
                setIsLoading(true)
            }
            else{
                followUser(userId)
                setIsLoading(true)
            }
        }
    }

    let userCreated = new Date(userData?.createdAt).getTime()
    let newDate = new Date().getTime()
    let created = (newDate - userCreated)>86400000 ? 
    Math.floor((newDate - userCreated)/86400000) + " d": Math.floor((newDate - userCreated)/3600000)+ "hr"

    const date = new Date(userData?.createdAt);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate().toString().padStart(2, '0')

  return (
    <div className={styles.User} style={{backgroundColor: isDark ? "#000" : "#DAE0E6"}}>
        {
            isFetching ?
            <LogoLoader /> :
            <>
                <div className={styles.emptyContainers}>
                    {   postDetail?.userPosts?.length > 0 ? 
                            <CreatePostinfo Posts={postDetail?.userPosts} type="channel" isUser={postDetail?.userDetails?.name} channelTheme={theme}/>
                        :
                        <div>
                            <div className={styles.sortType} style={{backgroundColor: isDark.backgroundColor || "#fff", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ccc"}}>
                                <Button p="5px 15px" fs="1rem" m="0 15px 0 0" br="50px" c={sortType==="hot"? theme ? `#${theme}` : "#006cbf" : isDark.childColor || "#576f76"} bc={sortType==="hot"? isDark.childbackgroundColor || "#eeeeeebb" : "transparent"} hbc={isDark.childbackgroundColor || "#eee"} onClick={()=>setSortType('hot')}><ImFire /> Hot </Button>
                                <Button p="5px 15px" fs="1rem" m="0 15px 0 0" br="50px" c={sortType==="new"? theme ? `#${theme}` : "#006cbf" : isDark.childColor || "#576f76"} bc={sortType==="new"? isDark.childbackgroundColor || "#eeeeeebb" : "transparent"} hbc={isDark.childbackgroundColor || "#eee"} onClick={()=>setSortType('new')}><MdOutlineVerified style={{position: 'relative', top: "2px", transform: "scale(1.2)"}}/> New</Button>
                            </div>
                            <EmptyPost username={`u/${userData?.name}`}/>
                        </div>
                    }
                </div>
                <div className={styles.userContainer} style={{display: isAside && window.innerWidth< 950 && "none"}}>
                    <div className={styles.user} style={{backgroundColor: isDark.backgroundColor || "#fff", color: isDark.color}}>
                        <div style={{backgroundColor: `#${theme}`}}></div>
                        <div>
                            <img src={userData?.profileImage || userlogo} />
                        </div>
                        <div>
                            <p>{userData?.name}</p>
                            <p style={{color: isDark.childColor || "#576f76"}}>u/{userData?.name} · {created}</p>
                        </div>
                        <Button w="calc(100% - 20px)" m="10px" p="5px 15px" fs="1rem" fw="500" c="#fff" br="50px" bc="#ff4500" hbc="#ff4500ee" onClick={()=>{
                            setTheme(Math.floor(Math.random()*16777215).toString(16))
                        }}>Change Theme</Button>
                        <div className={styles.channelmembers}>
                            <div className={styles.members}>
                                <p>Karma</p>
                                <p style={{color: isDark.childColor || "#576f76"}}><GiBurningDot style={{color: theme ? theme : "#006cbf"}}/> 1</p>
                            </div>
                            <div className={styles.members}>
                                <p>Cake Day</p>
                                <p style={{color: isDark.childColor || "#576f76"}}><LuCakeSlice style={{color: theme ? theme : "#006cbf"}}/> {`${month} ${day}, ${year}`}</p>
                            </div>
                        </div>
                        <Button w="calc(100% - 20px)" m="10px" p="5px 15px" fs="1rem" fw="500" c={isDark.switchColor || "#fff"} br="50px" bc={isDark ? isDark.color : theme ? `#${theme}` : "#006cbf"} hbc={isDark ? isDark.color : theme ? `#${theme}` : "#006cbfee"} onClick={handlefollow}>{userData?._id === user?._id ? "New Post" : isloading ? <ThreeDots height={20.5} color={isDark.switchColor || '#fff'} width="100%" wrapperStyle={{transform: "scale(0.4)"}}/>  : userData?.isFollowed ? "Unfollow" : "Follow"}</Button>
                    </div>
                    {window.innerWidth > 700 &&
                    <Button w="calc(100% - 176px)" m="175px 88px 0 88px" p="7px 15px" c={isDark.switchColor || "#fff"} fs="0.875rem" fw="500" br="50px" bc={isDark.color || "#006cbf"} hbc={isDark.color || "#006cbfdd"} po="sticky" ptype="top" ppx="92vh" onClick={()=>{
                        window.scrollTo({top: 0,behavior: 'smooth'})
                    }}>Back to Top</Button>}
                </div>
            </>
        }
    </div>
  )
}

export default User