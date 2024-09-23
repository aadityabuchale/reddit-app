import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { TransitionGroup } from 'react-transition-group';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { AiOutlineClose } from "react-icons/ai"
import styles from "./Warning.module.css"
import happyEmoji from "../../Assets/Happyemoji.png"
import sadEmoji from "../../Assets/sadEmoji.png"

export default function TransitionGroupExample({ messages, updateDispatch, isDark }) {

  const [isHover, setIsHover] = React.useState(-1)

  const handleRemoveMessage = (idx)=>{
    let filterArray = messages.filter((message, index) => index !== idx)
    updateDispatch(filterArray)
  }

  React.useEffect(() => {
    const handleRemoveExpiredMessages = () => {
      const currentTime = Date.now();
      let filterArray = messages.filter((message) => (currentTime - message.timestamp) < 5000)
      updateDispatch(filterArray)
    };

    const timerId = setInterval(handleRemoveExpiredMessages, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [messages, updateDispatch]);

  return (
    <div>
      <List sx={{ mt: 1, width: "100%", maxWidth: "500px"}}>
        <TransitionGroup sx={{with: "100%"}}>
          {messages.map((item, idx) => (
            <Collapse key={idx} sx={{width: "100%", height: "50px", margin: "10px 0", backgroundColor: isDark.backgroundColor || "#fff", borderRadius: "3px", border: isDark ? `1px solid ${isDark.borderColor}` : "1px solid #ddd"}}>
              <div onMouseOver={()=>setIsHover(idx)} onMouseOut={()=>setIsHover(-1)} className={styles.warningTile} style={{gridTemplateColumns: isHover === idx && "30px 1fr"}}>
                <div className={styles.warningClose} style={{backgroundColor: item?.color}}>
                  <Fade in={isHover === idx}>
                    <Paper sx={{width: 0, height: 0 }}>
                      <AiOutlineClose className={styles.close} style={{color: isDark.backgroundColor || "#fff"}} onClick={()=>handleRemoveMessage(idx)}/>
                    </Paper>
                  </Fade>
                </div>
                <div className={styles.warningMessage} style={{color: isDark.color}}><img src={item?.emoji === "happy" ? happyEmoji : sadEmoji} /> {item?.message}</div>
              </div>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </div>
  );
}
