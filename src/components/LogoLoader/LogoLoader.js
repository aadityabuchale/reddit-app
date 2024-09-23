import React from 'react'
import styles from "./LogoLoader.module.css"
import logo from "../../Assets/Reddit_logo_full_lmg.png"

function LogoLoader() {
  return (
    <div className={styles.loaderLogo}>
        <img src={logo}/>
    </div>
  )
}

export default LogoLoader