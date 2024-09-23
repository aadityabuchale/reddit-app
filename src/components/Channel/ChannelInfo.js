import React from 'react'
import styles from "./ChannelInfo.module.css"
import { LuCakeSlice } from "react-icons/lu"
import Button from '../Button/Button'
import { GoDotFill } from "react-icons/go"
import AsideOption from '../AsideMenu/AsideOption'
import ExampleStrapiSwitch from '../Switch/Switch'
import { BsEyeSlash } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { HiPencilSquare } from "react-icons/hi2"
import useFetch from '../../useHooks/useFetch'
import { setWarningMessages } from '../../MyStore/action'

function ChannelInfo({ channel, type, channelTheme, setChannelTheme }) {

    const { user } = useSelector((state)=>state.UserSetter)
    const { isDark } = useSelector((state)=>state.UISetter)
    const { messages } = useSelector((state)=>state.WarningSetter)
    const { updateChannel } = useFetch()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isEdit, setIsEdit]  = useState(false)
    const [desc, setDesc] = useState('')

    const handleDescriptionEdit = ()=>{
        if(!desc){
            return
        }
        updateChannel(channel?.name, desc, channel?._id )
        setIsEdit(false)
    }

  return (
    <div className={styles.channelContainer} style={{backgroundColor: isDark.childbackgroundColor || "#fff", border: isDark ? `1px solid ${isDark.borderColor}`: "1px solid #eee", color: isDark.color}}>
        <div className={styles.channelTheme} style={{backgroundColor: channelTheme ? `#${channelTheme}` : !type && "#333"}}>{!type && "About Community"}</div>
        {type &&
            <div className={styles.channelName}>
                <img src={channel?.image}/>
                <p onClick={()=>type && navigate(`/r/${channel?.name}`)}>r/{channel?.name}</p>
            </div>
        }
        <div className={styles.channeldescription}>
            {
                user?._id===channel?.owner?._id ?
                !isEdit ? <p style={{color: isDark ? isDark.color : channel?.description ? "#000" : channelTheme ? `#${channelTheme}`:"#006cbf", border: isDark ? `1px solid ${isDark.backgroundColor}` : "1px solid #ddd"}} className={styles.addDescription} onClick={()=>setIsEdit(true)}>{channel?.description || "Add description"} <HiPencilSquare style={{fontSize: "1rem"}}/></p> 
                : <div style={{position: "relative"}} className={styles.descriptionInputDiv}>
                    <input className={styles.descriptionInput} style={{color: isDark.color}} autoFocus={true} value={desc} onChange={(e)=>setDesc(e.target.value)} maxLength={500}></input>
                    <div className={styles.textareaControls} style={{color: isDark.childColor || "#576f76"}}>
                        <p style={{color:(500 - desc.length) === 0 && "#ffb000"}}>{500 - desc.length} Characters remaining</p>
                        <div>
                            <span style={{color: "red"}} onClick={()=>setIsEdit(false)}>Cancel</span>
                            <span style={{color: "#006cbf", cursor: !desc && "not-allowed", opacity: !desc && "0.5"}} onClick={handleDescriptionEdit}>Save</span>
                        </div>
                    </div>
                </div> :
                <p>{channel?.description}</p>
             }
            <p style={{color: isDark.childColor || "#576f76"}}><LuCakeSlice style={{fontSize: "1.25rem"}}/>Created {new Date(channel?.createdAt).toDateString()}</p>
        </div>
        <hr className={styles.channelBorder}></hr>
        <div className={styles.channelmembers}>
            <div className={styles.members}>
                <p>1.9 M</p>
                <p style={{color: isDark.childColor || "#576f76"}} >Members</p>
            </div>
            <div className={styles.members}>
                <p>5.9 K</p>
                <p style={{color: isDark.childColor || "#576f76"}} className={styles.online}><GoDotFill style={{color: "#46d160"}}/> Online</p>
            </div>
            <div className={styles.members}>
                <p>Top 1%</p>
                <p style={{color: isDark.childColor || "#576f76"}} className={styles.online}>Ranked by 2k</p>
            </div>
        </div>
        <hr className={styles.channelBorder}></hr>
        <Button p="5px 15px" br="50px" w="calc(100% - 20px)" m="0 10px" bc={type ? "transparent" : isDark ? isDark.color : channelTheme ? `#${channelTheme}` : "#006cbf"} hbc={type ? "rgba(0,121,211,0.05)" : isDark ? isDark.color : channelTheme ? `#${channelTheme}` : "#006cbfdd"} hb={type && isDark ? `1px solid ${isDark.color}` : "1px solid #7cbae9"} b={type && isDark ? `1px solid ${isDark.color}` : "1px solid #7cbae9"} c={type ? isDark.color || "#006cbf" : isDark.switchColor || "#fff"} fs="1rem" fw="500" onClick={()=>{type ? (navigator.clipboard.writeText(window.location),dispatch(setWarningMessages([...messages, {message: "Link Copied to Clipboard", timestamp: Date.now(), color: "#006cbf", emoji: "happy"}]))) : navigate('/submit')}}>{type ? "Share" : "Create Post"}</Button>
        <hr className={styles.channelBorder}></hr>
        <div>
            <AsideOption hbc="transparent" bc="transparent" br="0" p="0 20px" d="flex" jc="space-between" cw="100%" cfw="500" cu="auto" icon={<BsEyeSlash />}>Community Theme <ExampleStrapiSwitch setChannelTheme={setChannelTheme} channelTheme={channelTheme}/> </AsideOption>
        </div>
    </div>
  )
}

export default ChannelInfo