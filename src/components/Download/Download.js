import React from 'react'
import styles from './Download.module.css'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from '../Button/Button'
import { AiOutlineClose } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { closeDownload } from '../../MyStore/action'
import { Link } from 'react-router-dom'

function Download() {
    const dispatch = useDispatch()

  return (
    createPortal(
    <div className={styles.download}>
        <div className={styles.title}>
            <p>Get the Reddit app</p>
            <Button mw="40px" h="40px" br="50%" fs="1.5rem" bc="#eee" hbc="#ddd" d="flex" jc="center" ai="center" onClick={()=>dispatch(closeDownload())}><AiOutlineClose /></Button>
        </div>
        <div className={styles.qrcode}>
            <p>Scan this QR code to download the app now</p>
            <img src="https://www.redditstatic.com/shreddit/assets/shreddit-qr-code.svg"/>
        </div>
        <div className={styles.footer}>
            <p>Or check it out in the app stores</p>
            <div className={styles.redirect}>
                <Link to="https://play.google.com/store/apps/details?id=com.reddit.frontpage" target='_blank'><img src='https://www.redditstatic.com/shreddit/assets/google-play.svg' /></Link>
                <Link to="https://apps.apple.com/in/app/reddit/id1064216828" target='_blank'><img src='https://www.redditstatic.com/shreddit/assets/app-store.svg' /></Link>
            </div>
        </div>
    </div>
    , document.getElementById("reddit_portal"))
  )
}

export default Download