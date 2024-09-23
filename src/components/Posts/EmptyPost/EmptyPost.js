import React from 'react'
import styles from "./EmptyPost.module.css"
import { PiArrowFatUpLight } from "react-icons/pi"
import { PiArrowFatDownLight } from  "react-icons/pi"
import { useSelector } from 'react-redux'

function EmptyPost({username}) {
    const { isDark } = useSelector((state)=>state.UISetter)
    const paragraphs = [];

    for (let i = 0; i < 11; i++) {
        paragraphs.push( 
        <div className={styles.emptyPost} key={i} style={{backgroundColor: isDark.backgroundColor || "#ffffffcc", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ccc"}}>
            <div className={styles.votingDiv} style={{color: isDark.childColor || "#888"}}>
                <PiArrowFatUpLight />
                <PiArrowFatDownLight />
            </div>
            <div>

            </div>
        </div>);
    }

  return (
    <>
        {paragraphs}
        <p className={styles.emptypostMessage}  style={{color: isDark.color}}>hmm... {username} hasn't posted anything</p>
        
    </>
  )
}

export default EmptyPost