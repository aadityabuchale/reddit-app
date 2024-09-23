import React from 'react'
import styles from "./Warning.module.css"
import TransitionGroupExample from './TransitionGroupExample'
import { useDispatch, useSelector } from 'react-redux'
import { setWarningMessages } from '../../MyStore/action'


function Warning() {
  const { messages } = useSelector((state)=>state.WarningSetter)
  const { isDark } = useSelector((state)=>state.UISetter)
  const dispatch = useDispatch()
  
  const updateDispatch = (message)=>{
    dispatch(setWarningMessages([...message]))
  }

  return (
    <div className={styles.warningContainer}>
        <TransitionGroupExample messages={messages} updateDispatch={updateDispatch} isDark={isDark}/>
    </div>
  )
}

export default Warning