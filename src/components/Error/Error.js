import React from 'react'
import styles from "./Error.module.css"
import { Link } from 'react-router-dom'
import errorImage from "../../Assets/Error Page Image.png"

function Error() {
  return (
    <div className={styles.errorContainer}>
        <img src={errorImage}/>
        <p>Something went wrong</p>
        <Link to="/">Go Home</Link>
    </div>
  )
}

export default Error