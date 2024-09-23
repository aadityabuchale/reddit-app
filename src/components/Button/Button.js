import React, { forwardRef, useState } from 'react'
import styles from "./Button.module.css"

const Button = forwardRef((props, ref) =>{

  const[isHover, setIsHover] = useState(false)

  return (
    <button className={styles.button} 
      onMouseOver={()=>setIsHover(true)}
      onMouseOut={()=>setIsHover(false)}
      style={{
        height: props.h,
        width: props.w,
        border: isHover ? props.hb ? props.hb : props.b : props.b,
        borderRadius: props.br,
        padding: props.p,
        fontSize: props.fs,
        backgroundColor: isHover ? props.hbc ? props.hbc : props.bc : props.bc,
        color: isHover ? props.hc ? props.hc : props.c : props.c,
        margin: props.m,
        display: props.d,
        gap: props.g,
        justifyContent: props.jc,
        alignItems: props.ai,
        minWidth: props.mw,
        opacity: props.dis && "0.5",
        cursor: props.dis && "auto",
        position: props.po,
        [props.ptype]: props.ppx
      }}
      disabled={props.dis}
      onClick={props.onClick}
      ref={ref}
    >{isHover ? props.ht ? props.ht : props.children : props.children}</button>
  )
})

export default Button