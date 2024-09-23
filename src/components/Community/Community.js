import React, { useEffect } from 'react'
import styles from "./Community.module.css"
import { useState } from 'react'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Community({ channel }) {
    const { isAside } = useSelector((state)=>state.UISetter)
    const navigate = useNavigate()
    const [isMore, setIsMore] = useState(false)

  return (
    <div className={styles.community} style={{display: isAside && window.innerWidth < 950 && "none"}}>
        <p className={styles.title}>POPULAR COMMUNITIES</p>
        {
            channel?.map((community, idx)=>{
                if(!isMore && idx>=5) return
                return(
                    <div className={styles.community_card} key={idx} onClick={()=>navigate(`r/${community.name}`)}>
                        <img className={styles.communityLogo} src={community.image} />
                        <div>
                            <p className={styles.community_name}>r/{community.name}</p>
                            <p className={styles.community_members}>5,680,983 members</p>
                        </div>
                    </div>
                )
            })
        }
        <Button h="30px" p="0 10px" m="10px 0" br="30px" fs="0.75rem" hbc="#ddd" bc="transparent" onClick={()=>setIsMore(!isMore)}>{isMore?"See less":"See more"}</Button>
    </div>
  )
}

export default Community