import React, { useEffect, useRef, useState } from 'react'
import styles from "./Search.module.css"
import Button from '../Button/Button'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import profileIcon7 from "../../Assets/User Icons/profileIcon_icon7.png"
import { ThreeDots } from 'react-loader-spinner'
import useFetch from '../../useHooks/useFetch'

function ChannelUser({ value, type, fullView }) {

  const { isDark } = useSelector((state)=>state.UISetter)
  const { user, userToken } = useSelector((state)=>state.UserSetter)
  const { unFollowUser, followUser} = useFetch()
  const buttonRef = useRef()
  const navigate = useNavigate()
  const [isloading, setIsLoading] = useState(false)
  const [local, setLocal] = useState(value)

  function handleClick(e){
    if(!buttonRef?.current?.contains(e.target)){
      if(type==="user"){
        navigate(`/user/${value.name}/${value._id}`)
      }
      else{
        navigate(`/r/${value.name}`)
      }
    }
  }

  function buttonhandler(){
    if(isloading){
      return
    }
    if(local?._id === user?._id){
      navigate('/submit')
    }
    else{
      if(local?.isFollowed){
          unFollowUser(value._id)
          setIsLoading(true)
      }
      else{
          followUser(value._id)
          setIsLoading(true)
      }
    }
  }

  useEffect(()=>{
    if(isloading){
      updateValue()
    }
  },[isloading, local])

  function updateValue (){
    fetch(`https://academics.newtonschool.co/api/v1/reddit/user/${value._id}`,{
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'projectID': '2xrb7gmxn2kw'
      }
    })
    .then((response)=>response.json())
    .then((result)=>setLocal(result.data),setTimeout(() => {
      setIsLoading(false)
    }, 750))
  }

  return (
    <div className={styles.channelUser} style={{border: fullView && "1px solid #ddd", marginBottom: fullView && "10px",borderRadius: fullView && "5px", backgroundColor: isDark.backgroundColor || "#fff", color: isDark.color, border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd"}} onClick={(e)=>handleClick(e)}>
        <div className={styles.channeluserInfo}>
            <img src={value?.image || value?.profileImage || profileIcon7}/>
            <div>
                <p className={styles.channeluserTitle}>{value?.name}</p>
                <p className={styles.channeluserCount} style={{color: isDark.childColor || "#576f76"}}>{type==="user" ?"46k Karma" :"4.6m Members"}</p>
            </div>
        </div>
        <div ref={buttonRef} style={{margin: "auto 0"}}>
          <Button w="100px" p="5px" br="50px" fs="1rem" fw="500" c={isDark.switchColor || "#fff"} bc={isDark.color || "#006cbf"} onClick={buttonhandler}>{type==="user"? user._id === local._id ? "New Post" : isloading ? <ThreeDots height={20.5} color={isDark.switchColor || '#fff'} width="100%" wrapperStyle={{transform: "scale(0.4)"}}/> : local.isFollowed ? "Unfollow" : "Follow":"Join"}</Button>
        </div>
    </div>
  )
}

export default ChannelUser