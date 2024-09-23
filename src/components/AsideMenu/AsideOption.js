import React, { useEffect, useState } from 'react'
import styles from "./AsideMenu.module.css"


function AsideOption(props) {

  const [isHover, setIsHover] = useState(false)

  return (
    <div className={styles.tab} 
    style={{
      height: props.h,
      borderRadius: props.br,
      color: props.c,
      backgroundColor: isHover ? props?.hbc || "#eee"  : props.bc,
      cursor: props.cu,
      padding: props.p,
      display: props.d,
      justifyContent: props.jc,
      alignItems: props.ai,
      gap: props.g,
      borderLeft: props.bl
      }}
      onClick={props.onClick}
      onMouseOver={()=>setIsHover(true)}
      onMouseOut={()=>setIsHover(false)}
      >
        {props.icon && React.cloneElement(props.icon, {style: {width: "25px", fontSize: "1.5rem", }})}
        <p className={styles.tabp} 
        style={{
          width: props.cw,
          display: props.d,
          justifyContent: props.jc,
          alignItems: props.ai,
          gap: props.g,
          fontWeight: props.cfw
        }}>{props.children}</p>
    </div>
  )
}

export default AsideOption



