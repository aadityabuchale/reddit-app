import React from 'react'
import styles from "./AsideMenu.module.css"
import { RiArrowDownSLine } from "react-icons/ri"

function AsideOptiontitle(props) {
  return (
    <div className={styles.tab} style={{justifyContent: "space-between", borderRadius: props.br, padding: props.p}} onClick={props.setOpen}>
        <p className={styles.slidedown} style={{color: props.c, fontWeight: props.fw}}>{props.icon && React.cloneElement(props.icon, {style: {width: "25px", fontSize: "1.2rem", }})}{props.children}</p>
        <RiArrowDownSLine className={styles.arrow} style={{transform: props.open.includes(props.current) ? "rotate(180deg)": "rotate(0deg)"}}/>
    </div>
  )
}

export default AsideOptiontitle