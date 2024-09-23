import React, { createRef, useEffect, useRef, useState } from 'react'
import styles from '../NavBar/NavBar.module.css'
import { RxHamburgerMenu } from "react-icons/rx"
import { BsQrCodeScan } from "react-icons/bs"
import { BsThreeDots } from "react-icons/bs"
import { CiSearch } from "react-icons/ci"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BsArrowUpRightCircle } from "react-icons/bs"
import { AiOutlinePlus } from "react-icons/ai"
import { LuBell } from "react-icons/lu"
import { BsFillArrowUpRightCircleFill } from "react-icons/bs"
import { BiSolidHome } from  "react-icons/bi"
import { AiOutlineMessage } from "react-icons/ai"
import { HiPlusSmall } from "react-icons/hi2"
import { MdOutlineCampaign } from "react-icons/md"
import { TbPremiumRights } from "react-icons/tb"
import { IoSearch } from "react-icons/io5"
import { GiBurningDot } from "react-icons/gi"
import { IoIosArrowDown } from "react-icons/io"
import logonamelight from "../../Assets/Reddit_logo_full_name.png"
import logoImg from "../../Assets/Reddit_logo_full_lmg.png"
import logonamedark  from "../../Assets/RedditWhite.png"
import userLogo from "../../Assets/User Logo Half.png"
import navRouteLogo from "../../Assets/User Icons/profileIcon_icon10.png"
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { closeMessage, openAuthentication, openDownload, openMessage, openNotification, openUserContainer, setAside, setPostType, setWarningMessages, startLoading } from '../../MyStore/action'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../Search/SearchBar'
import useSearch from '../../useHooks/useSearch'

function NavBar() {
    const { user, isOnline } = useSelector((state)=>state.UserSetter)
    const { isDark, isAside, isMessage} = useSelector((state)=>state.UISetter)
    const postDetail = useSelector((state)=>state.DataSetter)
    const { messages } = useSelector((state)=>state.WarningSetter)
    const { searchPost, searchComment, searchChannel, searchUser } = useSearch()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const notifyButton = createRef()
    const inputRef = useRef()
    const searchRef = useRef()
    const [input , setinput] = useState('')
    const [navbarRoute, setNavBarRoute] = useState('Home')
    const [isFocus, setIsFocus] = useState(false)
    const [timer, setTimer] = useState('')

    let NavBarRoutes = {
        "/" : "Home",
        "/submit" : "Create Post",
        "/r/popular" : "Popular",
        "/premium" : "Premium",
        "/search" : "Search"
    }

    useEffect(()=>{
        if(window.location.pathname.split("/")[1] === "user"){
            setNavBarRoute(`u/${window.location.pathname.split("/")[2].split("%20").join(" ")}`)
        }
        else if(window.location.pathname.split("/")[1] === "r" && window.location.pathname.split("/")[2] !== "popular"){
            setNavBarRoute(`r/${window.location.pathname.split("/")[2].split("%20").join(" ")}`)
        }
        else{
            setNavBarRoute(NavBarRoutes[window.location.pathname])
        }
        
    },[window.location.pathname])

    useEffect(()=>{
        if(input){
            if(timer){
                clearTimeout(timer)
            }
            setTimer(setTimeout(()=>{
                searchPost(input)
                searchComment(input)
                searchChannel(input)
                searchUser(input)
            },500))
        }
    },[input])

    function handleSearchSubmit(e){
        e.preventDefault()
        if(!input) return
        clearTimeout(timer)
        setIsFocus(false)
        navigate(`/search?${input}`)
        searchPost(input)
        searchComment(input)
        searchChannel(input)
        searchUser(input)
        setinput("")
    }

    useEffect(()=>{
        window.addEventListener("click", (e)=>{
            if(!inputRef?.current?.contains(e.target)){
                setIsFocus(false)
            }
            else{
                setIsFocus(true)
                searchRef?.current?.focus()
            }
        })

        return window.removeEventListener("click", ()=>{})
    },[])

  return (
    <div className={styles.navBar} style={{backgroundColor: isDark ? isDark.backgroundColor : "#fff", borderBottom: isDark ? `1px solid ${isDark.borderColor}` : "1px solid rgba(0, 0, 0, 0.2)", color: isDark.color}}>
        <div className={styles.logoDiv} title='Go to Reddit Home'>
            {!user && <RxHamburgerMenu className={styles.hambermenu} onClick={()=>dispatch(setAside(!isAside))}/>}
            <img className={styles.navLogo} src={logoImg} onClick={()=>{navigate("/"), window.scrollTo({top: 0,behavior: 'smooth'})}}/>
            <img className={styles.navLogo} src={isDark ? logonamedark : logonamelight} onClick={()=>{navigate("/"), window.scrollTo({top: 0,behavior: 'smooth'})}}/>
        </div>
        {   user &&
            <div className={`${styles.navBarRoutes} ${isDark ? styles.darkBorderHover : styles.lightBorderHover}`} onClick={()=>dispatch(setAside(!isAside))}>
                <div>
                    {
                        navbarRoute === "Home" ?
                        <BiSolidHome className={styles.navBarRoutesLogo}/> : 
                        navbarRoute === "Popular" ?
                        <BsFillArrowUpRightCircleFill className={styles.navBarRoutesLogo}/> :
                        navbarRoute === "Premium" ?
                        <TbPremiumRights className={styles.navBarRoutesLogo}/> :
                        navbarRoute === "Create Post" ?
                        <HiPlusSmall className={styles.navBarRoutesLogo}/> :
                        navbarRoute === "Search" ? 
                        <IoSearch className={styles.navBarRoutesLogo}/> : 
                        <img src={navbarRoute.split("/")[0] === "r" ? postDetail?.singleChannel?.image : postDetail?.userDetails?.profilImage || navRouteLogo}/>
                    } 
                    <p className={styles.navBarRouteName}>{navbarRoute}</p>
                </div>
                <div><IoIosArrowDown /></div>
            </div>
        }
        <div ref={inputRef} className={styles.navFormDiv} style={{backgroundColor: isDark ? isDark.childbackgroundColor : "#eee", border: isDark ? `1px solid ${isDark.childbackgroundColor}` : "1px solid #EDEFF1",borderRadius: isFocus && "20px 20px 0 0"}}>
            <CiSearch className={styles.search}/>
            <form className={styles.navForm} onSubmit={(e)=>handleSearchSubmit(e)}>
                <input ref={searchRef} value={input} onChange={(e)=>setinput(e.target.value)} placeholder='Search Reddit'  style={{color: isDark.color}}/>
            </form>
            {input && <AiOutlineCloseCircle className={`${styles.cleartext} ${isDark ? styles.darkHover : styles.lightHover}`} onClick={()=>setinput('')}/>}
            {isFocus && <SearchBar pos={inputRef?.current?.getBoundingClientRect()} setIsFocus={setIsFocus}/>}
        </div>
        
        <div className={styles.navRight}>
            {
                user &&
                <>
                    <div className={styles.moreIconDiv} onClick={()=>navigate("/r/popular")}>
                        <BsArrowUpRightCircle className={`${styles.moreIcon} ${isDark ? styles.darkHover : styles.lighteHover}`} style={{padding: "5px"}}/>
                    </div>
                    <div className={styles.moreIconDiv} onClick={()=>{isMessage ? dispatch(closeMessage()) : dispatch(openMessage())}}>
                        <AiOutlineMessage className={`${styles.moreIcon} ${isDark ? styles.darkHover : styles.lighteHover}`} style={{padding: "4px"}}/>
                    </div>
                    <div className={styles.moreIconDiv} onClick={()=>{dispatch(openNotification({top: notifyButton.current.getBoundingClientRect().bottom + 10, left: notifyButton.current.getBoundingClientRect().right - 350}))}} ref={notifyButton}>
                        <LuBell className={`${styles.moreIcon} ${isDark ? styles.darkHover : styles.lighteHover}`} style={{padding: "4px"}}/>
                    </div>
                    <div className={styles.moreIconDiv} onClick={()=>navigate(('/submit'),dispatch(setPostType("text")))}>
                        <AiOutlinePlus className={`${styles.moreIcon} ${isDark ? styles.darkHover : styles.lighteHover}`} style={{padding: "3px"}}/>
                    </div>
                    <div className={styles.moreIconDiv} onClick={()=>dispatch(setWarningMessages([...messages, {message: "Features Coming Soon...", timestamp: Date.now(), color: "#ff4500", emoji: "sad"}]))}>
                        <MdOutlineCampaign className={styles.moreIcon} style={{padding: "5px", backgroundColor: isDark ? isDark.childbackgroundColor : "#eee", borderRadius: "50%"}}/>
                    </div>
                </>
            }
            {   user ?
                <>
                    <div className={styles.userOptions} onClick={()=>dispatch(openUserContainer())} style={{border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #eee"}}>
                        <div style={{backgroundColor: isDark ? isDark.childbackgroundColor : "#ccc"}}>
                            <img src={userLogo}/>
                            {isOnline && <p className={styles.onlineDot} style={{border: isDark ? `2px solid ${isDark.backgroundColor}` : "2px solid #fff"}}></p>}
                        </div>
                        <div className={styles.useInfoDiv}>
                            <p className={styles.userName}>{user.name}</p>
                            <p className={styles.karma} style={{color: isDark.childColor}}><GiBurningDot className={styles.karmaLogo}/>1 karma</p>
                        </div>
                        <div>
                            <IoIosArrowDown />
                        </div>
                    </div>
                </>
                :
                <>
                    <div className={styles.getApp} onClick={()=>{
                        dispatch(openDownload())
                        }}>
                        <BsQrCodeScan className={styles.qrcode}/>
                        <p>Get app</p>
                    </div>
                    <div className={styles.loginbutton}>
                        <Button w="70px" h="40px" br="50px" fs="0.875rem" p="5px 15px" bc="#D93A00" c="#fff" hbc="#962900" onClick={()=>{
                            dispatch(openAuthentication("login"))
                            dispatch(startLoading())
                        }}>Log In</Button>
                    </div>
                    <div onClick={()=>dispatch(openUserContainer())}>
                        <BsThreeDots className={styles.menu}/>
                    </div>
                </>
            }
        </div>
    </div>
  )
}

export default NavBar