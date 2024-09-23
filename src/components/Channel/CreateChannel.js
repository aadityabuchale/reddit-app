import React, { useRef } from 'react'
import styles from './CreateChannel.module.css'
import { createPortal } from 'react-dom'
import { AiOutlineClose, AiTwotoneFileMarkdown } from 'react-icons/ai'
import { BsExclamationCircle } from 'react-icons/bs'
import { FaUserAlt } from "react-icons/fa"
import { HiEyeOff } from "react-icons/hi"
import { BiSolidLockAlt } from "react-icons/bi"
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { createCommunity } from '../../MyStore/action'
import { useState } from 'react'
import useFetch from '../../useHooks/useFetch'
import { useEffect } from 'react'


function CreateChannel() {

    const postDetail = useSelector((state)=>state.DataSetter)
    const { isDark } = useSelector((state)=>state.UISetter)
    const { createChannel, fetchChannelbyName } = useFetch()
    const dispatch = useDispatch()
    const isFirstRender = useRef(false)
    const [channelName, setChannelName] = useState("")
    const [type, setType] = useState('public')
    const [isNull, setIsNull] = useState(false)
    const [timerId, setTimerId] = useState(null)
    const [isValid, setIsValid] = useState(true)

    const handleChannelCreator = ()=>{
        if(!channelName){
            setIsNull("A community name is required")
            return
        }
        if(channelName.length < 3){
            setIsNull("A community name should have minimum 4 letters")
            return
        }
        setIsNull(false)
        createChannel(channelName)
    }

    useEffect(()=>{
        if(channelName.length > 3){
            if(timerId){
                clearTimeout(timerId)
            }

            const newTimer = setTimeout(() => {
                fetchChannelbyName(channelName, "channelVerify")
            }, 1000);

            setTimerId(newTimer)
        }
        else{
            if(timerId){
                clearTimeout(timerId)
            }
        }

        return ()=>{
            if(timerId){
                clearTimeout(timerId)
            }
        }
    },[channelName])

    useEffect(()=>{
        if(channelName.length > 3){
            if(channelName === postDetail?.channelVerify){
                setIsValid(false)
            }
            else{
                setIsValid(true)
            }
        }
    },[postDetail.channelVerify])

    useEffect(()=>{
        if(isFirstRender.current === false){
            isFirstRender.current = true
            return
        }
        dispatch(createCommunity(false))
    },[window.location.pathname])

  return (
    createPortal(
    <div className={styles.CreateChannel} style={{backgroundColor: isDark.backgroundColor || "#fff", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #bbb", color: isDark.color}}>
        <div className={styles.createChannelHeader} style={{color: isDark.color || "#1C1C1C"}}>
            <p>Create a community</p>
            <AiOutlineClose style={{cursor: "pointer"}} onClick={()=>dispatch(createCommunity(false))}/>
        </div>
        <hr style={{borderTop: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd"}}></hr>
        <div className={styles.channelCondition}>
            <p>Name</p>
            <p style={{color: isDark.childColor || "#576f76"}}>Community names including capitalization cannot be changed. <BsExclamationCircle /></p>
        </div>
        <div className={styles.channelNameInput}>
            <div style={{color: isDark.childColor || "#576f76", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd"}}>
                <span>r/</span>
                <input style={{color: isDark.color}} value={channelName} onChange={(e)=>setChannelName(e.target.value)} maxLength={21}/>
            </div>
            <div style={{color: isDark.childColor || "#576f76"}}>
                <p style={{color: (21- channelName.length) === 0 && "#ffb000"}}>{21- channelName.length} Characters remaining</p>
                {channelName.length > 3 && <p style={{color: isValid ? "#46d160" : "#ffb000"}}>{isValid ? <>&#10004; Channel name Available.</> : <>Oops channel name already taken &#x21;</>}</p>}
            </div>
            {isNull && <p>{isNull}</p>}
        </div>
        <div className={styles.channelTypes}>
            <p>Community type</p>
            <div>
                <input readOnly type='radio' checked={type === 'public'} onClick={()=>setType('public')}/>
                <p><FaUserAlt /> Public</p>
                <p style={{color: isDark.childColor || "#576f76"}}>Anyone can view, post, and comment to this community</p>
            </div>
            <div>
                <input readOnly type='radio' checked={type === 'restricted'} onClick={()=>setType('restricted')}/>
                <p><HiEyeOff /> Restricted</p>
                <p style={{color: isDark.childColor || "#576f76"}}>Anyone can view this community, but only approved users can post</p>
            </div>
            <div>
                <input readOnly type='radio' checked={type === 'private'} onClick={()=>setType('private')}/>
                <p><BiSolidLockAlt /> Private</p>
                <p style={{color: isDark.childColor || "#576f76"}}>Only approved users can view and submit to this community</p>
            </div>
        </div>
        <div className={styles.channelDisclaimer}>
            <p style={{color: isDark.color || "#1C1C1C"}}>Adult content</p>
            <p style={{color: isDark.childColor || "#576f76"}}><input type='checkbox'/> <Button p="2px 5px" br="2px" fs="0.7rem" c="#fff" bc="#FF585B">NSFW</Button> 18+ year old community</p>
        </div>
        <div className={styles.channelactions} style={{backgroundColor: isDark.childbackgroundColor || "#DAE0E6"}}>
            <Button p="4px 15px" br="50px" c={isDark.color || "#006cbf"} fw="500" fs="1rem" b={isDark ? `1px solid ${isDark.color}` : "1px solid #006cbf"} bc="transparent" hbc="rgba(0,121,211,0.05)" onClick={()=>dispatch(createCommunity(false))}>Cancel</Button>
            <Button p="5px 15px" br="50px" c={isDark.switchColor || "#fff"} fw="500" fs="1rem" bc={isDark.color || "#006cbf"} hbc={isDark.color || "#006cbfdd"} onClick={handleChannelCreator} dis={!isValid}>Create Community</Button>
        </div>
    </div>
    ,document.getElementById("reddit_portal"))
  )
}

export default CreateChannel